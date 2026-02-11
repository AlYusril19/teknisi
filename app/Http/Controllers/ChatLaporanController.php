<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\ChatLaporan;
use App\Models\LaporanKerja;
use App\Models\UserApi;
use Illuminate\Http\Request;

class ChatLaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function fetch(LaporanKerja $laporan)
    {
        $userIdSession = session('user_id');

        // Ambil semua komentar, termasuk yang belum dibaca
        $komentars = $laporan->komentar()->oldest()->get();

        // Tandai sebagai sudah dibaca (kecuali komentar dari user sendiri)
        $laporan->komentar()
            ->where('user_id', '!=', $userIdSession)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // Tambahkan nama user dari API untuk setiap komentar
        $data = $komentars->map(function ($komentar) use ($userIdSession) {
            $userData = UserApi::getUserById($komentar->user_id);

            return [
                'id' => $komentar->id,
                'user_id' => $komentar->user_id,
                'is_me' => $komentar->user_id == $userIdSession,
                'name' => $userData['name'] ?? 'Unknown',
                'komentar' => $komentar->isi,
                'created_at' => $komentar->created_at->diffForHumans(),
            ];
        });

        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'laporan_id' => 'required|exists:laporan_kerja,id',
            'komentar' => 'required|string'
        ]);

        ChatLaporan::create([
            'laporan_id' => $request->laporan_id,
            'user_id' => session('user_id'),
            'isi' => $request->komentar,
            'is_read' => false,
        ]);

        // // Start Script baru hapus jika error
        // // Ambil laporan + teknisi
        // $laporan = LaporanKerja::with('teknisi')->find($request->laporan_id);

        // foreach ($laporan as $lap) {
        //     $lap->user = UserApi::getUserById($lap->user_id);
        //     $lap->support = getTeknisi($lap);
        //     $lap->supportHelper = getHelper($lap);
        // }

        // // Format pesan telegram
        // $message = "💬 *Komentar Baru*\n"
        //         . "Dari: *" . $laporan->user['name'] . "*\n"
        //         . "Laporan: #" . $laporan->id . "\n\n"
        //         . $request->komentar;

        // // List target core (pemilik laporan + teknisi + admin)
        // $targets = collect();

        // // 1. Pembuat laporan
        // if ($laporan->user_id !== session('user_id')) {
        //     $targets->push($laporan->user);
        // }

        // // 2. Teknisi yang ditag pada laporan
        // foreach ($laporan->teknisi as $teknisi) {
        //     $teknisiID = UserApi::getUserById($teknisi->teknisi_id);
        //     if ($teknisiID->id !== session('user_id')) {
        //         $targets->push($teknisiID);
        //     }
        // }

        // // 3. Admin
        // $admins = ApiResponse::get('/api/get-user-admin')->json();
        // foreach ($admins as $admin) {
        //     if ($admin->id !== session('user_id')) {
        //         $targets->push($admin);
        //     }
        // }

        // // ------------------------------------------
        // // 4. PROSES MENTION DENGAN @USERNAME
        // // ------------------------------------------
        // preg_match_all('/@([A-Za-z0-9_]+)/', $request->komentar, $matches);

        // if (!empty($matches[1])) {
        //     foreach ($matches[1] as $username) {
        //         $user = UserApi::getUserByName($username);
        //         if ($user && $user->id !== session('user_id')) {
        //             $targets->push($user);
        //         }
        //     }
        // }
        // dd($user);

        // // Hapus duplikat
        // $targets = $targets->unique('id');

        // // ------------------------------------------
        // // 5. KIRIM TELEGRAM KE SETIAP TARGET
        // // ------------------------------------------
        // foreach ($targets as $user) {
        //     if ($user->id_telegram) {
        //         sendMessage($message, $user->id_telegram);
        //     }
        // }
        // // End Script baru

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource.
     * Custom for count notification
     */
    public function show()
    {
        $userId = session('user_id');

        // Ambil jumlah komentar belum dibaca, dikelompokkan per laporan
        $counts = ChatLaporan::where('user_id', '!=', $userId)
            ->where('is_read', false)
            ->selectRaw('laporan_id, COUNT(*) as count')
            ->groupBy('laporan_id')
            ->pluck('count', 'laporan_id');

        return response()->json($counts); // hasilnya: { 5: 2, 9: 1, ... }
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
