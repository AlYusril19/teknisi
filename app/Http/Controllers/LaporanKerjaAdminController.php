<?php

namespace App\Http\Controllers;

use App\Models\LaporanKerja;
use Illuminate\Http\Request;

class LaporanKerjaAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil laporan dengan status 'draft' dan urutkan berdasarkan tanggal terlama
        $drafts = LaporanKerja::where('status', 'draft')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        // Ambil laporan dengan status 'selesai' dan urutkan berdasarkan tanggal terbaru
        $pending = LaporanKerja::where('status', 'pending')
            ->orderBy('tanggal_kegiatan', 'asc')
            ->get();

        $selesai = LaporanKerja::where('status', 'selesai')
            ->orderBy('tanggal_kegiatan', 'desc')
            ->get();

        // Gabungkan kedua koleksi
        $laporan = $drafts->concat($pending)->concat($selesai);
        // $page = request()->get('page', 1);
        // $perPage = 10;
        // $laporan = new \Illuminate\Pagination\LengthAwarePaginator(
        //     $laporan->forPage($page, $perPage),
        //     $laporan->count(),
        //     $perPage,
        //     $page,
        //     ['path' => request()->url(), 'query' => request()->query()]
        // );
        return view('admin.admin_laporan_kerja_index', [
            'laporan' => $laporan
        ]);
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
