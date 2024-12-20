<?php

namespace App\Http\Controllers;

use App\Models\LaporanKerja;
use App\Models\UserApi;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminBerandaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userName = session('user_name');
        $userRole = session('user_role');
        $now = Carbon::now();

        // Get laporan pending
        $laporanPending = LaporanKerja::where('status', 'pending')->count();

        // Get jumlah laporan bulan berjalan dan kemarin
        $bulanSekarang = $now->month;
        $tahunSekarang = $now->year;
        $bulanKemarin = $now->copy()->subMonth()->month;
        $tahunKemarin = $now->copy()->subMonth()->year;

        $laporanSekarang = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanSekarang)
            ->whereYear('tanggal_kegiatan', $tahunSekarang)
            ->where('status', 'selesai')
            ->get();

        $laporanKemarin = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanKemarin)
            ->whereYear('tanggal_kegiatan', $tahunKemarin)
            ->where('status', 'selesai')
            ->get();

        // Hitung jumlah laporan bulan berjalan dan kemarin
        $jumlahLaporanSekarang = $laporanSekarang->count();
        $jumlahLaporanKemarin = $laporanKemarin->count();

        // Hitung persen perbandingan laporan kemarin dan sekarang
        $bandingLaporan = $jumlahLaporanKemarin ? round(($jumlahLaporanSekarang - $jumlahLaporanKemarin) / $jumlahLaporanKemarin * 100, 2) : 0;

        // Tambahkan data user ke laporan
        $laporanKerjaSekarang = $this->tambahDataUser($laporanSekarang);
        $laporanKerjaKemarin = $this->tambahDataUser($laporanKemarin);

        // Hitung total jam kerja per user
        $jamKerjaPerUser = $this->hitungJamKerja($laporanKerjaSekarang);
        $jamKerjaPerUserKemarin = $this->hitungJamKerja($laporanKerjaKemarin);

        // Hitung perbandingan jam kerja per user
        $bandingJamKerjaPerUser = $jamKerjaPerUser->map(function ($data, $userId) use ($jamKerjaPerUserKemarin) {
            $jamSekarang = $data['total_jam'];
            $jamKemarin = $jamKerjaPerUserKemarin->get($userId)['total_jam'] ?? 0;
            $persentase = $jamKemarin > 0 ? round((($jamSekarang - $jamKemarin) / $jamKemarin) * 100, 2) : 0;

            return [
                'name' => $data['name'],
                'total_jam' => $jamSekarang,
                'perbandingan' => $persentase,
            ];
        });

        return view('admin.dashboard', [
            'userName' => $userName,
            'userRole' => $userRole,
            'laporanPending' => $laporanPending,
            'laporanSekarang' => $jumlahLaporanSekarang,
            'bandingLaporan' => $bandingLaporan,
            'bandingJamKerjaPerUser' => $bandingJamKerjaPerUser
        ]);
    }

    private function tambahDataUser($laporanKerja)
    {
        return $laporanKerja->map(function ($laporan) {
            $laporan->user = UserApi::getUserById($laporan->user_id);
            return $laporan;
        });
    }

    private function hitungJamKerja($laporanKerja)
    {
        return $laporanKerja->groupBy('user_id')->map(function ($laporanPerUser) {
            $user = $laporanPerUser->first()->user;
            $namaUser = $user['name'] ?? 'Unknown User';
            $totalJam = $laporanPerUser->reduce(function ($carry, $laporan) {
                $jamMulai = Carbon::parse($laporan->jam_mulai);
                $jamSelesai = Carbon::parse($laporan->jam_selesai);
                return $carry + $jamMulai->diffInHours($jamSelesai);
            }, 0);

            return [
                'name' => $namaUser,
                'total_jam' => $totalJam,
            ];
        });
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
