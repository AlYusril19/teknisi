<?php

use App\Http\Controllers\AdminBerandaController;
use App\Http\Controllers\LaporanKerjaAdminController;
use App\Http\Controllers\LaporanKerjaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TeknisiBerandaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/login', [LoginController::class, 'loginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// Protected route for technicians
// role didaftarkan di kernel dan middleware
Route::middleware(['auth.api', 'role:staff'])->group(function () {
    Route::resource('/teknisi', TeknisiBerandaController::class);
    Route::resource('/laporan', LaporanKerjaController::class);
});

Route::middleware(['auth.api', 'role:admin'])->group(function () {
    Route::resource('/admin', AdminBerandaController::class);
    Route::resource('/laporan-admin', LaporanKerjaAdminController::class);
});

// Default route
Route::get('/', function () {
    return redirect()->route('login');
})->name('home');