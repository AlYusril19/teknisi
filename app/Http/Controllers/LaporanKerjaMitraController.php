<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\LaporanKerja;
use App\Models\UserApi;
use Illuminate\Http\Request;

class LaporanKerjaMitraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ambil user_id dari session
        $userId = session('user_id');

        // Ambil data customer dari API
        $customers = ApiResponse::get('/api/get-customer')->json();

        // Filter customer berdasarkan mitra_id yang sesuai dengan user_id yang sedang login
        $filteredCustomers = collect($customers)->where('mitra_id', $userId);

        // Ambil customer_id dari data customer yang sudah difilter
        $customerIds = $filteredCustomers->pluck('id'); // Ambil semua customer_id

        // Inisialisasi query
        $laporanQuery = LaporanKerja::query()
            ->where('status', 'selesai')
            ->whereIn('customer_id', $customerIds);
        // Cek apakah filter lembur dipilih
        if ($request->filter === 'lembur') {
            $laporanQuery->where(function($query) {
                $query->where('jam_selesai', '>', '17:00:00')
                    ->orWhere('jam_selesai', '<', '03:00:00');
            });
        }

        // Cek apakah ada pencarian berdasarkan nama barang atau laporan
        if ($request->search) {
            $laporanQuery->where(function ($query) use ($request) {
                $query->Where('keterangan_kegiatan', 'like', '%' . $request->search . '%');
            });
        }

        // Cek apakah ada pencarian berdasarkan nama barang atau laporan
        if ($request->transaksi) {
            $laporanQuery->where(function ($query) use ($request) {
                $query->Where('penagihan_id', $request->transaksi);
            });
        }

        // Ambil data laporan yang sudah difilter
        $laporan = $laporanQuery->orderBy('tanggal_kegiatan', 'desc')->get();

        // Mengambil data user teknisi dan tag teknisi
        foreach ($laporan as $lap) {
            $lap->user = UserApi::getUserById($lap->user_id);
            $lap->support = $lap->teknisi->map(function ($teknisi) {
                $teknisi = UserApi::getUserById($teknisi->teknisi_id);
                return [
                    'name' => $teknisi['name'],
                ];
            });
        }

        // Tampilkan ke view
        return view('mitra.mitra_laporan_kerja_index', [
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
        // Ambil laporan berdasarkan ID
        $laporan = LaporanKerja::findOrFail($id);
        $laporan->user = UserApi::getUserById($laporan->user_id);

        $penjualan = ApiResponse::get('/api/get-penjualan/' . $id)->json();

        // Inisialisasi array untuk barang yang ditampilkan
        $barangKeluarView = [];
        if (isset($penjualan['penjualan_barang'])) {
            foreach ($penjualan['penjualan_barang'] as $barang) {
                $barangDetail = $barang['barang']; // Detail barang dari API get-penjualan
                if ($barangDetail) {
                    $barangKeluarView[] = [
                        'id' => $barangDetail['id'],
                        'jumlah' => $barang['jumlah'],
                        'nama' => $barangDetail['nama_barang'],
                        'satuan' => $barangDetail['kategori']['satuan'] ?? '',
                        'harga_jual' => $barang['harga_jual'] * $barang['jumlah'], // Total harga
                    ];
                }
            }
        }

        // Ambil galeri foto
        $galeri = $laporan->galeri; // Ambil galeri terkait
        $tagihan = $laporan->tagihan; // Ambil tagihan

        // Return sebagai JSON
        return response()->json([
            'laporan' => $laporan,
            'barangKeluarView' => $barangKeluarView,
            'galeri' => $galeri,
            'tagihan' => $tagihan
        ]);
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
