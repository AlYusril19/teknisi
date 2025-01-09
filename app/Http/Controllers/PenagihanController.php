<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Pembayaran;
use App\Models\Penagihan;
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

        $tagihan = LaporanKerja::with('tagihan')
            ->whereMonth('tanggal_kegiatan', $bulanDipilih)
            ->whereYear('tanggal_kegiatan', $tahunDipilih)
            ->where('status', 'selesai')
            ->where('customer_id', $request->customer_id)
            ->whereNull('penagihan_id');

        if ($tagihan->count() > null) {
            $Datapenagihan = [
                'customer_id' => $request->customer_id,
                'user_id' => $userId,
                'tanggal_tagihan' => $request->tanggal_tagihan,
                'status' => 'baru',
                'keterangan' => $request->keterangan
            ];
            
            $penagihan = Penagihan::create($Datapenagihan);
            $tagihan->update(['penagihan_id' => $penagihan->id]);

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

        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'pembayaran')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $id);

        $penagihanTahunan = $penagihan->get();
        
        $penagihans = $penagihan->whereMonth('tanggal_tagihan', $bulanDipilih)->get();

        $listPenagihan = $penagihan->whereMonth('tanggal_tagihan', $bulanDipilih)
            ->where('status', '!=', 'lunas')
            ->orderBy('tanggal_tagihan', 'desc')->get();
        // dd($listTagihan->toArray());

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
        $penagihans = Penagihan::with('laporan_kerja', 'pembayaran')
            ->findOrFail($id);
        if ($penagihans->pembayaran->isNotEmpty()) {
            return redirect()->back()->with('error', 'Tagihan sudah dibayar');
        }
        foreach ($penagihans->laporan_kerja as $laporanKerja) {
            $laporanKerja->penagihan_id = null;
            $laporanKerja->save();
        }
        $penagihans->delete();
        return redirect()->back()->with('success', 'Data Penagihan berhasil dihapus');
    }
}
