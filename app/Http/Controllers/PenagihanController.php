<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\Pembayaran;
use App\Models\Penagihan;
use App\Models\Penjualan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class PenagihanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua customer dari API
        $customersData = ApiResponse::get('/api/get-customer')->json();

        // Pastikan data adalah array
        if (!is_array($customersData)) {
            $customersData = [];
        }

        // Gunakan collect untuk memudahkan pengolahan
        $customers = collect($customersData);

        // Ubah setiap customer agar memiliki tagihan terkait
        $customers = $customers->map(function ($customer) {
            $tagihans = Penagihan::with('laporan_kerja.tagihan', 'pembayaran', 'penjualan')
                ->where('customer_id', $customer['id'])
                ->where('status', '<>', 'lunas')
                ->get(); // ->get() untuk eksekusi query
            $sisaTagihan = 0;
            foreach ($tagihans as $data) {
                $totalTagihan = $data->laporan_kerja?->flatMap->tagihan->sum('total_biaya') + $data->penjualan->sum('total_biaya');
                $totalPembayaran = $data->pembayaran?->filter(function ($pembayaran) {
                    return $pembayaran->status !== 'cancel'; // Ganti 'cancel' dengan nilai status yang sesuai
                })->sum('jumlah_dibayar');
                $sisaTagihan += $totalTagihan - $totalPembayaran;
            }
            $customer['tagihan'] = $tagihans;
            $customer['total_tagihan'] = $sisaTagihan;

            return $customer;
        });

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
        
        $tagihanCount = $tagihan->count();
        if ($tagihanCount > 0) {
            $diskon = $tagihan->sum('diskon') / $tagihanCount;
        } else {
            $diskon = 0;
        }

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
        };

        $penagihanTahunan = Penagihan::with('laporan_kerja.tagihan', 'pembayaran', 'penjualan')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $id)->get();

        $penagihans = Penagihan::with('laporan_kerja.tagihan', 'pembayaran', 'penjualan')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $id)->whereMonth('tanggal_tagihan', $bulanDipilih)->get();

        $listPenagihan = Penagihan::with('laporan_kerja.tagihan', 'pembayaran', 'penjualan')
            ->whereYear('tanggal_tagihan', $tahunDipilih)
            ->where('customer_id', $id)->where('status', '!=', 'lunas')
            ->orderBy('tanggal_tagihan', 'desc')
            ->get();
        foreach ($listPenagihan as $data) {
            $data->totalTagihan = $data->laporan_kerja?->flatMap->tagihan->sum('total_biaya') + $data->penjualan->sum('total_biaya');
            $data->totalPembayaran = $data->pembayaran?->filter(function ($pembayaran) {
                return $pembayaran->status !== 'cancel'; // Ganti 'cancel' dengan nilai status yang sesuai
            })->sum('jumlah_dibayar');
        }

        $pembayaranTahunan = Pembayaran::whereYear('tanggal_bayar', $tahunDipilih)
            ->where('customer_id', $id)
            ->where('status', '<>', 'cancel')
            ->get();
            
        $pembayaran = Pembayaran::whereYear('tanggal_bayar', $tahunDipilih)
            ->whereMonth('tanggal_bayar', $bulanDipilih)
            ->where('customer_id', $id)
            ->where('status', '<>', 'cancel')
            ->orderByRaw("CASE WHEN status = 'pending' THEN 0 ELSE 1 END")
            ->orderBy('tanggal_bayar', 'desc')
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
        $validate = $penagihans->pembayaran?->filter(function ($pembayaran) {
            return $pembayaran->status !== 'cancel'; // Ganti 'cancel' dengan nilai status yang sesuai
        });
        
        if ($validate->isNotEmpty()) {
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
