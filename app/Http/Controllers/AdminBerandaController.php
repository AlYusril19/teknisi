<?php

namespace App\Http\Controllers;

use App\Models\LaporanKerja;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminBerandaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userName = session('user_name'); // Ambil nama user dari session
        $userRole = session('user_role'); // Ambil role user dari session
        $now = Carbon::now();

        // get laporan Pending
        $laporanPending = LaporanKerja::where('status', 'pending')->count();
        // get jumlah laporan bulan berjalan
        $bulanSekarang = $now->month;
        $tahunSekarang = $now->year;
        $laporanSekarang = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanSekarang)
                            ->whereYear('tanggal_kegiatan', $tahunSekarang)
                            ->where('status', 'selesai')
                            ->count();
        // get laporan bulan kemarin
        $bulanKemarin = $now->subMonth()->month;
        $tahunKemarin = $now->subMonth()->year;
        $laporanKemarin = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanKemarin)
                            ->whereYear('tanggal_kegiatan', $tahunKemarin)
                            ->where('status', 'selesai')
                            ->count();
        
        // hitung persen perbandingan laporan kemarin dan sekarang
        $bandingLaporan = 0;
        if ($laporanKemarin) {
            $bandingLaporan = round(($laporanSekarang-$laporanKemarin)/$laporanKemarin*100 , 2);
        }

        return view('admin.dashboard',[
            'userName' => $userName, 
            'userRole' => $userRole,
            'laporanPending' => $laporanPending,
            'laporanSekarang' => $laporanSekarang,
            'bandingLaporan' => $bandingLaporan
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
        //
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
