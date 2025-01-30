<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Pembayaran;
use App\Models\Penagihan;
use App\Models\Penjualan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PenagihanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = ApiResponse::get('/api/get-customer')->json();
        return view('admin.admin_penagihan_index', compact('customers'));
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
        $userId = session('user_id');
        $now = Carbon::now();
        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang
        
        $request->validate([
            'customer_id' => 'required',
            'tanggal_tagihan' => 'required|date',
            'tanggal_jatuh_tempo' => 'nullable|date',
            'tanggal_lunas' => 'nullable|date',
            'diskon' => 'nullable',
            'keterangan' => 'nullable'
        ]);
        $customerId = $request->customer_id;

        $tagihan = LaporanKerja::with('tagihan')
            ->whereMonth('tanggal_kegiatan', $bulanDipilih)
            ->whereYear('tanggal_kegiatan', $tahunDipilih)
            ->where('status', 'selesai')
            ->where('customer_id', $request->customer_id)
            ->whereNull('penagihan_id');
        $diskon = $tagihan->sum('diskon') / $tagihan->count();

        $tagihansBarang = ApiResponse::get('/api/get-penjualan-mitra/'. $customerId . '?bulan='. $bulanDipilih .'&tahun=' . $tahunDipilih)->json();

        if ($tagihan->count() > null || $tagihansBarang > null) {
            $Datapenagihan = [
                'customer_id' => $customerId,
                'user_id' => $userId,
                'tanggal_tagihan' => $request->tanggal_tagihan,
                'status' => 'baru',
                'diskon' => $diskon,
                'keterangan' => $request->keterangan
            ];
            $penagihan = Penagihan::create($Datapenagihan);

            if($tagihan->count() > null) {
                $tagihan->update(['penagihan_id' => $penagihan->id]);
            }
            if($tagihansBarang != null) {
                // Iterasi data dan simpan ke database lokal
                foreach ($tagihansBarang as $penjualan) {
                    $penjualanId = $penjualan['id'];
                    $totalBiaya = $penjualan['total_harga'];
                    $tanggalPenjualan = $penjualan['tanggal_penjualan'];

                    // Cek apakah penjualan_id sudah ada di database
                    $existingRecord = Penjualan::where('penjualan_id', $penjualanId)->first();
                    if (!$existingRecord) {
                        // Simpan ke database
                        Penjualan::create([
                            'penjualan_id' => $penjualanId,
                            'penagihan_id' => $penagihan->id,
                            'total_biaya' => $totalBiaya,
                            'tanggal_penjualan' => $tanggalPenjualan,
                        ]);
                    }
                }
            }

            return redirect()->route('penagihan-admin.show', $request->customer_id)->with('success', 'Tagihan Berhasil di Generate');
        }
        return redirect()->route('penagihan-admin.show', $request->customer_id)->with('error', 'Tidak ada data tagihan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $now = Carbon::now();
        $customers = ApiResponse::get('/api/get-customer')->json();

        $customerId = collect($customers)->firstWhere('id', $id);
            if ($customerId) {
                $customer = $customerId;
            }
        
        // Jika ada filter bulan dan tahun dari request, gunakan itu
        $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang
        
        // Tagihan untuk periode sekarang
        $tagihans = LaporanKerja::with('tagihan')
            ->whereMonth('tanggal_kegiatan', $bulanDipilih)
            ->whereYear('tanggal_kegiatan', $tahunDipilih)
            ->where('status', 'selesai')
            ->where('customer_id', $id)
            ->whereNull('penagihan_id')
            ->get();
        
        $penjualans = ApiResponse::get('/api/get-penjualan-mitra/'. $id . '?bulan='. $bulanDipilih .'&tahun=' . $tahunDipilih)->json();
        $tagihansBarang = [];
        foreach ($penjualans as $penjualan) {
            $penjualanId = $penjualan['id'];
            $existingRecord = Penjualan::where('penjualan_id', $penjualanId)->first();
            if (!$existingRecord) {
                $tagihansBarang[] = ApiResponse::get('/api/get-penjualan-by-id/' . $penjualanId)->json();
            }
        }

        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'pembayaran', 'penjualan')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $id);

        $penagihanTahunan = $penagihan->get();
        
        $penagihans = $penagihan->whereMonth('tanggal_tagihan', $bulanDipilih)->get();

        $listPenagihan = $penagihan->whereMonth('tanggal_tagihan', $bulanDipilih)
            ->where('status', '!=', 'lunas')
            ->orderBy('tanggal_tagihan', 'desc')->get();

        $pembayaranTahunan = Pembayaran::whereYear('tanggal_bayar', $tahunDipilih)
            ->where('customer_id', $id)
            ->get();
        $pembayaran = Pembayaran::whereYear('tanggal_bayar', $tahunDipilih)
            ->whereMonth('tanggal_bayar', $bulanDipilih)
            ->where('customer_id', $id)
            ->get();

        return view('admin.admin_penagihan_show', compact([
            'customer',
            'tagihans',
            'tagihansBarang',
            'penagihans',
            'penagihanTahunan',
            'tahunDipilih',
            'bulanDipilih',
            'listPenagihan',
            'pembayaranTahunan',
            'pembayaran'
        ]));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penagihan $penagihan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Penagihan $penagihan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penagihans = Penagihan::with('laporan_kerja', 'pembayaran', 'penjualan')
            ->findOrFail($id);
        if ($penagihans->pembayaran->isNotEmpty()) {
            return redirect()->back()->with('error', 'Tagihan sudah dibayar');
        }
        // ubah status penagihan_id di laporan Kerja
        foreach ($penagihans->laporan_kerja as $laporanKerja) {
            $laporanKerja->penagihan_id = null;
            $laporanKerja->save();
        }
        $penagihans->delete();
        return redirect()->back()->with('success', 'Data Penagihan berhasil dihapus');
    }
}
