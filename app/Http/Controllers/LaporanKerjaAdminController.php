<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Biaya;
use App\Models\LaporanKerja;
use App\Models\Tagihan;
use App\Models\UserApi;
use Illuminate\Http\Request;

class LaporanKerjaAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $customers = ApiResponse::get('/api/get-customer')->json();
        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()->where('status', 'selesai');
        // Cek apakah filter lembur dipilih
        if ($request->filter === 'lembur') {
            $laporanQuery->where(function($query) {
                $query->where('jam_selesai', '>', '17:00:00')
                    ->orWhere('jam_selesai', '<', '05:00:00');
            });
        }

        // Cek apakah filter transport dipilih
        if ($request->filter === 'transport') {
            $laporanQuery->whereHas('tagihan', function($query) {
                    $query->where('nama_biaya', 'like', '%Biaya Transport%');
            });
        }

        // Cek apakah ada pencarian berdasarkan nama barang atau laporan
        if ($request->search) {
            $laporanQuery->where(function ($query) use ($request) {
                $query->where('jenis_kegiatan', 'like', '%' . $request->search . '%')
                    ->orWhere('keterangan_kegiatan', 'like', '%' . $request->search . '%');
            });
        }

        // Cek apakah mitra dipilih
        if ($request->mitra) {
            $laporanQuery->where(function($query) use ($request) {
                $query->where('customer_id', $request->mitra);
            });
        }

        // Cek apakah mitra dipilih
        if ($request->teknisi) {
            $laporanQuery->where(function($query) use ($request) {
                $query->where('user_id', $request->teknisi);
            });
        }

        // Ambil data laporan yang sudah difilter
        $laporan = $laporanQuery
            ->orderBy('tanggal_kegiatan', 'desc')
            ->orderBy('jam_mulai', 'desc') // Menambahkan urutan berdasarkan jam_mulai secara ascending
            ->get();

        // Mengambil data user
        foreach ($laporan as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
        }

        // Tampilkan ke view
        return view('admin.admin_laporan_kerja_index', [
            'laporan' => $laporan,
            'customers' => $customers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil laporan dengan status 'selesai' dan urutkan berdasarkan tanggal terbaru
        $pending = LaporanKerja::where('status', 'pending')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();
        $laporans = $pending;
        // Ambil nama user dari API eksternal dan lampirkan ke laporan
        foreach ($laporans as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
        }
        // Ambil data barang dari web lama via API
        $barangs = ApiResponse::get('/api/get-barang')->json();
        $customers = ApiResponse::get('/api/get-customer')->json();

        // Inisialisasi array untuk menyimpan data laporan beserta barangnya
        $laporanBarangView = [];

        foreach ($laporans as $laporan) {
            // Decode JSON barang ke dalam array
            $barangKeluar = json_decode($laporan->barang, true);
            $barangKembali = json_decode($laporan->barang_kembali, true);
            $barangKeluarView = [];
            $barangKembaliView = [];
            $customer = '';
            $customerId = collect($customers)->firstWhere('id', $laporan->customer_id);
            if ($customerId) {
                $customer = $customerId['nama'];
            }

            // Jika laporan memiliki barang
            if ($barangKeluar) {
                foreach ($barangKeluar as $barang) {
                    // Cari data barang berdasarkan ID di array $barangs
                    $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);

                    // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                    if ($barangDetail) {
                        $barangKeluarView[] = [
                            'id' => $barang['id'],
                            'jumlah' => $barang['jumlah'],
                            'nama' => $barangDetail['nama_barang'], // Asumsikan nama barang ada di field 'nama_barang'
                            'satuan' => $barangDetail['kategori']['satuan'] ?? '', // Asumsikan kategori barang ada di field 'kategori'
                        ];
                    }
                }
            }
            // Jika laporan memiliki barang
            if ($barangKembali) {
                foreach ($barangKembali as $barang) {
                    // Cari data barang berdasarkan ID di array $barangs
                    $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);

                    // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                    if ($barangDetail) {
                        $barangKembaliView[] = [
                            'id' => $barang['id'],
                            'jumlah' => $barang['jumlah'],
                            'nama' => $barangDetail['nama_barang'], // Asumsikan nama barang ada di field 'nama_barang'
                            'satuan' => $barangDetail['kategori']['satuan'] ?? '', // Asumsikan kategori barang ada di field 'kategori'
                        ];
                    }
                }
            }

            // Tambahkan laporan dan barang ke array hasil
            $laporanBarangView[] = [
                'laporan' => $laporan,
                'customer' => $customer,
                'barangKeluarView' => $barangKeluarView,
                'barangKembaliView' => $barangKembaliView
            ];
        }
        return view('admin.admin_laporan_kerja_update', [
            // 'laporan' => $laporan,
            'laporanBarangView' => $laporanBarangView
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Ambil laporan berdasarkan ID
        $laporan = LaporanKerja::findOrFail($id);
        $laporan->user = UserApi::getUserById($laporan->user_id);

        $penjualan = ApiResponse::get('/api/get-penjualan/' . $id)->json();
        $pembelian = ApiResponse::get('/api/get-pembelian/' . $id)->json();

        // Inisialisasi array untuk barang yang ditampilkan
        $barangKeluarView = [];
        if (isset($penjualan['penjualan_barang'])) {
            foreach ($penjualan['penjualan_barang'] as $barang) {
                $barangDetail = $barang['barang']; // Detail barang dari API get-penjualan
                if ($barangDetail) {
                    $barangKeluarView[] = [
                        'id' => $barangDetail['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang'],
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '',
                        'harga_jual' => $barang['harga_jual'] * $barang['jumlah'], // Total harga
                    ];
                }
            }
        }

        $barangKembaliView = [];
        if (isset($pembelian['pembelian_barang'])) {
            foreach ($pembelian['pembelian_barang'] as $barang) {
                $barangDetail = $barang['barang']; // Detail barang dari API get-penjualan
                if ($barangDetail) {
                    $barangKembaliView[] = [
                        'id' => $barangDetail['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang'],
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '',
                    ];
                }
            }
        }

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait
        $tagihan = $laporan->tagihan; // Ambil tagihan

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
            'barangKembaliView' => $barangKembaliView,
            'galeri' => $galeri,
            'tagihan' => $tagihan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();
        $laporan = LaporanKerja::findOrFail($id);
        $data = $request->all();
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);
        $userName = UserApi::getUserById($laporan->user_id);

        $jamMulaiKerja = strtotime($laporan->jam_mulai);
        $jamSelesaiKerja = strtotime($laporan->jam_selesai);
        $jamMulai = strtotime("06:00:00");
        $jamSelesai = strtotime("17:00:00");
        if ($jamSelesaiKerja <= $jamMulaiKerja) {
            $jamSelesaiKerja += 86400; //Tambah 1 hari
        }

        $biaya = Biaya::where('customer_id', $laporan->customer_id)->first();
        $biayaKerja = $biaya->jam_kerja / 3600;
        $biayaLembur = $biaya->jam_lembur / 3600;

        // Format pesan WhatsApp
        $pesanWhatsApp = "Laporan *" . $userName['name'] . "* :\n" .
                        "Tanggal: " . $laporan->tanggal_kegiatan . "\n" .
                        "Jam Kerja : " . $laporan->jam_mulai . " - " . $laporan->jam_selesai . "\n".
                        "Jenis Kegiatan: " . $laporan->jenis_kegiatan . "\n" .
                        "Keterangan Kegiatan: " . $laporan->keterangan_kegiatan . "\n" .
                        "Barang Keluar: ";
        // Jika status diubah menjadi selesai, kirim data barang ke web lama
        if ($request->status === 'selesai') {
            // rumus hitung jam kerja
            if ($jamMulaiKerja >= $jamMulai && $jamMulaiKerja <= $jamSelesai) {
                if ($jamSelesaiKerja <= $jamSelesai && $jamSelesaiKerja >= $jamMulai) { // Tidak ada lembur
                    $totalBiayaKerja = ($jamSelesaiKerja - $jamMulaiKerja) * $biayaKerja;
                    $this->createTagihan($laporan->id, 'Biaya Kerja', $totalBiayaKerja);
                } else { // Ada Lembur
                    $totalBiayaKerja = ($jamSelesai - $jamMulaiKerja) * $biayaKerja;
                    $totalBiayaLembur = ($jamSelesaiKerja - $jamSelesai) * $biayaLembur;
                    $this->createTagihan($laporan->id, 'Biaya Kerja', $totalBiayaKerja);
                    $this->createTagihan($laporan->id, 'Biaya Lembur', $totalBiayaLembur);
                    
                }
            } else {
                // Semua jam lembur
                $totalBiayaLembur = ($jamSelesaiKerja - $jamMulaiKerja) * $biayaLembur;
                $this->createTagihan($laporan->id, 'Biaya Lembur', $totalBiayaLembur);
            }

            // biaya transport mitra
            if ($biaya->customer_id) {
                $biayaTransport = $biaya->transport;
                $this->createTagihan($laporan->id, 'Biaya Transport', $biayaTransport);
            }

            if ($request->transport) {
                $biayaTransport = $biaya->transport;
                $this->createTagihan($laporan->id, 'Biaya Transport', $biayaTransport);
            }

            $message = '';
            if ($barangKeluar) {
                $responseKeluar = ApiResponse::post('/api/penjualan', [
                    'user_id' => $laporan->user_id,
                    'barang' => $barangKeluar,
                    'kegiatan' => $laporan->jenis_kegiatan,
                    'tanggal_penjualan' => $laporan->tanggal_kegiatan,
                    'customer_id' => $laporan->customer_id,
                    'laporan_id' => $laporan->id,
                ]);
                if ($responseKeluar->failed()) {
                    return redirect()->back()->with('error', 'Gagal mencatat barang keluar (cek stok barang).');
                }
                // pesan WA 
                foreach ($barangKeluar as $barang) {
                    // Cari data barang berdasarkan ID di array $barangs
                    $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                    // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                    if ($barangDetail) {
                        $pesanWhatsApp .= "\n- " . $barangDetail['nama_barang'] . " (" . $barang['jumlah'] . "x)";
                    }
                }
                $message .= 'barang keluar ';
            }
            if ($barangKembali) {
                $responseKembali = ApiResponse::post('/api/pembelian', [
                    'user_id' => $laporan->user_id,
                    'barang' => $barangKembali,
                    'kegiatan' => $laporan->jenis_kegiatan,
                    'tanggal_pembelian' => $laporan->tanggal_kegiatan,
                    'laporan_id' => $laporan->id
                ]);
                // pesan WA 
                $pesanWhatsApp .= "\nBarang Kembali: ";
                foreach ($barangKembali as $barang) {
                    // Cari data barang berdasarkan ID di array $barangs
                    $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);
                    // Jika barang ditemukan, tambahkan ke array hasil dengan nama
                    if ($barangDetail) {
                        $pesanWhatsApp .= "\n- " . $barangDetail['nama_barang'] . " (" . $barang['jumlah'] . "x)";
                    }
                }
                $message .= 'dan barang kembali ';
            }

            if ($laporan->customer_id) {
                $penjualan = ApiResponse::get('/api/get-penjualan/' . $id)->json();
                $biayaBarang = 0;
                if (isset($penjualan['penjualan_barang'])) {
                    foreach ($penjualan['penjualan_barang'] as $barang) {
                        $barangDetail = $barang['barang']; // Detail barang dari API get-penjualan
                        if ($barangDetail) {
                            $biayaBarang += $barang['harga_jual'] * $barang['jumlah'];
                        }
                    }
                    $this->createTagihan($laporan->id, 'Biaya Barang', $biayaBarang);
                }
            }
            
            $linkWhatsApp = "https://wa.me/6285755556574?text=" . urlencode($pesanWhatsApp);
            if ($barangKeluar || $barangKembali) {
                $laporan->update($data);
                if ($barangKembali) {
                    if ($responseKembali->failed()) {
                        return redirect()->back()->with('error', 'Laporan berhasil di post. (ada error di barang kembali)')
                            ->with('whatsappLink', $linkWhatsApp);
                    }
                }
                return redirect()->back()->with('success', 'Laporan ' .$message. 'berhasil di post.')
                    ->with('whatsappLink', $linkWhatsApp);
            }
            $laporan->update($data);
            return redirect()->back()->with('success', 'Laporan berhasil di post.')
                ->with('whatsappLink', $linkWhatsApp);
        }
        
        // reject laporan kerja
        $message = '';
        if ($request->status === 'cancel') {
            if ($barangKeluar) {
                $responseKeluar = ApiResponse::post('/api/penjualan-destroy', [
                    'laporan_id' => $laporan->id,
                ]);
                if ($responseKeluar->failed()) {
                    if (session('user_role') != 'superadmin') {
                        return redirect()->back()->with('error', 'Gagal reject data, terjadi error dibagian web gudang.');
                    }
                    $message .= 'harap cek data barang, ada error dibagian web gudang';
                }
            }
            if ($barangKembali) {
                $responseKembali = ApiResponse::post('/api/pembelian-destroy', [
                    'laporan_id' => $laporan->id,
                ]);
                if ($responseKembali->failed()) {
                    if (session('user_role') != 'superadmin') {
                        return redirect()->back()->with('error', 'Gagal reject data, terjadi error dibagian web gudang.');
                    }
                    $message .= 'harap cek data barang, ada error dibagian web gudang';
                }
            }
            $laporan->tagihan()->delete();
            $laporan->update(['status' => 'pending']);
        }else {
            $laporan->update($data);
        }
        return redirect()->back()->with('error', 'Laporan dibatalkan.'. $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function createTagihan($laporanId, $namaBiaya, $totalBiaya)
    {
        Tagihan::create([
            'laporan_id' => $laporanId,
            'nama_biaya' => $namaBiaya,
            'total_biaya' => $totalBiaya
        ]);
    }

}
