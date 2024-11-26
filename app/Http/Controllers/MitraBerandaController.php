<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MitraBerandaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userName = session('user_name'); // Ambil nama user dari session
        $userRole = session('user_role'); // Ambil role user dari session
        return view('mitra.dashboard',[
            'userName' => $userName, 
            'userRole' => $userRole
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
        //
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
