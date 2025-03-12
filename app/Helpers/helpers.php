<?php 
use App\Jobs\SendTelegramNotification;
use App\Models\Penagihan;
use App\Models\UserApi;
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

class BarangHelper  
{  
    public static function getBarangKeluarView($penjualan)  
    {  
        $barangKeluarView = [];  
        if (isset($penjualan['penjualan_barang'])) {  
            foreach ($penjualan['penjualan_barang'] as $barang) {  
                $barangDetail = $barang['barang'];  
                if ($barangDetail) {  
                    $barangKeluarView[] = [  
                        'id' => $barangDetail['id'],  
                        'jumlah' => $barang['jumlah'],  
                        'nama' => $barangDetail['nama_barang'],  
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '',  
                        'harga_jual' => $barang['harga_jual'] * $barang['jumlah'],  
                    ];  
                }  
            }  
        }  
        return $barangKeluarView;  
    }  

    public static function getBarangKembaliView($pembelian)  
    {  
        $barangKembaliView = [];  
        if (isset($pembelian['pembelian_barang'])) {  
            foreach ($pembelian['pembelian_barang'] as $barang) {  
                $barangDetail = $barang['barang'];  
                if ($barangDetail) {  
                    $barangKembaliView[] = [  
                        'id' => $barangDetail['id'],  
                        'jumlah' => $barang['jumlah'],  
                        'nama' => $barangDetail['nama_barang'],  
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '',  
                    ];  
                }  
            }  
        }  
        return $barangKembaliView;  
    }

    public static function processBarang($barangList)  
    {  
        $result = [];  
        // Ambil data barang dari web lama via API
        $barangs = ApiResponse::get('/api/get-barang')->json();
        if ($barangList) {
            foreach ($barangList as $barang) {  
                // Cari data barang berdasarkan ID di array $barangs  
                $barangDetail = collect($barangs)->firstWhere('id', $barang['id']);  
    
                // Jika barang ditemukan, tambahkan ke array hasil dengan nama  
                if ($barangDetail) {  
                    $result[] = [  
                        'id' => $barang['id'],  
                        'jumlah' => $barang['jumlah'],  
                        'nama' => $barangDetail['nama_barang'], // Asumsikan nama barang ada di field 'nama_barang'  
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '', // Asumsikan kategori barang ada di field 'kategori'  
                    ];  
                }  
            }
        }
  
        return $result;  
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

function formatDuration($seconds) 
    {
        // Menghitung jam, menit, dan detik
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $remainingSeconds = $seconds % 60;

        // Mengformat hasil menjadi string dengan dua digit
        return sprintf('%02d:%02d', $hours, $minutes);
    }

function getCustomerId($userId) {
    // Ambil data customer dari API  
    $customers = ApiResponse::get('/api/get-customer')->json();  
  
    // Filter customer berdasarkan mitra_id yang sesuai dengan user_id yang sedang login  
    $filteredCustomers = collect($customers)->where('mitra_id', $userId);  
  
    // Ambil customer_id dari data customer yang sudah difilter  
    return $filteredCustomers->pluck('id'); // Ambil semua customer_id 
}

function getMitraId($custId) {
    // Ambil data customer dari API  
    $customers = ApiResponse::get('/api/get-customer')->json();  
  
    // Filter customer berdasarkan mitra_id yang sesuai dengan user_id yang sedang login  
    $filteredCustomers = collect($customers)->where('id', $custId);  
  
    // Ambil customer_id dari data customer yang sudah difilter  
    return $filteredCustomers->pluck('mitra_id'); // Ambil semua customer_id 
}

function getTeknisi($laporan) {
    return $laporan->teknisi->map(function ($teknisi) {  
        $teknisiData = UserApi::getUserById($teknisi->teknisi_id);  
        return [  
            'id' => $teknisiData['id'],  
            'name' => $teknisiData['name'],  
        ];  
    });  
}

function getInv($id){
    // invoice = SMU-cust-user-date-id
    $penagihan = Penagihan::findOrFail($id);
    $invoice = $penagihan->customer_id;
    $invoice .= $penagihan->user_id;
    $invoice .= Carbon::parse($penagihan->tanggal_tagihan)->format('ym');
    $invoice .= $penagihan->id;
    return $invoice;
}

function sendMessageAdmin($message){
    $chatId = ApiResponse::get('/api/get-user-admin')->json();
    foreach ($chatId as $chat) {
        SendTelegramNotification::dispatch('message', [
            'message' => $message,
            'chat_id' => $chat['id_telegram'],
        ]);
    }
}

function sendMessage($message, $chatId){
    SendTelegramNotification::dispatch('message', [
        'message' => $message,
        'chat_id' => $chatId,
    ]);
}

function sendPhoto($photoUrl, $chatId, $caption = null){
    SendTelegramNotification::dispatch('photo', [
        'file_path' => $photoUrl,
        'chat_id' => $chatId,
        'caption' => $caption,
    ]);
}

function sendPhotoAdmin($photoUrl, $caption = null){
    $chatId = ApiResponse::get('/api/get-user-admin')->json();
    foreach ($chatId as $chat) {
        SendTelegramNotification::dispatch('photo', [
            'file_path' => $photoUrl,
            'chat_id' => $chat['id_telegram'],
            'caption' => $caption,
        ]);
    }
}
