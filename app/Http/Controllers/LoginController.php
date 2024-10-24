<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LoginController extends Controller
{
    public function loginForm() {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        // Validasi input form
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Request ke API login web Laravel lama
        $urlApi = env('APP_URL_API');
        $response = Http::post($urlApi . '/api/login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);

        // Jika berhasil login
        if ($response->successful()) {
            $token = $response->json()['token'];
            $user = $response->json()['user']; // Ambil data user dari response

            // Simpan token dan data user di session
            session([
                'api_token' => $token,
                'user_id' => $user['id'],
                'user_name' => $user['name'],
                'user_role' => $user['role'],
            ]);

            // Redirect ke dashboard atau halaman lain
            if ($user['role'] === 'staff') {
                return redirect()->route('teknisi.index')->with('success', 'Login successful');
            }
            if ($user['role'] === 'admin' || $user['role'] === 'superadmin') {
                return redirect()->route('admin.index')->with('success', 'Login successful');
            }
        } else {
            // Jika login gagal
            return back()->withErrors(['message' => 'Login failed. Please check your credentials.']);
        }
    }


    public function logout()
    {
        // Hapus token API dari session saat logout
        session()->forget('api_token');
        return redirect('/login')->with('success', 'Logout berhasil.');
    }
}
