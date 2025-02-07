<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Penagihan;
use App\Models\Penjualan;
use App\Models\UserApi;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PenagihanMitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $now = Carbon::now();
        // Ambil user_id dari session
        $userId = session('user_id');

        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang

        // Ambil data customer dari API
        $customers = ApiResponse::get('/api/get-customer')->json();

        // Filter customer berdasarkan mitra_id yang sesuai dengan user_id yang sedang login
        $filteredCustomers = collect($customers)->where('mitra_id', $userId);

        // Ambil customer_id dari data customer yang sudah difilter
        $customerIds = $filteredCustomers->pluck('id'); // Ambil semua customer_id

        $penagihans = Penagihan::with('laporan_kerja.tagihan')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $customerIds)
            ->orderByRaw("FIELD(status, 'baru', 'angsur', 'lunas')")
            ->orderBy('tanggal_tagihan', 'desc')
            ->get();
        return view('mitra.mitra_penagihan_index', compact('penagihans', 'tahunDipilih'));
    }

    public function indexComingSoon(Request $request)
    {
        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $now = Carbon::now();
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang

        // Ambil user_id dari session
        $userId = session('user_id');
        $customerId = getCustomerId($userId)->first();

        $tagihan = LaporanKerja::with('tagihan')
            ->whereYear('tanggal_kegiatan', $tahunDipilih)
            ->where('customer_id', $customerId)
            ->where('status', 'selesai')
            ->whereNull('penagihan_id')
            ->get();
        // Mengambil data user teknisi dan tag teknisi
        foreach ($tagihan as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
            $lap->support = getTeknisi($lap);
        }

        $tagihansBarang = ApiResponse::get('/api/get-penjualan-mitra/'. $customerId . '?bulan='. $bulanDipilih .'&tahun=' . $tahunDipilih)->json();
        $tagihanBarang = [];
        foreach ($tagihansBarang as $tagihanBaru) {
            $existingRecord = Penjualan::where('penjualan_id', $tagihanBaru['id'])->first();
            if (!$existingRecord) {
                $tagihanBarang[] = $tagihanBaru;
            }
        }

        return view('mitra.mitra_penagihan_coming_soon_index', compact([
            // 'penagihans', 
            'tagihan',
            'tahunDipilih',
            'tagihanBarang',
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($id);
        $tanggalTagihan = $penagihan->tanggal_tagihan;
        
        return view('mitra.mitra_penagihan_show', compact([
            'penagihan',
            'tanggalTagihan', 
            'id'
        ]));
    }

    public function showBarang(Request $request)
    {
        $penjualans = Penjualan::where('penagihan_id', $request->penagihan_id)->get();
        $tagihanBarang = [];
        foreach ($penjualans as $penjualan) {
            $id = $penjualan->penjualan_id;
            $tagihanBarang[] = ApiResponse::get('/api/get-penjualan-by-id/' . $id)->json();
        }
        return view('mitra.mitra_penagihan_show_barang', compact('tagihanBarang'));
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
