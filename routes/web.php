<?php

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
Route::middleware('auth.api')->group(function () {
    Route::resource('/teknisi', TeknisiBerandaController::class);
});

// Default route
Route::get('/', function () {
    return redirect()->route('login');
})->name('home');