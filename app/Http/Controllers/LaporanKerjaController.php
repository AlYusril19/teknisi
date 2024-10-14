<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Galeri;
use App\Models\LaporanKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class LaporanKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId=session('user_id');
        $reject = LaporanKerja::where('user_id', $userId)
            ->where('status', 'reject')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

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
        $laporan = $reject->concat($drafts)->concat($pending)->concat($selesai);
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
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();

        return view('teknisi.laporan_kerja_create', compact('barangs'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();
        // Validasi input web baru
        $request->validate([
            'tanggal_kegiatan' => 'required|date',
            'jam_mulai' => 'required',
            'jam_selesai' => 'required',
            'jenis_kegiatan' => 'required|string',
            'keterangan_kegiatan' => 'required|string',
            'alamat_kegiatan' => 'required|string',
            'status' => 'required|in:draft,pending',
            'fotos' => 'nullable', // Bisa kosong
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096', // Validasi untuk setiap file dalam array 'fotos'
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

        $message = '';

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
            $message .= 'dan barang keluar ';
        } else {
            $barangKeluar = null;
            $pesanWhatsApp .= ' - ';
        }

        // Format data barang kembali untuk dikirim ke web lama
        if ($request->barang_kembali_ids != null) {
            $barangKembali = [];
            foreach ($request->barang_kembali_ids as $index => $barangId) {
                $barangKembali[] = [
                    'id' => $barangId, // ID barang dari web lama
                    'jumlah' => $request->jumlah_kembali[$index], // Jumlah barang kembali
                ];
            }
            foreach ($barangKembali as $barang) {
                // Cari data barang berdasarkan ID di array $barangs
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                if ($barangDetail) {
                    $pesanWhatsApp .= "\n+ " . $barangDetail['nama_barang'] . " (x" . $barang['jumlah'] . ") [Kembali]";
                }
            }
            $message .= 'dan barang kembali ';
        } else {
            $barangKembali = null;
            $pesanWhatsApp .= ' - ';
        }

        $laporan = [ 'user_id' => $userId,
                    'jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'alamat_kegiatan' => $request->alamat_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai, 
                    'barang' => json_encode($barangKeluar), // Simpan data barang sebagai JSON
                    'barang_kembali' => json_encode($barangKembali), // Simpan data barang sebagai JSON
                    'status' => $request->status,
                ];
                
        // 
        // Buat link WhatsApp
        $linkWhatsApp = "https://wa.me/6285755556574?text=" . urlencode($pesanWhatsApp);
        // Simpan laporan kerja di database web baru
        $laporan = LaporanKerja::create($laporan);
        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $foto) {
                $path = $foto->store('dokumentasi_foto', 'public');
                Galeri::create([
                    'laporan_id' => $laporan->id,
                    'file_path' => $path,
                ]);
            }
            $message .= 'beserta foto ';
        }
        return redirect()->route('laporan.index')
                        ->with('success', 'Laporan ' .$message. 'berhasil disimpan.');
        // return redirect()->route('laporan.index')
        //                 ->with('success', 'Laporan ' .$message. 'berhasil disimpan.')
        //                 ->with('whatsappLink', $linkWhatsApp);
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
        // $fotos = Galeri::where('laporan_id', $laporan->id)->get();
        if ($laporan->status === 'selesai') {
            return redirect()->route('laporan.index')->with('error', 'Laporan selesai tidak dapat diedit.');
        } elseif ($laporan->status === 'pending') {
            return redirect()->route('laporan.index')->with('error', 'Laporan pending tidak dapat diedit.');
        }
        // Decode JSON barang ke dalam array
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);
        // Ambil data barang dari web lama via API
        $response = ApiResponse::get('/api/get-barang');
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

        $barangKembaliView = [];
        if ($barangKembali) {
            foreach ($barangKembali as $barang) {
                // Cari data barang berdasarkan ID di array $barangs
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);

                // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                if ($barangDetail) {
                    $barangKembaliView[] = [
                        'id' => $barang['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang'], // Asumsikan nama barang ada di field 'nama'
                    ];
                }
            }
        }

        return view('teknisi.laporan_kerja_edit', compact('barangs', 'laporan', 'barangKeluarView', 'barangKembaliView'));
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
            'alamat_kegiatan' => 'required|string',
            'status' => 'required|in:draft,pending',
            'fotos' => 'nullable', // Bisa kosong
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096', // Validasi untuk setiap file dalam array 'fotos'
        ]);
        
        $userName = session('user_name');

        // Format pesan WhatsApp
        $pesanWhatsApp = "Laporan *" . $userName . "* :\n" .
                        "Tanggal: " . $request->tanggal_kegiatan . "\n" .
                        "Jam Kerja : " . $request->jam_mulai . " - " . $request->jam_selesai . "\n".
                        "Jenis Kegiatan: " . $request->jenis_kegiatan . "\n" .
                        "Keterangan Kegiatan: " . $request->keterangan_kegiatan . "\n" .
                        "Barang: ";
        //
        $message = '';
        // Format data barang keluar untuk dikirim ke web lama
        if ($request->barang_ids != null) {
            $barangKeluar = [];
            foreach ($request->barang_ids as $index => $barangId) {
                $barangKeluar[] = [
                    'id' => $barangId, // ID barang dari web lama
                    'jumlah' => $request->jumlah[$index], // Jumlah barang keluar
                ];
            }
            $message .= 'dan barang keluar ';
        } else {
            $barangKeluar = null;
        }

        // Format data barang kembali untuk dikirim ke web lama
        if ($request->barang_kembali_ids != null) {
            $barangKembali = [];
            foreach ($request->barang_kembali_ids as $index => $barangId) {
                $barangKembali[] = [
                    'id' => $barangId, // ID barang dari web lama
                    'jumlah' => $request->jumlah_kembali[$index], // Jumlah barang keluar
                ];
            }
            $message .= 'dan barang kembali ';
        } else {
            $barangKembali = null;
        }
        
        $laporan = LaporanKerja::findOrFail($id);
        if ($request->hasFile('fotos')) {
            foreach ($request->file('fotos') as $foto) {
                $path = $foto->store('dokumentasi_foto', 'public');
                Galeri::create([
                    'laporan_id' => $laporan->id,
                    'file_path' => $path,
                ]);
            }
            $message .= 'beserta foto ';
        }
        $data = ['jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'alamat_kegiatan' => $request->alamat_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai,
                    'barang' => json_encode($barangKeluar), // Simpan data barang sebagai JSON
                    'barang_kembali' => json_encode($barangKembali), // Simpan data barang sebagai JSON
                    'status' => $request->status,
                ];
        // 
        
        // Buat link WhatsApp
        $linkWhatsApp = "https://wa.me/6285755556574?text=" . urlencode($pesanWhatsApp);
        if ($request->status === 'draft') {
            $laporan->update($data);
            return redirect()->route('laporan.index')->with('success', 'Laporan ' .$message. 'disimpan di draft.');
        }
        $laporan->update($data);
        return redirect()->route('laporan.index')->with('success', 'Laporan ' .$message. 'berhasil di post.');
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
        if ($laporan->status === 'pending') {
            return redirect()->back()->with('error', 'Laporan sudah di post tidak dapat dihapus.');
        }
        $laporan->delete();

        return redirect()->route('laporan.index')->with('success', 'Laporan berhasil dihapus');
    }

    public function deleteImage($id)
    {
        $galeri = Galeri::find($id);

        if ($galeri) {
            // Hapus file gambar dari storage
            Storage::disk('public')->delete($galeri->file_path);

            // Hapus data dari database
            $galeri->delete();

            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'Gambar tidak ditemukan'], 404);
    }

}
