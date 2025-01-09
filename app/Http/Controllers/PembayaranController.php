<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Pembayaran;
use App\Models\Penagihan;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $customers = ApiResponse::get('/api/get-customer')->json();
        // return view('admin.admin_penagihan_index', compact('customers'));
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
        $request->validate([
            'bank_id' => 'nullable',
            'penagihan_id' => 'required',
            // 'customer_id' => 'required',
            'tanggal_bayar' => 'required|date',
            'jumlah_dibayar' => 'required|numeric',
            // 'status' => 'required',
            'bukti_bayar' => 'nullable'
        ]);
        $penagihan = Penagihan::with('laporan_kerja.tagihan')->findOrFail($request->penagihan_id);
        $pembayaran = Pembayaran::where('penagihan_id', $request->penagihan_id)->get();
        $totalTagihan = $penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');

        // jika ada angsuran tagihan dikurangi angsuran
        if ($pembayaran->count() > 0) {
            foreach ($pembayaran as $data) {
                $totalTagihan -= $data->jumlah_dibayar;
            }
        }

        if ($request->jumlah_dibayar > $totalTagihan) { // pembayaran melebihi tagihan
            return redirect()->back()->with('error', 'pembayaran melebihi tagihan');
        }elseif ($request->jumlah_dibayar < $totalTagihan) { // angsuran
            $status = 'angsur';
        }else { // tagihan lunas
            $status = 'lunas';
        }

        $pembayaran = [
            'penagihan_id' => $penagihan->id,
            'customer_id' => $penagihan->customer_id,
            'tanggal_bayar' => $request->tanggal_bayar,
            'tanggal_konfirmasi' => now(),
            'jumlah_dibayar' => $request->jumlah_dibayar,
            'status' => $status
        ];
        Pembayaran::create($pembayaran);
        if ($status === 'lunas') {
            $penagihan->update(['tanggal_lunas' => now()]);
        }
        $penagihan->update(['status' => $status]);

        return redirect()->back()->with('success', 'tagihan sukses dibayar');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        // $now = Carbon::now();
        // $customers = ApiResponse::get('/api/get-customer')->json();

        // $customerId = collect($customers)->firstWhere('id', $id);
        //     if ($customerId) {
        //         $customer = $customerId;
        //     }
        
        // // Jika ada filter bulan dan tahun dari request, gunakan itu
        // $bulanDipilih = $request->input('bulan', $now->month); // Default bulan sekarang
        // $tahunDipilih = $request->input('tahun', $now->year); // Default tahun sekarang
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (session('user_role') != 'superadmin') {
            return redirect()->back()->with('error', 'Anda tidak diizinkan');
        }
        $pembayaran = Pembayaran::with('penagihan')->findOrFail($id);
        
        // cek apakah pembayaran lebih dari 1 transaksi
        $statusPenagihan = Pembayaran::where('penagihan_id', $pembayaran->penagihan_id)
            ->count();

        // update status dan tanggal_lunas penagihan
        if ($statusPenagihan > 1) {
            $status = 'angsur';
        }else {
            $status = 'baru';
        }
        $pembayaran->penagihan->updated([
            'status' => $status,
            'tanggal_lunas' => null
        ]);

        $pembayaran->delete();
        return redirect()->back()->with('success', 'Data Pembayaran dihapus');
    }
}
