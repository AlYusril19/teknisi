<?php

namespace App\Http\Controllers;

use App\Models\ItemGaji;
use Illuminate\Http\Request;

class ItemGajiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $itemgaji = ItemGaji::orderByDesc('aktif')->get();
        return view('admin.admin_gaji_item_index', compact([
            'itemgaji'
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.admin_gaji_item_create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->toArray());
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:tambah,potong',
            'jumlah' => 'nullable|numeric|min:0',
            'aktif' => 'required|boolean',
        ]);
        ItemGaji::create($request->all());
        return redirect()->route('item-gaji.index')->with('success', 'item gaji berhasil ditambahkan');
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
        $itemgaji = ItemGaji::findOrFail($id);
        $jenisList = ['tambah' => 'Tambah', 'potong' => 'Potong'];
        return view('admin.admin_gaji_item_edit', compact([
            'itemgaji',
            'jenisList',
        ]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $itemGaji = ItemGaji::findOrFail($id);
        $request->validate([
            'nama' => 'required|string|max:255',
            'jenis' => 'required|in:tambah,potong',
            'jumlah' => 'nullable|numeric|min:0',
            'aktif' => 'required|boolean',
        ]);
        $itemGaji->update($request->all());
        return redirect()->route('item-gaji.index')->with('success', 'item gaji berhasil diedit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $itemGaji = ItemGaji::with('detailGaji', 'defaultDetails')->findOrFail($id);
        if ($itemGaji->detailGaji->isNotEmpty() || $itemGaji->defaultDetails->isNotEmpty()) {
            return redirect()->back()->with('error', 'item gaji gagal dihapus karena memiliki relasi di gaji staff');
        }
        $itemGaji->delete();
        return redirect()->back()->with('success', 'item gaji berhasil dihapus');
    }
}
