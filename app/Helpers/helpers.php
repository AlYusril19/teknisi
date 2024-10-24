<?php 
use Carbon\Carbon;
// Daftarkan helper di composer.json
// dan jalankan menggunakan composer dump-autoload
// Helper function untuk mendapatkan data pengguna dari session
function getUserRole()
{
    return session('user_role');
}

class ApiResponse
{
    public static function get($endpoint, $token = null)
    {
        $urlApi = env('APP_URL_API');
        $token = $token ?? session('api_token');

        return Http::withToken($token)->get($urlApi . $endpoint);
    }
    public static function post($endpoint, $data = [], $token = null)
    {
        $urlApi = env('APP_URL_API');
        $token = $token ?? session('api_token');

        return Http::withToken($token)->post($urlApi . $endpoint, $data);
    }
    public static function delete($endpoint, $data = [], $token = null)
    {
        $urlApi = env('APP_URL_API');
        $token = $token ?? session('api_token');

        return Http::withToken($token)->delete($urlApi . $endpoint, $data);
    }
}

function formatTime($time)
    {
        return Carbon::parse($time)->format('H:i');
    }

function formatRupiah($amount)
    {
        return 'Rp ' . number_format($amount, 0, ',', '.');
    }