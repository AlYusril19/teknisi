<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Pembayaran;
use App\Models\Penagihan;
use App\Models\UserApi;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pembayarans = Pembayaran::orderBy('tanggal_bayar', 'desc')->get();
        $customers = ApiResponse::get('/api/get-customer')->json();
        
        foreach ($pembayarans as $data) {
            $data->customerName = collect($customers)->firstWhere('id', $data->customer_id);
        }
        
        return view('admin.admin_pembayaran_index', compact(['pembayarans']));
    }

    public function indexShow(string $id)
    {
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($id);
        $tanggalTagihan = $penagihan->tanggal_tagihan;
        
        return view('mitra.mitra_penagihan_show', compact([
            'penagihan',
            'tanggalTagihan', 
            'id'
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
        $request->validate([
            'bank_id' => 'nullable',
            'penagihan_id' => 'required',
            'tanggal_bayar' => 'required|date',
            'jumlah_dibayar' => 'required|numeric',
            'bukti_bayar' => 'nullable'
        ]);
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($request->penagihan_id);
        $pembayaran = Pembayaran::where('penagihan_id', $request->penagihan_id)
            ->where('status', '<>', 'cancel')
            ->get();
        $tagihanBarang = $penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');
        $tagihanTeknisi = $penagihan->penjualan->sum('total_biaya');
        $totalTagihan = $tagihanBarang + $tagihanTeknisi;

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
            'status' => 'manual'
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
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($id);
        $tanggalTagihan = $penagihan->tanggal_tagihan;
        
        $data = [
            'penagihan' => $penagihan,
            'tanggalTagihan' => $tanggalTagihan
        ];

        return response()->json($data);
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
    public function update(Request $request, string $id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($pembayaran->penagihan_id);
        $tagihanBarang = $penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');
        $tagihanTeknisi = $penagihan->penjualan->sum('total_biaya');
        $totalTagihan = $tagihanBarang + $tagihanTeknisi;

        // jika ada angsuran tagihan dikurangi angsuran
        $pembayarans = Pembayaran::where('penagihan_id', $pembayaran->penagihan_id)
            ->where('status', '<>', 'cancel')
            ->get();
        if ($pembayarans->count() > 0) {
            $totalBayar = $pembayarans->sum('jumlah_dibayar');
        }
        // dd($totalBayar);

        if ($request->input('action') === 'cancel') {
            if ($totalBayar - $pembayaran->jumlah_dibayar == 0) {
                $status = 'baru';
            } else {
                $status = 'angsur';
            }
            $pembayaran->update([
                'status' => 'cancel',
                'tanggal_konfirmasi' => null
            ]);
            $penagihan->update([
                'status' => $status,
                'tanggal_lunas' => null
            ]);
            return redirect()->back()->with('success', 'Tagihan dibatalkan');
        }

        if ($totalTagihan > $totalBayar) { // angsuran
            $status = 'angsur';
        }else { // tagihan lunas
            $status = 'lunas';
        }

        if ($request->input('action') === 'accept') {
            $pembayaran->update([
                'tanggal_konfirmasi' => now(),
                'status' => 'transfer',
            ]);
            if ($status === 'lunas') {
                $penagihan->update(['tanggal_lunas' => now()]);
            }
            $penagihan->update(['status' => $status]);
            return redirect()->back()->with('success', 'Tagihan di setujui');
        }
        return redirect()->back()->with('error', 'request failure');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pembayaran = Pembayaran::with('penagihan.laporan_kerja.tagihan', 'penagihan.penjualan')->findOrFail($id);
        
        $tagihanBarang = $pembayaran->penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');
        $tagihanTeknisi = $pembayaran->penagihan->penjualan->sum('total_biaya');

        $totalBayar = Pembayaran::where('penagihan_id', $pembayaran->penagihan_id)
            ->whereNotNull('tanggal_konfirmasi')
            ->sum('jumlah_dibayar');
        $totalTagihan = $tagihanBarang + $tagihanTeknisi;

        if ($pembayaran->status === 'lunas' || $totalTagihan == $totalBayar) {
            if (session('user_role') != 'superadmin') {
                return redirect()->back()->with('error', 'Tagihan lunas dan Anda tidak diizinkan');
            }
            Pembayaran::where('penagihan_id', $pembayaran->penagihan_id)
                ->update(['status' => 'angsur']);
        }

        // update status dan tanggal_lunas penagihan
        if ($totalBayar - $pembayaran->jumlah_dibayar === 0) {
            $status = 'baru';
        }else {
            $status = 'angsur';
        }

        $pembayaran->penagihan->update([  
            'status' => $status,  
            'tanggal_lunas' => null  
        ]);

        $pembayaran->delete();
        return redirect()->back()->with('success', 'Data Pembayaran dihapus');
    }
}
