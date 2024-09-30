<?php

namespace App\Http\Controllers;

use App\Models\LaporanKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LaporanKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId=session('user_id');
        // Ambil laporan dengan status 'draft' dan urutkan berdasarkan tanggal terlama
        $drafts = LaporanKerja::where('user_id', $userId)
            ->where('status', 'draft')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        // Ambil laporan dengan status 'selesai' dan urutkan berdasarkan tanggal terbaru
        $pending = LaporanKerja::where('user_id', $userId)
            ->where('status', 'pending')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $selesai = LaporanKerja::where('user_id', $userId)
            ->where('status', 'selesai')
            ->orderBy('tanggal_kegiatan', 'desc')
            ->get();

        // Gabungkan kedua koleksi
        $laporan = $drafts->concat($pending)->concat($selesai);
        // $page = request()->get('page', 1);
        // $perPage = 10;
        // $laporan = new \Illuminate\Pagination\LengthAwarePaginator(
        //     $laporan->forPage($page, $perPage),
        //     $laporan->count(),
        //     $perPage,
        //     $page,
        //     ['path' => request()->url(), 'query' => request()->query()]
        // );
        return view('teknisi.laporan_kerja_index', [
            'laporan' => $laporan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil data barang dari web lama via API
        $token=session('api_token');
        $urlApi = env('APP_URL_API'); // URL API web lama
        $response = Http::withToken($token)->get($urlApi . '/api/get-barang');
        $barangs = $response->json();

        return view('teknisi.laporan_kerja_create', compact('barangs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $token=session('api_token');
        $urlApi = env('APP_URL_API'); // URL API web lama
        $response = Http::withToken($token)->get($urlApi . '/api/get-barang');
        $barangs = $response->json();
        // Validasi input web baru
        $request->validate([
            'tanggal_kegiatan' => 'required|date',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'jenis_kegiatan' => 'required|string',
            'keterangan_kegiatan' => 'required|string',
            'status' => 'required|in:draft,pending',
        ]);

        $userId = session('user_id');
        $userName = session('user_name');

        // Format pesan WhatsApp
        $pesanWhatsApp = "Laporan *" . $userName . "* :\n" .
                        "Tanggal: " . $request->tanggal_kegiatan . "\n" .
                        "Jam Kerja : " . $request->jam_mulai . " - " . $request->jam_selesai . "\n".
                        "Jenis Kegiatan: " . $request->jenis_kegiatan . "\n" .
                        "Keterangan Kegiatan: " . $request->keterangan_kegiatan . "\n" .
                        "Barang: ";
        
        // Format data barang keluar untuk dikirim ke web lama
        if ($request->barang_ids != null) {
            $barangKeluar = [];
            foreach ($request->barang_ids as $index => $barangId) {
                $barangKeluar[] = [
                    'id' => $barangId, // ID barang dari web lama
                    'jumlah' => $request->jumlah[$index], // Jumlah barang keluar
                ];
            }
            foreach ($barangKeluar as $barang) {
                // Cari data barang berdasarkan ID di array $barangs
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                if ($barangDetail) {
                    $pesanWhatsApp .= "\n- " . $barangDetail['nama_barang'] . " (x" . $barang['jumlah'] . ")";
                }
            }
        } else {
            $barangKeluar = null;
            $pesanWhatsApp .= ' - ';
        }

        $laporan = [ 'user_id' => $userId,
                    'jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai, 
                    'barang' => json_encode($barangKeluar), // Simpan data barang sebagai JSON
                    'status' => $request->status,
                ];
        // 
        // Jika Barang tidak diisi, laporan saja yang akan diinput
        if ($barangKeluar === null || $request->status === 'draft') {
            LaporanKerja::create($laporan);
            return redirect()->route('laporan.index')->with('success', 'Laporan berhasil disimpan.');
        }

        // Kirim data ke API web lama
        $token = session('api_token');
        $urlApi = env('APP_URL_API'); // URL API web lama
        $response = Http::withToken($token)->post($urlApi . '/api/penjualan', [
            'user_id' => $userId, // User yang melaporkan
            'barang' => $barangKeluar, // Kirim barang dan jumlah
        ]);

        if ($response->failed()) {
            return redirect()->back()->with('error', 'Gagal mencatat barang keluar di web lama.');
        }
        // Buat link WhatsApp
        $linkWhatsApp = "https://wa.me/6285755556574?text=" . urlencode($pesanWhatsApp);
        // Simpan laporan kerja di database web baru
        LaporanKerja::create($laporan);
        return redirect()->route('laporan.index')
                        ->with('success', 'Laporan berhasil disimpan dan barang keluar tercatat.')
                        ->with('whatsappLink', $linkWhatsApp);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $laporan = LaporanKerja::findOrFail($id);
        if ($laporan->status === 'selesai') {
            return redirect()->route('laporan.index')->with('error', 'Laporan selesai tidak dapat diedit.');
        }
        // Decode JSON barang ke dalam array
        $barangKeluar = json_decode($laporan->barang, true);
        // Ambil data barang dari web lama via API
        $token=session('api_token');
        $urlApi = env('APP_URL_API'); // URL API web lama
        $response = Http::withToken($token)->get($urlApi . '/api/get-barang');
        $barangs = $response->json();

        // Inisialisasi array untuk menyimpan data barang yang sudah ditambahkan nama
        $barangKeluarView = [];

        if ($barangKeluar) {
            foreach ($barangKeluar as $barang) {
                // Cari data barang berdasarkan ID di array $barangs
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);

                // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                if ($barangDetail) {
                    $barangKeluarView[] = [
                        'id' => $barang['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang'], // Asumsikan nama barang ada di field 'nama'
                    ];
                }
            }
        }
        
        // dd($barangKeluarView);

        return view('teknisi.laporan_kerja_edit', compact('barangs', 'laporan', 'barangKeluarView'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'tanggal_kegiatan' => 'required|date',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'jenis_kegiatan' => 'required|string',
            'keterangan_kegiatan' => 'required|string',
            'status' => 'required|in:draft,pending',
        ]);
        
        $userName = session('user_name');

        // Format pesan WhatsApp
        $pesanWhatsApp = "Laporan *" . $userName . "* :\n" .
                        "Tanggal: " . $request->tanggal_kegiatan . "\n" .
                        "Jam Kerja : " . $request->jam_mulai . " - " . $request->jam_selesai . "\n".
                        "Jenis Kegiatan: " . $request->jenis_kegiatan . "\n" .
                        "Keterangan Kegiatan: " . $request->keterangan_kegiatan . "\n" .
                        "Barang: ";

        // Format data barang keluar untuk dikirim ke web lama
        if ($request->barang_ids != null) {
            $barangKeluar = [];
            foreach ($request->barang_ids as $index => $barangId) {
                $barangKeluar[] = [
                    'id' => $barangId, // ID barang dari web lama
                    'jumlah' => $request->jumlah[$index], // Jumlah barang keluar
                ];
            }
        } else {
            $barangKeluar = null;
        }
        
        $laporan = LaporanKerja::findOrFail($id);
        $data = ['jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai,
                    'barang' => json_encode($barangKeluar), // Simpan data barang sebagai JSON
                    'status' => $request->status,
                ];
        // $laporan->update($data);
        
        // Buat link WhatsApp
        $linkWhatsApp = "https://wa.me/6285755556574?text=" . urlencode($pesanWhatsApp);
        // Jika status diubah menjadi selesai, kirim data barang ke web lama
        if ($request->status === 'selesai') {
            if ($barangKeluar) {
                $token = session('api_token');
                $urlApi = env('APP_URL_API');
                $response = Http::withToken($token)->post($urlApi . '/api/penjualan', [
                    'user_id' => $laporan->user_id,
                    'barang' => $barangKeluar,
                ]);

                if ($response->failed()) {
                    return redirect()->back()->with('error', 'Gagal mencatat barang keluar di web lama.');
                }
                $laporan->update($data);
                return redirect()->route('laporan.index')->with('success', 'Laporan barang berhasil di post.')->with('whatsappLink', $linkWhatsApp);;
            }
            $laporan->update($data);
            return redirect()->route('laporan.index')->with('success', 'Laporan berhasil di post.')->with('whatsappLink', $linkWhatsApp);;
        }
        $laporan->update($data);
        return redirect()->route('laporan.index')->with('success', 'Laporan disimpan di draft.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $laporan = LaporanKerja::findOrFail($id);
        if ($laporan->status === 'selesai') {
            return redirect()->back()->with('error', 'Laporan sudah di post tidak dapat dihapus.');
        }
        $laporan->delete();

        return redirect()->route('laporan.index')->with('success', 'Laporan berhasil dihapus');
    }
}
