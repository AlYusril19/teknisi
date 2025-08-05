<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use App\Models\Pembayaran;
use App\Models\Penagihan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PembayaranMitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $userName = session('user_name');
        $request->validate([
            'bank_id' => 'nullable',
            'penagihan_id' => 'required',
            'jumlah_dibayar' => 'required|numeric',
            'catatan'
        ]);

        if ($request->jumlah_dibayar <= 0) {
            return redirect()->back()->with('error', 'pembayaran tidak boleh <= 0');
        }

        // PR validasi customer_id
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($request->penagihan_id);
        $tagihanBarang = $penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');
        $tagihanTeknisi = $penagihan->penjualan->sum('total_biaya');
        $totalTagihan = $tagihanBarang + $tagihanTeknisi;

        // jika ada angsuran tagihan dikurangi angsuran
        $pembayaran = Pembayaran::where('penagihan_id', $request->penagihan_id)
            ->where('status', '<>', 'cancel')
            ->get();
        if ($pembayaran->count() > 0) {
            $totalTagihan -= $pembayaran->sum('jumlah_dibayar');
        }

        if ($request->jumlah_dibayar > $totalTagihan) { // pembayaran melebihi tagihan
            return redirect()->back()->with('error', 'pembayaran melebihi tagihan');
        }
        
        $path = $request->file('foto')->store('bukti_bayar', 'public');

        $pembayaran = [
            'penagihan_id' => $penagihan->id,
            'customer_id' => $penagihan->customer_id,
            'tanggal_bayar' => $request->tanggal_bayar,
            'jumlah_dibayar' => $request->jumlah_dibayar,
            'status' => 'pending',
            'bukti_bayar' => $path,
            'catatan' => $request->catatan
        ];
        Pembayaran::create($pembayaran);
        $message = "Mitra <b>" . $userName . "</b> Telah melakukan pembayaran dengan nominal: " . formatRupiah($request->jumlah_dibayar);
        sendMessageAdmin($message);
        $photoUrl = storage_path("app/public/{$path}");
        sendPhotoAdmin($photoUrl, "bukti bayar");
        return redirect()->back()->with('success', 'pembayaran berhasil, menunggu konfirmasi dari admin');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penagihan = Penagihan::with('laporan_kerja.tagihan', 'penjualan')->findOrFail($id);
        $tagihan = $penagihan->laporan_kerja->flatMap->tagihan->sum('total_biaya');
        $tagihanBarang = $penagihan->penjualan->sum('total_biaya');
        $totalTagihan = $tagihan + $tagihanBarang;

        $pembayaran = Pembayaran::where('penagihan_id', $id)
            ->where('status', '!=', 'cancel')
            ->get();
        $totalBayar = $pembayaran->sum('jumlah_dibayar');

        $listPembayaran = Pembayaran::where('penagihan_id', $id)->get();

        return view('mitra.mitra_form_pembayaran', compact([
            'id',
            'totalTagihan',
            'pembayaran',
            'totalBayar',
            'listPembayaran',
        ]));
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
        $userId = session('user_id');
        $userName = session('user_name');
        $customerId = getCustomerId($userId)->first();
        $pembayaran = Pembayaran::findOrFail($id);

        if ($pembayaran->customer_id != $customerId) {
            return redirect()->back()->with('error', 'Anda tidak diizinkan');
        }
        if ($pembayaran->tanggal_konfirmasi != null) {
            return redirect()->back()->with('error', 'pembayaran gagal dihapus (telah di konfirmasi)');
        }
        Storage::disk('public')->delete($pembayaran->bukti_bayar);
        $pembayaran->delete();
        $message = "Mitra " . $userName . " Membatalkan pembayaran";
        sendMessageAdmin($message);
        return redirect()->back()->with('success', 'pembayaran berhasil dihapus');
    }
}
