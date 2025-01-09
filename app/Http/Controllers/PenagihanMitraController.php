<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Penagihan;
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
            ->get();
        return view('mitra.mitra_penagihan_index', compact('penagihans', 'tahunDipilih'));
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
        $tanggalTagihan = Penagihan::findOrFail($id)->tanggal_tagihan;
        $tagihans = LaporanKerja::with('tagihan')->where('penagihan_id', $id)->get();
        // dd($tagihans->toArray());
        return view('mitra.mitra_penagihan_show', compact('tagihans', 'tanggalTagihan', 'id'));
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
