<?php

use App\Http\Controllers\AdminBerandaController;
use App\Http\Controllers\BiayaController;
use App\Http\Controllers\LaporanKerjaAdminController;
use App\Http\Controllers\LaporanKerjaController;
use App\Http\Controllers\LaporanKerjaMitraController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MitraBerandaController;
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

Route::get('/', [LoginController::class, 'loginForm'])->name('index');
Route::get('/login', [LoginController::class, 'loginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

// role didaftarkan di kernel dan middleware

Route::middleware(['auth.api', 'role:mitra'])->group(function () {
    Route::resource('/mitra', MitraBerandaController::class);
    Route::resource('/laporan-mitra', LaporanKerjaMitraController::class);
});

Route::middleware(['auth.api', 'role:staff'])->group(function () {
    Route::resource('/teknisi', TeknisiBerandaController::class);
    Route::resource('/laporan', LaporanKerjaController::class);
    Route::delete('/delete-image/{id}', [LaporanKerjaController::class, 'deleteImage'])->name('delete-image');
});

Route::middleware(['auth.api', 'role:admin,superadmin'])->group(function () {
    Route::resource('/admin', AdminBerandaController::class);
    Route::resource('/laporan-admin', LaporanKerjaAdminController::class);
    Route::resource('/biaya-admin', BiayaController::class);
});

// Default route
// Route::get('/', function () {
//     return redirect()->route('login');
// })->name('home');