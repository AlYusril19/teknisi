<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Biaya;
use App\Models\ChatLaporan;
use App\Models\GajiDetailDefault;
use App\Models\LaporanKerja;
use App\Models\Tagihan;
use App\Models\UserApi;
use BarangHelper;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

        // Cek apakah teknisi dipilih
        if ($request->teknisi) {
            $laporanQuery->where(function($query) use ($request) {
                $query->where('user_id', $request->teknisi)
                    ->orWhereHas('teknisi', function ($q) use ($request) {
                        $q->where('teknisi_id', $request->teknisi);
                    });
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
            $lap->mitra = collect($customers)->firstWhere('id', $lap->customer_id);
            $lap->support = getTeknisi($lap);
            $lap->supportHelper = getHelper($lap);
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
        $laporans = LaporanKerja::with('teknisi')->where('status', 'pending')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $komentarCount = ChatLaporan::where('is_read', false)
            ->where('user_id', '!=', session('user_id'))
            ->count();

        // Ambil nama user dari API eksternal dan lampirkan ke laporan
        foreach ($laporans as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
            $lap->support = getTeknisi($lap);
            $lap->supportHelper = getHelper($lap);
            $lap->chatCount = ChatLaporan::where('is_read', false)
            ->where('user_id', '!=', session('user_id'))
            ->where('laporan_id', '=', $lap->id)
            ->count();
        }

        // Ambil data customer dari web lama via API
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

            // ambil data barang keluar dan kembali (di database teknisi)
            $barangKeluarView = BarangHelper::processBarang($barangKeluar);
            $barangKembaliView = BarangHelper::processBarang($barangKembali);

            // Tambahkan laporan dan barang ke array hasil
            $laporanBarangView[] = [
                'laporan' => $laporan,
                'customer' => $customer,
                'barangKeluarView' => $barangKeluarView,
                'barangKembaliView' => $barangKembaliView,
                // 'komentarCount' => $komentarCount
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

        $barangKeluarView = BarangHelper::getBarangKeluarView($penjualan);
        $barangKembaliView = BarangHelper::getBarangKembaliView($pembelian);

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
        $this->validateRequest($request);
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();
        $laporan = LaporanKerja::with('penagihan', 'teknisi', 'komentar')->findOrFail($id);
        $data = $request->all();
        $barangKeluar = json_decode($laporan->barang, true);
        $barangKembali = json_decode($laporan->barang_kembali, true);
        $userName = UserApi::getUserById($laporan->user_id);
        $chatIdTeknisi = $userName['id_telegram'];

        $jamMulaiKerja = strtotime($laporan->jam_mulai);
        $jamSelesaiKerja = strtotime($laporan->jam_selesai);
        $jamMulai = strtotime("06:00:00");
        // $jamSelesai = strtotime("17:00:00");
        if ($request->shift) {
            $jamSelesai = strtotime($request->shift) + 32400; // 9 jam kerja
        } else {
            $jamSelesai = strtotime("17:00:00");
        }
        if ($jamSelesaiKerja <= $jamMulaiKerja) {
            $jamSelesaiKerja += 86400; //Tambah 1 hari
        }

        $biayaJarakTempuh = 0;
        $biayaTransport = 0;

        if ($laporan->customer_id) {
            $biaya = Biaya::where('customer_id', $laporan->customer_id)->first();
            if ($biaya === null) {
                return redirect()->back()->with('error', 'Harap masukkan Biaya Customer yang bersangkutan');
            }
            // rumus biaya jarak tempuh
            if ($biaya->jarak_tempuh != null) {
                $jarakTempuh = $biaya->jarak_tempuh * 1.05; // toleransi 5%
                // jika pakai mobil
                if ($request->mobil) {
                    $durasiTempuh = $jarakTempuh * 1.76; // hitung waktu tempuh
                    $bbm = 667 * ($jarakTempuh * 2);
                    $commentMobil = ' dan mobil';
                }else {
                    $durasiTempuh = $jarakTempuh * 1.56; // hitung waktu tempuh
                    $bbm = 232 * ($jarakTempuh * 2); // hitung konsumsi BBM
                }
                $biayaDurasi = 274 * ($durasiTempuh * 2); // biaya jarak tempuh teknisi
                $biayaJarakTempuh = $bbm + $biayaDurasi;
            }

            // rumus jika kendaraan lebih dari 1
            if ($request->kendaraan > 1) {
                $biayaJarakTempuh *= $request->kendaraan;
            }

            $biayaTransport = $biaya->transport;
        }

        $biayaStaff = GajiDetailDefault::where('teknisi_id', $laporan->user_id)->where('aktif', 1)->get();
        $biayaRole = GajiDetailDefault::where('role', $userName['role'])->where('aktif', 1)->get();
        $itemBiaya = $biayaStaff->isNotEmpty() ? $biayaStaff : $biayaRole;
        // Jika ada biaya di staff atau role
        if ($itemBiaya->isNotEmpty()) {
            $biayaDetails = $this->rumusGaji($itemBiaya);
            $biayaKerja = $biayaDetails['biayaKerja'];
            $biayaLembur = $biayaDetails['biayaLembur'];
        }else {
            return redirect()->back()->with('error', 'terjadi kesalahan update, harap hubungi SPV perihal input gaji');
        }

        $comment = '';
        // jika tag teknisi lain
        if ($laporan->teknisi()->count() > 0) {
            $jumlahTeknisi = $laporan->teknisi()->count() + 1;
            $comment .= ' '.$jumlahTeknisi.'x';
            $biayaTransport *= $jumlahTeknisi;
            foreach ($laporan->teknisi as $teknisi) {
                $userTag = UserApi::getUserById($teknisi->teknisi_id);
                $biayaStaff = GajiDetailDefault::where('teknisi_id', $userTag['id'])->where('aktif', 1)->get();
                $biayaRole = GajiDetailDefault::where('role', $userTag['role'])->where('aktif', 1)->get();
                $itemBiaya = $biayaStaff->isNotEmpty() ? $biayaStaff : $biayaRole;

                if ($itemBiaya->isNotEmpty()) {
                    $biayaDetails = $this->rumusGaji($itemBiaya);
                    $biayaKerja += $biayaDetails['biayaKerja'];
                    $biayaLembur += $biayaDetails['biayaLembur'];
                }else {
                    return redirect()->back()->with('error', 'terjadi kesalahan update, harap hubungi SPV perihal input gaji');
                }
            }
        }

        // jika ada diskon
        if ($request->diskon > 0) {
            $laporan->update(['diskon' => $request->diskon]);
            $diskon = (100-$request->diskon) / 100;
            $biayaKerja *= $diskon;
            $biayaLembur *= $diskon;
            $biayaTransport *= $diskon;
            $comment .= ' ('.$request->diskon. '% Off)';
        }
        $commentTagihan = $comment ?? '';
        $commentTransport = $commentMobil ?? '';

        $biayaTransport += $biayaJarakTempuh; // biaya transport + biaya kendaraan

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
                    $totalBiayaKerja = ceil(($jamSelesaiKerja - $jamMulaiKerja)/3600) * $biayaKerja;
                    $this->createTagihan($laporan->id, 'Biaya Kerja' . $commentTagihan, $totalBiayaKerja);
                } else { // Ada Lembur
                    $totalBiayaKerja = ceil(($jamSelesai - $jamMulaiKerja)/3600) * $biayaKerja;
                    $totalBiayaLembur = ceil(($jamSelesaiKerja - $jamSelesai)/3600) * $biayaLembur;
                    $this->createTagihan($laporan->id, 'Biaya Kerja' . $commentTagihan, $totalBiayaKerja);
                    $this->createTagihan($laporan->id, 'Biaya Lembur' . $commentTagihan, $totalBiayaLembur);
                    
                }
            } else {
                // Semua jam lembur
                $totalBiayaLembur = ceil(($jamSelesaiKerja - $jamMulaiKerja)/3600) * $biayaLembur;
                $this->createTagihan($laporan->id, 'Biaya Lembur' . $commentTagihan, $totalBiayaLembur);
            }

            // biaya transport mitra
            if ($laporan->customer_id) {
                $this->createTagihan($laporan->id, 'Biaya Transport' . $commentTagihan.$commentTransport, $biayaTransport);
            }

            if ($request->transport) {
                $this->createTagihan($laporan->id, 'Biaya Transport' . $commentTagihan, $biayaTransport);
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
                    $laporan->tagihan()->delete();
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
                        $laporan->komentar()->delete();
                        return redirect()->back()->with('error', 'Laporan berhasil di post. (ada error di barang kembali)')
                            ->with('whatsappLink', $linkWhatsApp);
                    }
                }
                $laporan->komentar()->delete();
                return redirect()->back()->with('success', 'Laporan ' .$message. 'berhasil di post.')
                    ->with('whatsappLink', $linkWhatsApp);
            }            
            $laporan->komentar()->delete();
            $laporan->update($data);
            return redirect()->back()->with('success', 'Laporan berhasil di post.')
                ->with('whatsappLink', $linkWhatsApp);
        }
        
        // reject laporan kerja
        $message = '';
        if ($request->status === 'cancel') {
            // validasi penagihan
            if ($laporan->penagihan != null) {
                if ($laporan->penagihan->status === 'baru') {
                    return redirect()->back()->with('error', 'Laporan sudah masuk data penagihan. (harap hapus penagihan terlebih dahulu)');
                }
                return redirect()->back()->with('error', 'Laporan sudah ada penagihan dan telah dibayar (harap hubungi SPV).');
            }

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
            $messageTeknisi = "Laporan Anda telah di reject oleh Admin <b>" . session('user_name') . "</b>, harap dicek kembali";
            sendMessage($messageTeknisi, $chatIdTeknisi);
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

    private function validateRequest($request) {
        $request->validate([  
            'diskon' => 'nullable|numeric|min:0|max:100',  
            'kendaraan' => 'nullable|numeric|min:0|max:10', 
        ], [  
            'diskon.min' => 'Diskon tidak boleh kurang dari 0.',  
            'diskon.max' => 'Diskon tidak boleh lebih dari 100.',  
            'kendaraan.min' => 'Kendaraan tidak boleh kurang dari 0.',  
            'kendaraan.max' => 'Kendaraan tidak boleh lebih dari 10.',  
        ]); 
    }

    // Rumus Gaji Role atau Staff /Jam
    private function rumusGaji($gaji) {
        $gajiPlus = $gaji->where('jenis', 'tambah')->sum('jumlah');
        $gajiMinus = $gaji->where('jenis', 'potong')->sum('jumlah');
        $totalGaji = $gajiPlus - $gajiMinus;
        $biayaKerja = ($totalGaji / 26 / 8);
        $biayaLembur = $biayaKerja * 2;

        return [
            'biayaKerja' => $biayaKerja,
            'biayaLembur' => $biayaLembur,
        ];
    }
}
