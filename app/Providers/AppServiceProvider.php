<?php

namespace App\Providers;

use ApiResponse;
use App\Models\Pembayaran;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // View::composer('layouts.app_sneat', function ($view) {
        view()->composer('*', function ($view) {
            $userId = session('user_id');
            $user = ApiResponse::get('/api/get-user/'.$userId)->json();
            $userName = session('user_name'); // Ambil nama user dari session
            $userRole = session('user_role'); // Ambil nama user dari session
            $userPhoto = $user['photo'] ?? null;
            $idTelegram = $user['id_telegram'] ?? null;
            // informasi pembayaran pending pelanggan
            $pembayaran = Pembayaran::where('status', 'pending')->count();
            $view->with([
                'userName' => $userName,
                'userRole' => $userRole,
                'userProfil' => $userPhoto,
                'idTele' => $idTelegram,
                'pembayaranCount' => $pembayaran
            ]);
        });
    }
}
