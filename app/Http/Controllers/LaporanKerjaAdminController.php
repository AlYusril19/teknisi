<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\UserApi;
use Illuminate\Http\Request;

class LaporanKerjaAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()->where('status', 'selesai');

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
                $query->where('jenis_kegiatan', 'like', '%' . $request->search . '%')
                    ->orWhere('keterangan_kegiatan', 'like', '%' . $request->search . '%');
            });
        }

        // Ambil data laporan yang sudah difilter
        $laporan = $laporanQuery->orderBy('tanggal_kegiatan', 'desc')->get();

        // Mengambil data user
        foreach ($laporan as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
        }

        // Tampilkan ke view
        return view('admin.admin_laporan_kerja_index', [
            'laporan' => $laporan
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
        $response = ApiResponse::get('/api/get-barang');
        $barangs = $response->json();

        // Inisialisasi array untuk menyimpan data laporan beserta barangnya
        $laporanBarangView = [];

        foreach ($laporans as $laporan) {
            // Decode JSON barang ke dalam array
            $barangKeluar = json_decode($laporan->barang, true);
            $barangKeluarView = [];

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
                        ];
                    }
                }
            }

            // Tambahkan laporan dan barang ke array hasil
            $laporanBarangView[] = [
                'laporan' => $laporan,
                'barangKeluarView' => $barangKeluarView
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

        // Ambil barang keluar dari laporan
        $barangKeluar = json_decode($laporan->barang, true);

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

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
            'galeri' => $galeri
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
        $laporan = LaporanKerja::findOrFail($id);
        $data = $request->all();
        // $laporan->update($request->all());
        // dd($laporan->barang);
        $barangKeluar = json_decode($laporan->barang, true);
        
        // Jika status diubah menjadi selesai, kirim data barang ke web lama
        if ($request->status === 'selesai') {
            if ($barangKeluar) {
                $response = ApiResponse::post('/api/penjualan', [
                    'user_id' => $laporan->user_id,
                    'barang' => $barangKeluar,
                    'kegiatan' => $laporan->jenis_kegiatan
                ]);
                if ($response->failed()) {
                    return redirect()->back()->with('error', 'Gagal mencatat barang keluar (cek stok barang).');
                }
                $laporan->update($data);
                return redirect()->back()->with('success', 'Laporan dan barang berhasil di post.');
            }
            $laporan->update($data);
            return redirect()->back()->with('success', 'Laporan berhasil di post.');
        }
        $laporan->update($data);
        return redirect()->back()->with('error', 'Laporan belum di setujui, hubungi staff bersangkutan.');
        // dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
