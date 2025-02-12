<?php

namespace App\Providers;

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
            $userName = session('user_name'); // Ambil nama user dari session
            $userRole = session('user_role'); // Ambil nama user dari session
            // informasi pembayaran pending pelanggan
            $pembayaran = Pembayaran::where('status', 'pending')->count();
            $view->with([
                'userName' => $userName,
                'userRole' => $userRole,
                'pembayaranCount' => $pembayaran
            ]);
        });
    }
}
