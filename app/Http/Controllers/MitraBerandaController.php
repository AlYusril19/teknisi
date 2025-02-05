<?php

namespace App\Http\Controllers;

use App\Models\Penagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MitraBerandaController extends Controller
{
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
    public function create()
    {
        // Tampilkan form edit profile dengan data nama user dari session
        $userName = session('user_name');
        $userEmail = session('user_email');
        return view('mitra.edit_profile', [
            'userName' => $userName,
            'userEmail' => $userEmail
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input form
        $request->validate([
            'name' => 'required|in:' . $request->name,
            'email' => 'required',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // Ambil token dari session
        $token = session('api_token');

        // Siapkan data untuk dikirim ke API
        $data = [
            'name' => $request->name,
            'email' => $request->email
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
