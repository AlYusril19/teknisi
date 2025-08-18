<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Pembayaran;
use App\Models\UserApi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AdminBerandaController extends Controller
{
    private $routePrefix = 'admin';
    private $layout = 'layouts.app_sneat_admin';
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

        // Tentukan tanggal awal dan akhir periode
        $tanggalAwal = Carbon::createFromDate($tahunDipilih, $bulanDipilih, 29)->subMonth()->startOfDay();
        $tanggalAkhir = Carbon::createFromDate($tahunDipilih, $bulanDipilih, 28)->endOfDay();

        // Tentukan tanggal awal dan akhir periode bulan sebelumnya
        $tanggalAwalBulanLalu = $tanggalAwal->copy()->subMonth();
        $tanggalAkhirBulanLalu = $tanggalAkhir->copy()->subMonth();

        // Get laporan pending
        $laporanPending = LaporanKerja::where('status', 'pending')->count();

        // Laporan untuk periode sekarang
        $laporanSekarang = LaporanKerja::with('teknisi')
            ->whereBetween('tanggal_kegiatan', [$tanggalAwal, $tanggalAkhir])
            ->where('status', 'selesai')
            ->get();

        // dd($laporanSekarang->toArray());

        // Laporan untuk periode bulan sebelumnya
        $laporanKemarin = LaporanKerja::with('teknisi')
            ->whereBetween('tanggal_kegiatan', [$tanggalAwalBulanLalu, $tanggalAkhirBulanLalu])
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
            $jamSekarang = round($data['total_jam'], 1);
            $jamKemarin = $jamKerjaPerUserKemarin->get($userId)['total_jam'] ?? 0;
            $persentase = $jamKemarin > 0 ? round((($jamSekarang - $jamKemarin) / $jamKemarin) * 100, 2) : 0;

            return [
                'user_id' => $data['user_id'],
                'name' => $data['name'],
                'total_jam' => formatDuration($jamSekarang),
                'perbandingan' => $persentase,
            ];
        });

        // informasi pembayaran pending pelanggan
        $pembayaran = Pembayaran::where('status', 'pending')->count();

        return view('admin.dashboard', [
            'userName' => $userName,
            'userRole' => $userRole,
            'laporanPending' => $laporanPending,
            'laporanSekarang' => $jumlahLaporanSekarang,
            'bandingLaporan' => $bandingLaporan,
            'bandingJamKerjaPerUser' => $bandingJamKerjaPerUser,
            'pembayaran' => $pembayaran
        ]);
    }

    private function tambahDataUser($laporanKerja)
    {
        return $laporanKerja->map(function ($laporan) {
            $laporan->user = UserApi::getUserById($laporan->user_id);
            return $laporan;
        });
    }

    private function hitungJamKerja($laporanKerja): mixed
    {
        $jamKerja = [];

        foreach ($laporanKerja as $laporan) {
            // Hitung durasi jam kerja
            $jamMulai = Carbon::parse($laporan->jam_mulai);
            $jamSelesai = Carbon::parse($laporan->jam_selesai);
            if ($jamSelesai->lessThan($jamMulai)) {
                $jamSelesai->addDay();
            }
            $durasi = $jamMulai->diffInSeconds($jamSelesai);

            // Ambil semua user yang terlibat: user_id utama + semua teknisi_id
            $userIds = [$laporan->user_id];
            if (!empty($laporan->teknisi)) {
                foreach ($laporan->teknisi as $teknisi) {
                    $userIds[] = $teknisi->teknisi_id;
                }
            }

            // Hitung jam kerja per user
            foreach ($userIds as $userId) {
                if (!isset($jamKerja[$userId])) {
                    $user = UserApi::getUserById($userId);
                    $jamKerja[$userId] = [
                        'user_id' => $userId,
                        'name' => $user['name'] ?? 'Unknown User',
                        'total_jam' => 0,
                    ];
                }
                $jamKerja[$userId]['total_jam'] += $durasi;
            }
        }

        return collect($jamKerja);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $menu = $request->query('menu');
        $userId = session('user_id');
        $user = ApiResponse::get('/api/get-user/'.$userId)->json();
        switch ($menu) {
            case 'account':
                $view = "edit_profile";
                break;
            
            case 'notification':
                $view = "edit_profile_notification";
                break;
            
            case 'security':
                $view = "edit_profile_security";
                break;
            
            default:
                $view = "edit_profile";
                break;
        }
        return view($view, [
            'user' => $user,
            'routePrefix'   => $this->routePrefix,
            'layout'        => $this->layout,
            'menu'          => $menu,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    // store user
    public function store(Request $request)
    {
        $userId = session('user_id');
        $user = ApiResponse::get('/api/get-user/'.$userId)->json();
        // Validasi input form
        $request->validate([
            'name' => 'nullable|string|max:64',
            'nohp' => 'nullable|string|max:13',
            'email' => 'nullable|string|max:64',
            'id_telegram' => 'nullable|string|max:15',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Ambil token dari session
        $token = session('api_token');

        // Siapkan data untuk dikirim ke API
        $data = [
            'name' => $request->name ?? $user['name'],
            'nohp' => $request->nohp ?? $user['nohp'],
            'email' => $request->email ?? $user['email'],
            'id_telegram' => $request->id_telegram ?? $user['id_telegram'],
            'alamat' => $request->alamat ?? $user['alamat'],
            'tanggal_lahir' => $request->tanggal_lahir ?? $user['tanggal_lahir'],
        ];

        if ($request->filled('id_telegram')) {
            $idTelegram = $request->id_telegram;
            $rensponseTelegram = testTelegramId($idTelegram);
            if (!$rensponseTelegram->successful()) {
                return redirect()->back()->with('error', 'Id Telegram salah atau tidak terdaftar!');
            }
        }

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
            session([
                'user_name'   => $data['name'],
                'user_email' => $data['email'],
                'nohp' => $data['nohp'], 
                'id_telegram' => $data['id_telegram'],
            ]);

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
