<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Penagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MitraBerandaController extends Controller
{
    private $routePrefix = 'mitra';
    private $layout = 'layouts.app_sneat_mitra';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userName = session('user_name'); // Ambil nama user dari session
        $userRole = session('user_role'); // Ambil role user dari session
        $userId = session('user_id'); // Ambil role user dari session

        $customerId = getCustomerId($userId)->first();

        $penagihan = Penagihan::where('customer_id', $customerId)
            ->where('status', 'baru')
            ->orWhere('status', 'angsur')
            ->get();
        
        return view('mitra.dashboard',[
            'userName' => $userName, 
            'userRole' => $userRole,
            'penagihan' => $penagihan,
        ]);
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
