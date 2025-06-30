<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use Carbon\CarbonInterval;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class TeknisiBerandaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userName = session('user_name'); // Ambil nama user dari session
        $userRole = session('user_role'); // Ambil role user dari session
        $userId = session('user_id');
        $now = Carbon::now();
        
        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang

        // Tentukan tanggal awal dan akhir periode
        $tanggalAwal = Carbon::createFromDate($tahunDipilih, $bulanDipilih, 29)->subMonth()->startOfDay();
        $tanggalAkhir = Carbon::createFromDate($tahunDipilih, $bulanDipilih, 28)->endOfDay();

        // Tentukan tanggal awal dan akhir periode bulan sebelumnya
        $tanggalAwalBulanLalu = $tanggalAwal->copy()->subMonth();
        $tanggalAkhirBulanLalu = $tanggalAkhir->copy()->subMonth();

        // Get laporan pending
        $laporanReject = LaporanKerja::where('status', 'reject')
            ->where('user_id', $userId)
            ->count();

        // Laporan untuk periode sekarang
        $laporanSekarang = LaporanKerja::with('teknisi')
            ->where(function ($query) use ($tanggalAwal, $tanggalAkhir, $userId) {
                $query->whereBetween('tanggal_kegiatan', [$tanggalAwal, $tanggalAkhir])
                    ->where('status', 'selesai')
                    ->where(function ($q) use ($userId) {
                        $q->where('user_id', $userId)
                            ->orWhereHas('teknisi', function ($subQuery) use ($userId) {
                                $subQuery->where('teknisi_id', $userId);
                            });
                    });
            })
            ->get();


        // Laporan untuk periode bulan sebelumnya
        $laporanKemarin = LaporanKerja::with('teknisi')
            ->where(function ($query) use ($tanggalAwalBulanLalu, $tanggalAkhirBulanLalu, $userId) {
                $query->whereBetween('tanggal_kegiatan', [$tanggalAwalBulanLalu, $tanggalAkhirBulanLalu])
                    ->where('status', 'selesai')
                    ->where(function ($q) use ($userId) {
                        $q->where('user_id', $userId)
                            ->orWhereHas('teknisi', function ($subQuery) use ($userId) {
                                $subQuery->where('teknisi_id', $userId);
                            });
                    });
            })
            ->get();

        // laporan lembur
        $jamLemburSekarang = $laporanSekarang->filter(function ($laporan) {
            $jamSelesai = Carbon::parse($laporan->jam_selesai);
            $jamMulai = Carbon::parse($laporan->jam_mulai);

            // shifting
            if ($laporan->shift === '1') {
                // Kondisi: jam selesai lebih dari 16:00 atau di antara 00:00 dan 06:00
                return $jamSelesai->format('H:i:s') > '16:00:00' || $jamSelesai->format('H:i:s') < $jamMulai->format('H:i:s');
            } else {
                // Kondisi: jam selesai lebih dari 16:00 atau di antara 00:00 dan 06:00
                return $jamSelesai->format('H:i:s') > '21:00:00' || $jamSelesai->format('H:i:s') < $jamMulai->format('H:i:s');
            }
        });

        $jamLemburKemarin = $laporanKemarin->filter(function ($laporan) {
            $jamSelesai = Carbon::parse($laporan->jam_selesai);
            $jamMulai = Carbon::parse($laporan->jam_mulai);

            // shifting
            if ($laporan->shift === '1') {
                // Kondisi: jam selesai lebih dari 16:00 atau di antara 00:00 dan 06:00
                return $jamSelesai->format('H:i:s') > '16:00:00' || $jamSelesai->format('H:i:s') < $jamMulai->format('H:i:s');
            } else {
                // Kondisi: jam selesai lebih dari 16:00 atau di antara 00:00 dan 06:00
                return $jamSelesai->format('H:i:s') > '21:00:00' || $jamSelesai->format('H:i:s') < $jamMulai->format('H:i:s');
            }
        });

        // Hitung jumlah laporan bulan berjalan dan kemarin
        $jumlahLaporanSekarang = $laporanSekarang->count();
        $jumlahLaporanKemarin = $laporanKemarin->count();

        // Hitung persen perbandingan laporan kemarin dan sekarang
        $bandingLaporan = $jumlahLaporanKemarin ? round(($jumlahLaporanSekarang - $jumlahLaporanKemarin) / $jumlahLaporanKemarin * 100, 2) : 0;

        $totalJamKerjaSekarang = 0;
        $totalJamKerjaKemarin = 0;

        foreach ($laporanSekarang as $laporan) {
            $jamMulai = Carbon::parse($laporan->jam_mulai);
            $jamSelesai = Carbon::parse($laporan->jam_selesai);

            // Tambahkan 1 hari jika jam selesai lebih kecil dari jam mulai
            if ($jamSelesai < $jamMulai) {
                $jamSelesai->addDay();
            }

            // Hitung durasi dan tambahkan ke total
            $totalJamKerjaSekarang += $jamSelesai->diffInSeconds($jamMulai);
        }
        foreach ($laporanKemarin as $laporan) {
            $jamMulai = Carbon::parse($laporan->jam_mulai);
            $jamSelesai = Carbon::parse($laporan->jam_selesai);

            // Tambahkan 1 hari jika jam selesai lebih kecil dari jam mulai
            if ($jamSelesai < $jamMulai) {
                $jamSelesai->addDay();
            }

            // Hitung durasi dan tambahkan ke total
            $totalJamKerjaKemarin += $jamSelesai->diffInSeconds($jamMulai);
        }

        $bandingJamKerja = $totalJamKerjaKemarin ? round(($totalJamKerjaSekarang - $totalJamKerjaKemarin) / $totalJamKerjaKemarin * 100, 2) : 0;
        // $totalJamKerjaSekarang = round($totalJamKerjaSekarang/3600,2);
        $totalJamKerjaSekarang = formatDuration($totalJamKerjaSekarang);

        $totalJamLemburSekarang = 0;
        $totalJamLemburKemarin = 0;
        foreach ($jamLemburSekarang as $laporan) {
            $jamMulai = Carbon::parse($laporan->jam_mulai);
            $jamSelesai = Carbon::parse($laporan->jam_selesai);
            if ($laporan->shift === '1') {
                $jamLembur = Carbon::parse('16:00');
            } else {
                $jamLembur = Carbon::parse('21:00');
            }

            // Tambahkan 1 hari jika jam selesai lebih kecil dari jam mulai
            if ($jamSelesai < $jamMulai) {
                $jamSelesai->addDay();
            }

            // Hitung durasi dan tambahkan ke total
            if ($jamMulai > $jamLembur) {
                $totalJamLemburSekarang += $jamSelesai->diffInSeconds($jamMulai);
            }else {
                $totalJamLemburSekarang += $jamSelesai->diffInSeconds($jamLembur);
            }
        }
        foreach ($jamLemburKemarin as $laporan) {
            $jamMulai = Carbon::parse($laporan->jam_mulai);
            $jamSelesai = Carbon::parse($laporan->jam_selesai);
            if ($laporan->shift === '1') {
                $jamLembur = Carbon::parse('16:00');
            } else {
                $jamLembur = Carbon::parse('21:00');
            }

            // Tambahkan 1 hari jika jam selesai lebih kecil dari jam mulai
            if ($jamSelesai < $jamMulai) {
                $jamSelesai->addDay();
            }

            // Hitung durasi dan tambahkan ke total
            $totalJamLemburKemarin += $jamSelesai->diffInSeconds($jamLembur);
        }
        $bandingJamLembur = $totalJamLemburKemarin ? round(($totalJamLemburSekarang - $totalJamLemburKemarin) / $totalJamLemburKemarin * 100, 2) : 0;
        // $totalJamLemburSekarang = round($totalJamLemburSekarang/3600,2);
        $totalJamLemburSekarang = formatDuration($totalJamLemburSekarang);

        return view('teknisi.dashboard',[
            'userName' => $userName, 
            'userRole' => $userRole,
            'laporanReject' => $laporanReject,
            'laporanSekarang' => $jumlahLaporanSekarang,
            'bandingLaporan' => $bandingLaporan,
            'totalJamKerjaSekarang' => $totalJamKerjaSekarang,
            'bandingJamKerja' => $bandingJamKerja,
            'totalJamLemburSekarang' => $totalJamLemburSekarang,
            'bandingJamLembur' => $bandingJamLembur
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userId = session('user_id');
        $user = ApiResponse::get('/api/get-user/'.$userId)->json();

        $userName = $user['name'];
        $idTelegram = $user['id_telegram'];
        $nohp = $user['nohp'];
        return view('teknisi.edit_profile', [
            'userName' => $userName,
            'idTelegram' => $idTelegram,
            'nohp' => $nohp
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input form
        $request->validate([
            'name' => 'required|string|max:255',
            'nohp' => 'required|string|max:13',
            'id_telegram' => 'required|string|max:15',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Ambil token dari session
        $token = session('api_token');

        // Siapkan data untuk dikirim ke API
        $data = [
            'name' => $request->name,
            'nohp' => $request->nohp,
            'id_telegram' => $request->id_telegram,
        ];

        // Jika password diisi, tambahkan ke data yang dikirim
        if ($request->filled('password')) {
            $data['password'] = $request->password;
            $data['password_confirmation'] = $request->password_confirmation;
        }

        // Kirim request ke API untuk update profile
        $urlApi = env('APP_URL_API');
        $response = Http::withToken($token)->put($urlApi . '/api/user/update', $data);

        // Jika request berhasil
        if ($response->successful()) {
            // Update nama di session
            session(['user_name' => $request->name]);

            return redirect()->back()->with('success', 'Profile updated successfully!');
        }

        // Jika gagal, kembalikan dengan error
        return back()->withErrors(['message' => 'Failed to update profile.']);
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
