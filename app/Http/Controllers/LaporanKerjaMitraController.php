<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\UserApi;
use BarangHelper;
use Illuminate\Http\Request;

class LaporanKerjaMitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ambil user_id dari session
        $userId = session('user_id');
        $customerIds = getCustomerId($userId);

        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()
            ->where('status', 'selesai')
            ->whereIn('customer_id', $customerIds);
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
        }

        // Tampilkan ke view
        return view('mitra.mitra_laporan_kerja_index', [
            'laporan' => $laporan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        $barangKeluarView = BarangHelper::getBarangKeluarView($penjualan);  

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait
        $tagihan = $laporan->tagihan; // Ambil tagihan

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
