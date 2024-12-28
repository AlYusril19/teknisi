<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Galeri;
use App\Models\LaporanKerja;
use App\Models\UserApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class LaporanKerjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = session('user_id');
        $search = $request->input('search');

        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()->where('user_id', $userId)
            ->where('status', 'selesai');
        // Cek apakah filter lembur dipilih
        if ($request->filter === 'lembur') {
            $laporanQuery->where(function($query) {
                $query->where('jam_selesai', '>', '17:00:00')
                    ->orWhere('jam_selesai', '<', '05:00:00');
            });
        }

        // Ambil laporan berdasarkan status, urutan, dan filter pencarian jika ada
        $reject = LaporanKerja::where('user_id', $userId)
            ->where('status', 'reject')
            ->when($search, function ($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('jenis_kegiatan', 'like', "%$search%")
                    ->orWhere('keterangan_kegiatan', 'like', "%$search%");
                });
            })
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $drafts = LaporanKerja::where('user_id', $userId)
            ->where('status', 'draft')
            ->when($search, function ($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('jenis_kegiatan', 'like', "%$search%")
                    ->orWhere('keterangan_kegiatan', 'like', "%$search%");
                });
            })
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $pending = LaporanKerja::where('user_id', $userId)
            ->where('status', 'pending')
            ->when($search, function ($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('jenis_kegiatan', 'like', "%$search%")
                    ->orWhere('keterangan_kegiatan', 'like', "%$search%");
                });
            })
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $selesai = LaporanKerja::where('user_id', $userId)
            ->where('status', 'selesai')
            ->when($search, function ($query) use ($search) {
                $query->where(function($q) use ($search) {
                    $q->where('jenis_kegiatan', 'like', "%$search%")
                    ->orWhere('keterangan_kegiatan', 'like', "%$search%");
                });
            })
            ->orderBy('tanggal_kegiatan', 'desc')
            ->get();

        // Gabungkan koleksi laporan sesuai status dan urutan
        $laporan = $reject->merge($drafts)->merge($pending)->merge($selesai);

        // Melakukan query untuk mendapatkan hasil yang diinginkan
        $laporan = $laporanQuery
            ->whereIn('id', $laporan->pluck('id')) // Menggunakan pluck untuk mendapatkan ID dari koleksi yang digabung
            ->orderBy('tanggal_kegiatan', 'desc')
            ->orderBy('jam_mulai', 'desc') // Menambahkan urutan berdasarkan jam_mulai secara descending
            ->get();

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
        $barangs = ApiResponse::get('/api/get-barang')->json();
        $barangsKembali = ApiResponse::get('/api/get-barang-kembali')->json();
        $customers = ApiResponse::get('/api/get-customer')->json();

        return view('teknisi.laporan_kerja_create', compact('barangs', 'customers', 'barangsKembali'));
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
            'customer_id' => 'nullable',
            'fotos' => 'nullable', // Bisa kosong
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120', // Validasi untuk setiap file dalam array 'fotos'
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

        $customerId = null;
        if ($request->jenis_kegiatan === 'mitra') {
            $customerId = $request->customer_id;
        }
        $laporan = [ 'user_id' => $userId,
                    'jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'alamat_kegiatan' => $request->alamat_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai, 
                    'customer_id' => $customerId,
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
        // Ambil laporan berdasarkan ID
        $laporan = LaporanKerja::findOrFail($id);
        $laporan->user = UserApi::getUserById($laporan->user_id);

        // Ambil barang keluar dari laporan
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);

        // Ambil data barang dari web lama via API atau sumber lain
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();

        // Inisialisasi array untuk barang yang ditampilkan
        $barangKeluarView = [];
        if ($barangKeluar) {
            foreach ($barangKeluar as $barang) {
                // Cari detail barang berdasarkan ID
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                if ($barangDetail) {
                    $barangKeluarView[] = [
                        'id' => $barang['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang']
                    ];
                }
            }
        }

        $barangKembaliView = [];
        if ($barangKembali) {
            foreach ($barangKembali as $barang) {
                // Cari detail barang berdasarkan ID
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                if ($barangDetail) {
                    $barangKembaliView[] = [
                        'id' => $barang['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang']
                    ];
                }
            }
        }

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait
        // $tagihan = $laporan->tagihan; // Ambil tagihan

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
            'barangKembaliView' => $barangKembaliView,
            'galeri' => $galeri,
            // 'tagihan' => $tagihan
        ]);
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
        $barangs = ApiResponse::get('/api/get-barang')->json();
        $barangsKembali = ApiResponse::get('/api/get-barang-kembali')->json();
        $customers = ApiResponse::get('/api/get-customer')->json();

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

        return view('teknisi.laporan_kerja_edit', compact('barangs', 'barangsKembali', 'laporan', 'barangKeluarView', 'barangKembaliView', 'customers'));
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
            'customer_id' => 'nullable',
            'fotos' => 'nullable', // Bisa kosong
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120', // Validasi untuk setiap file dalam array 'fotos'
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
        $customerId = null;
        if ($request->jenis_kegiatan === 'mitra') {
            $customerId = $request->customer_id;
        }
        $data = ['jenis_kegiatan' => $request->jenis_kegiatan,
                    'keterangan_kegiatan' => $request->keterangan_kegiatan,
                    'alamat_kegiatan' => $request->alamat_kegiatan,
                    'tanggal_kegiatan' => $request->tanggal_kegiatan,
                    'jam_mulai' => $request->jam_mulai,
                    'jam_selesai' => $request->jam_selesai,
                    'barang' => json_encode($barangKeluar), // Simpan data barang sebagai JSON
                    'barang_kembali' => json_encode($barangKembali), // Simpan data barang sebagai JSON
                    'customer_id' => $customerId,
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
        // Hapus gambar-gambar terkait
        foreach ($laporan->galeri as $galeri) {
            Storage::disk('public')->delete($galeri->file_path);
        }

        // Hapus data galeri dan barang
        $laporan->galeri()->delete(); // Hapus semua data galeri terkait
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
