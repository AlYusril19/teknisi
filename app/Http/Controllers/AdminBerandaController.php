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
    public function index(Request $request)
    {
        $userName = session('user_name');
        $userRole = session('user_role');
        $now = Carbon::now();

        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang

        // Bulan sebelumnya untuk perbandingan
        $bulanSebelumnya = Carbon::createFromDate($tahunDipilih, $bulanDipilih)->subMonth()->month;
        $tahunSebelumnya = Carbon::createFromDate($tahunDipilih, $bulanDipilih)->subMonth()->year;

        // Get laporan pending
        $laporanPending = LaporanKerja::where('status', 'pending')->count();

        $laporanSekarang = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanDipilih)
            ->whereYear('tanggal_kegiatan', $tahunDipilih)
            ->where('status', 'selesai')
            ->get();

        $laporanKemarin = LaporanKerja::whereMonth('tanggal_kegiatan', $bulanSebelumnya)
            ->whereYear('tanggal_kegiatan', $tahunSebelumnya)
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
            $jamSekarang = round($data['total_jam'],1);
            $jamKemarin = $jamKerjaPerUserKemarin->get($userId)['total_jam'] ?? 0;
            $persentase = $jamKemarin > 0 ? round((($jamSekarang - $jamKemarin) / $jamKemarin) * 100, 2) : 0;

            return [
                'user_id' => $data['user_id'],
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
                // Jika jam selesai lebih kecil, tambahkan 1 hari
                if ($jamSelesai->lessThan($jamMulai)) {
                    $jamSelesai->addDay();
                }

                return $carry + $jamMulai->diffInSeconds($jamSelesai);
            }, 0) / 3600; // Konversi detik ke jam
            return [
                'user_id' => $user['id'],
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
