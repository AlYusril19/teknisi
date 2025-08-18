<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\ChatLaporan;
use App\Models\Galeri;
use App\Models\LaporanKerja;
use App\Models\Teknisi;
use App\Models\UserApi;
use BarangHelper;
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
        $customers = ApiResponse::get('/api/get-customer')->json();

        // Query utama untuk laporan kerja
        $laporanQuery = LaporanKerja::with('teknisi')
            ->where(function ($query) use ($userId) {
                $query->whereHas('teknisi', function ($query) use ($userId) {
                    $query->where('teknisi_id', $userId);
                })->orWhere('user_id', $userId);
            })
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('jenis_kegiatan', 'like', "%$search%")
                    ->orWhere('keterangan_kegiatan', 'like', "%$search%");
                });
            })
            ->orderByRaw("FIELD(status, 'reject', 'draft', 'pending', 'selesai')")
            ->orderBy('tanggal_kegiatan', 'desc'); // Urutkan berdasarkan tanggal kegiatan

        // Cek apakah filter lembur dipilih
        if ($request->filter === 'lembur') {
            $laporanQuery->where(function ($query) {
                $query->where('jam_selesai', '>', '17:00:00')
                    ->orWhere('jam_selesai', '<', '05:00:00');
            });
        }

        // Ambil data laporan
        $laporan = $laporanQuery->get();

        // Map data teknisi ke laporan
        foreach ($laporan as $lap) {
            $lap->support = getTeknisi($lap);
            $lap->supportHelper = getHelper($lap);
            $lap->mitra = collect($customers)->firstWhere('id', $lap->customer_id);
            $lap->chatCount = ChatLaporan::where('is_read', false)
                ->where('user_id', '!=', session('user_id'))
                ->where('laporan_id', '=', $lap->id)
                ->count();
        }

        return view('teknisi.laporan_kerja_index', [
            'laporan' => $laporan
        ]);
    }

    public function indexALl(Request $request) 
    {
        // Ambil user_id dari session
        $userId = session('user_id');
        $customers = ApiResponse::get('/api/get-customer')->json();

        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()
            ->where('status', 'selesai');
        // Cek apakah filter lembur dipilih
        if ($request->filter === 'lembur') {
            $laporanQuery->where(function($query) {
                $query->where('jam_selesai', '>', '17:00:00')
                    ->orWhere('jam_selesai', '<', '03:00:00');
            });
        }

        // Cek apakah ada pencarian berdasarkan nama barang atau laporan
        if ($request->search) {
            $laporanQuery->where(function ($query) use ($request) {
                $query->Where('keterangan_kegiatan', 'like', '%' . $request->search . '%');
            });
        }

        // Cek apakah ada pencarian berdasarkan nama barang atau laporan
        if ($request->transaksi) {
            $laporanQuery->where(function ($query) use ($request) {
                $query->Where('penagihan_id', $request->transaksi);
            });
        }

        // Ambil data laporan yang sudah difilter
        $laporan = $laporanQuery->orderBy('tanggal_kegiatan', 'desc')->get();

        // Mengambil data user teknisi dan tag teknisi
        foreach ($laporan as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
            $lap->support = getTeknisi($lap);
            $lap->mitra = collect($customers)->firstWhere('id', $lap->customer_id);
        }

        // Tampilkan ke view
        return view('teknisi.laporan_kerja_index_all', [
            'laporan' => $laporan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = session('user_id');
        // Ambil data barang dari web lama via API
        $barangs = ApiResponse::get('/api/get-barang')->json();
        $barangsKembali = ApiResponse::get('/api/get-barang-kembali')->json();
        $customers = ApiResponse::get('/api/get-customer')->json();
        $teknisi = ApiResponse::get('/api/get-teknisi/'.$userId)->json();
        $helper = ApiResponse::get('/api/get-helper/'.$userId)->json();

        return view('teknisi.laporan_kerja_create', compact([
            'barangs', 
            'customers', 
            'barangsKembali',
            'teknisi',
            'helper'
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();
        // Validasi input web baru
        $this->validateRequest($request);

        $userId = session('user_id');
        $userName = session('user_name');
        $idTelegram = session('id_telegram');

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

        // Tag teknisi di database teknisi
        $teknisi_ids = $request->input('teknisi_ids');
        if ($request->teknisi_ids != null) {
            foreach ($teknisi_ids as $teknisi_id) {
                Teknisi::create([
                    'teknisi_id' => $teknisi_id,
                    'laporan_id' => $laporan->id,
                ]);
            }
            $message .= 'dan tag teknisi ';
        }

        // Tag helper di database teknisi
        $helper_ids = $request->input('helper_ids');
        if ($request->helper_ids != null) {
            foreach ($helper_ids as $helper_id) {
                Teknisi::create([
                    'teknisi_id' => $helper_id,
                    'laporan_id' => $laporan->id,
                    'helper' => true,
                ]);
            }
            $message .= 'dan tag helper ';
        }

        // $messageTelegram = $userName . " Telah mengirim laporan, harap segera dicek";
        // sendMessageAdmin($messageTelegram);

        return redirect()->route('laporan.index')
                        ->with('success', 'Laporan ' .$message. 'berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Ambil laporan berdasarkan ID
        $laporan = LaporanKerja::with('teknisi')->findOrFail($id);
        $laporan->user = UserApi::getUserById($laporan->user_id);
        $customers = ApiResponse::get('/api/get-customer')->json();
        $mitra = collect($customers)->firstWhere('id', $laporan->customer_id);
        $laporan->mitra = $mitra['nama'] ?? null;

        // Ambil barang keluar dari laporan
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);

        // Ambil data barang dari web lama via API atau sumber lain
        $barangs = ApiResponse::get('/api/get-barang')->json();

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
                        'nama' => $barangDetail['nama_barang'],
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '', // Asumsikan kategori barang ada di field 'kategori'
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
                        'nama' => $barangDetail['nama_barang'],
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '', // Asumsikan kategori barang ada di field 'kategori'
                    ];
                }
            }
        }

        // teknisi support (tag)
        $teknisi = getTeknisi($laporan);

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
            'barangKembaliView' => $barangKembaliView,
            'galeri' => $galeri,
            'teknisi' => $teknisi //teknisi support
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $userId = session('user_id');
        $laporan = LaporanKerja::with('teknisi')->findOrFail($id);

        // validasi status laporan
        if ($laporan->status === 'selesai' || $laporan->status === 'pending') {
            return redirect()->back()->with('error', 'Laporan sudah di post tidak dapat diedit.');
        }
        // Decode JSON barang ke dalam array
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);
        // Ambil data barang dari web lama via API
        $barangs = ApiResponse::get('/api/get-barang')->json();
        $barangsKembali = ApiResponse::get('/api/get-barang-kembali')->json();
        $customers = ApiResponse::get('/api/get-customer')->json();
        $teknisi = ApiResponse::get('/api/get-teknisi/'.$userId)->json();
        $helper = ApiResponse::get('/api/get-helper/'.$userId)->json();

        // Inisialisasi array untuk menyimpan data barang yang sudah ditambahkan nama
        $barangKeluarView = [];
        $barangKembaliView = [];
        
        // ambil data barang keluar dan kembali (di database teknisi)
        $barangKeluarView = BarangHelper::processBarang($barangKeluar);
        $barangKembaliView = BarangHelper::processBarang($barangKembali);

        // Data teknisi yang sudah ditambahkan ke laporan
        $existingTeknisi = getTeknisi($laporan);
        $existingHelper = getHelper($laporan);

        return view('teknisi.laporan_kerja_edit', compact([
            'barangs', 
            'barangsKembali', 
            'laporan', 
            'barangKeluarView', 
            'barangKembaliView', 
            'customers',
            'teknisi',
            'existingTeknisi',
            'helper',
            'existingHelper'
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $laporan = LaporanKerja::findOrFail($id);

        $this->validateRequest($request);

        $userId = session('user_id');

        // validasi kepemilikan
        if ($laporan->user_id != $userId) {
            if ($request->status !== 'draft') {
                return redirect()->back()->with('error', 'Anda tidak diizinkan post laporan ini.');
            }
        }

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

        $laporan->teknisi()->delete();

        // Tag teknisi di database teknisi
        $teknisi_ids = $request->input('teknisi_ids');
        if ($request->teknisi_ids != null) {
            foreach ($teknisi_ids as $teknisi_id) {
                Teknisi::create([
                    'teknisi_id' => $teknisi_id,
                    'laporan_id' => $laporan->id,
                ]);
            }
            $message .= 'dan tag teknisi ';
        }

        // Tag helper di database teknisi
        $helper_ids = $request->input('helper_ids');
        if ($request->helper_ids != null) {
            foreach ($helper_ids as $helper_id) {
                Teknisi::create([
                    'teknisi_id' => $helper_id,
                    'laporan_id' => $laporan->id,
                    'helper' => true,
                ]);
            }
            $message .= 'dan tag helper ';
        }

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
        $userId = session('user_id');
        $laporan = LaporanKerja::with('teknisi')->findOrFail($id);

        // validasi kepemilikan
        if ($laporan->user_id != $userId) {
            return redirect()->back()->with('error', 'Anda tidak diizinkan.');
        }

        if ($laporan->status === 'selesai' || $laporan->status === 'pending') {
            return redirect()->back()->with('error', 'Laporan sudah di post tidak dapat dihapus.');
        }

        // Hapus gambar-gambar terkait
        foreach ($laporan->galeri as $galeri) {
            Storage::disk('public')->delete($galeri->file_path);
        }

        // Hapus data galeri dan teknisi
        $laporan->teknisi()->delete();
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

    private function validateRequest($request){
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
    }
}
