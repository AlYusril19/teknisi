<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\Biaya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BiayaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $biayas = Biaya::all();
        $customers = ApiResponse::get('/api/get-customer')->json();
        $biayaDetail = [];

        foreach ($biayas as $biaya) {
            $customer = '';
            $customerId = collect($customers)->firstWhere('id', $biaya->customer_id);
            if ($customerId) {
                $customer = $customerId['nama'];
            }
            $biayaDetail[] = [
                'biaya' => $biaya,
                'customer' => $customer
            ];
        }
        return view('admin.admin_biaya_index', [
            'biayaDetail' => $biayaDetail
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $customers = ApiResponse::get('/api/get-customer')->json();
        return view('admin.admin_biaya_create', compact('customers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'nullable',
            'jam_kerja' => 'required',
            'jam_lembur' => 'required',
            'kabel' => 'nullable',
            'transport' => 'nullable',
            'jarak_tempuh' => 'nullable'
        ]);
        try {
            DB::beginTransaction();

            // Cek apakah sudah ada laporan dengan customer_id yang sama
            if ($request->customer_id) {
                $existingLaporan = Biaya::where('customer_id', $request->customer_id)
                    ->exists();
                if ($existingLaporan) {
                    return back()->withErrors(['customer_id' => 'Biaya customer ini sudah ada, silahkan lakukan pengeditan.']);
                }
            } else {
                $existingLaporan = Biaya::whereNull('customer_id')
                    ->exists();
                if ($existingLaporan) {
                    return back()->withErrors(['customer_id' => 'Biaya ini sudah ada, lakukan pengeditan.']);
                }
            }

            Biaya::create([
                'customer_id' => $request->customer_id,
                'jam_kerja' => $request->jam_kerja,
                'jam_lembur' => $request->jam_lembur,
                'kabel' => $request->kabel,
                'transport' => $request->transport,
                'jarak_tempuh' => $request->jarak_tempuh
            ]);
            DB::commit();
            return redirect()->route('biaya-admin.index')->with('success', 'Biaya berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
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
        $biaya = Biaya::findOrFail($id);
        $customers = ApiResponse::get('/api/get-customer')->json();
        return view('admin.admin_biaya_edit', [
            'biaya' => $biaya,
            'customers' => $customers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $biaya = Biaya::findOrFail($id);
        $request->validate([
            // 'customer_id' => 'nullable'.$id,
            'jam_kerja' => 'required',
            'jam_lembur' => 'required',
            'kabel' => 'nullable',
            'transport' => 'nullable',
            'jarak_tempuh' => 'nullable'
        ]);
        $customerId = $biaya->customer_id;
        // dd($customerId);

        try {
            DB::beginTransaction();

            // Cek apakah sudah ada laporan dengan customer_id yang sama
            if ($request->customer_id != null) {
                return back()->withErrors(['customer_id' => 'Silahkan edit biaya sesuai ketentuan.']);
            }

            $biaya->update([
                'customer_id' => $customerId,
                'jam_kerja' => $request->jam_kerja,
                'jam_lembur' => $request->jam_lembur,
                'kabel' => $request->kabel,
                'transport' => $request->transport,
                'jarak_tempuh' => $request->jarak_tempuh
            ]);
            DB::commit();
            return redirect()->route('biaya-admin.index')->with('success', 'Biaya berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $biaya = Biaya::findOrFail($id);

        $biaya->delete();

        return redirect()->route('biaya-admin.index')->with('success', 'Biaya berhasil dihapus');
    }
}
