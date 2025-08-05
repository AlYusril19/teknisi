<?php

namespace App\Http\Controllers;

use ApiResponse;
use App\Models\GajiDetailDefault;
use App\Models\ItemGaji;
use Hamcrest\Type\IsString;
use Illuminate\Http\Request;

class GajiDetailDefaultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Gaji By Staff
        $userId = session('user_id');
        $teknisi = ApiResponse::get('/api/get-teknisi/'.$userId)->json();
        $helper = ApiResponse::get('/api/get-helper/'.$userId)->json();
        $listStaff = array_merge($teknisi, $helper);
        foreach ($listStaff as &$staff) {
            $gaji = GajiDetailDefault::with('itemGaji')
                ->where('teknisi_id', $staff['id'])
                ->where('aktif', 1)->get();
            $gajiPlus = $gaji->where('jenis', 'tambah')->sum('jumlah');
            $gajiMinus = $gaji->where('jenis', 'potong')->sum('jumlah');
            $staff['gaji'] = $gajiPlus - $gajiMinus;
            if ($staff['gaji'] > 0) {
                $staff['status'] = 'custom';
                $staff['class'] = 'badge bg-primary rounded-pill';
            } else {
                $staff['status'] = 'default';
                $gaji = GajiDetailDefault::with('itemGaji')
                    ->where('role', $staff['role'])
                    ->where('aktif', 1)->get();
                $gajiPlus = $gaji->where('jenis', 'tambah')->sum('jumlah');
                $gajiMinus = $gaji->where('jenis', 'potong')->sum('jumlah');
                $staff['gaji'] = $gajiPlus - $gajiMinus;
            }
        }

        // Gaji By Role
        $userRoles = [
            'staff' => ['gaji' => 0],
            'magang' => ['gaji' => 0]
        ];

        foreach ($userRoles as $role => &$data) {
            $gaji = GajiDetailDefault::with('itemGaji')
                            ->where('role', $role)
                            ->where('aktif', 1)
                            ->get();
            $gajiPlus = $gaji->where('jenis', 'tambah')->sum('jumlah');
            $gajiMinus = $gaji->where('jenis', 'potong')->sum('jumlah');
            $data['gaji'] = $gajiPlus - $gajiMinus;
        };

        return view('admin.admin_gaji_default_index', compact([
            'listStaff',
            'userRoles'
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Add Gaji Default Role
        $userRoles = [
            'staff',
            'magang',
        ];

        $itemGaji = ItemGaji::where('aktif', 1)->get();
        return view('admin.admin_gaji_default_create', compact([
            'userRoles',
            'itemGaji',
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->role) {
            $this->validateRequestRole($request);
            // Cek apakah kombinasi user_id + item_gaji_id sudah ada
            $existing = GajiDetailDefault::where('role', $request->role)
                ->where('item_gaji_id', $request->item_gaji_id)
                ->first();

            if ($existing) {
                return back()->with('error', 'Item gaji ini sudah ditambahkan untuk role tersebut.');
            }
        }elseif ($request->teknisi_id) {
            $this->validateRequestStaff($request);
            // Cek apakah kombinasi user_id + item_gaji_id sudah ada
            $existing = GajiDetailDefault::where('teknisi_id', $request->teknisi_id)
                ->where('item_gaji_id', $request->item_gaji_id)
                ->first();

            if ($existing) {
                return back()->with('error', 'Item gaji ini sudah ditambahkan untuk teknisi tersebut.');
            }
        }else {
            return back()->with('error', 'Terjadi kesalahan');
        }
        

        GajiDetailDefault::create($request->all());
        return redirect()->back()->with('success', 'gaji default berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!is_numeric($id)) {
            return $this->showRole($id);
        }
        $staff = ApiResponse::get('/api/get-user/'.$id)->json();
        $itemGajiStaff = GajiDetailDefault::with('itemGaji')
                            ->where('teknisi_id', $id)
                            ->orderByRaw("CASE WHEN jenis = 'tambah' THEN 0 ELSE 1 END")
                            ->orderByDesc('jumlah')
                            ->get();

        $gajiPlus = $itemGajiStaff->where('jenis', 'tambah')->where('aktif', 1)->sum('jumlah');
        $gajiMinus = $itemGajiStaff->where('jenis', 'potong')->where('aktif', 1)->sum('jumlah');
        $jumlahGaji = ($gajiPlus ?? 0) - ($gajiMinus ?? 0);

        $existingItemIds = GajiDetailDefault::where('teknisi_id', $id)->pluck('item_gaji_id');
        $listItemGaji = ItemGaji::whereNotIn('id', $existingItemIds)->where('aktif', 1)->get();

        return view('admin.admin_gaji_default_show', compact([
            'staff',
            'itemGajiStaff',
            'listItemGaji',
            'jumlahGaji'
        ]));
    }
    private function showRole($role) {
        $itemGajiRole = GajiDetailDefault::with('itemGaji')
                            ->where('role', $role)
                            ->orderByRaw("CASE WHEN jenis = 'tambah' THEN 0 ELSE 1 END")
                            ->orderByDesc('jumlah')
                            ->get();
        $gajiPlus = $itemGajiRole->where('jenis', 'tambah')->where('aktif', 1)->sum('jumlah');
        $gajiMinus = $itemGajiRole->where('jenis', 'potong')->where('aktif', 1)->sum('jumlah');
        $jumlahGaji = ($gajiPlus ?? 0) - ($gajiMinus ?? 0);

        $existingItemIds = GajiDetailDefault::where('role', $role)->pluck('item_gaji_id');
        $listItemGaji = ItemGaji::whereNotIn('id', $existingItemIds)->where('aktif', 1)->get();

        return view('admin.admin_gaji_role_create', compact([
            'role',
            'itemGajiRole',
            'jumlahGaji',
            'listItemGaji',
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
        $itemGaji = GajiDetailDefault::findOrFail($id);
        $itemGaji->delete();
        return redirect()->back()->with('success', 'item gaji berhasil dihapus');
    }

    private function validateRequestRole($request) {
        $request->validate([
            'role' => 'required',
            'item_gaji_id' => 'required|exists:item_gaji,id',
            'jenis' => 'required|in:tambah,potong',
            'jumlah' => 'nullable|numeric|min:0',
            'aktif' => 'required|boolean',
        ]);
    }
    private function validateRequestStaff($request) {
        $request->validate([
            'teknisi_id' => 'required',
            'item_gaji_id' => 'required|exists:item_gaji,id',
            'jenis' => 'required|in:tambah,potong',
            'jumlah' => 'nullable|numeric|min:0',
            'aktif' => 'required|boolean',
        ]);
    }
}
