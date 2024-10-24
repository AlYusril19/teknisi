@extends('layouts.app_sneat_admin')

@section('content')
<div class="row justify-content-center">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Edit Biaya</h5>
                <small class="text-muted float-end">Form Edit Biaya</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('biaya-admin.update', $biaya->id) }}" enctype="multipart/form-data">
                    @method('PUT')
                    @csrf
                    <div class="row mb-3" id="customer_input">
                        <label class="col-sm-2 col-form-label" for="customer">Customer</label>
                        <div class="col-sm-10">
                            <select name="customer_id" id="customer_id" class="form-control">
                                <option value="">Pilih Customer</option>
                                @foreach($customers as $cust)
                                    <option value="{{ $cust['id'] }}" {{ $cust['id'] == $biaya->customer_id ? 'selected' : '' }}>{{ $cust['nama'] }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_kerja">Biaya Jam Kerja</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="jam_kerja" name="jam_kerja" placeholder="biaya jam kerja" value="{{ $biaya->jam_kerja }}" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_lembur">Biaya Jam Lembur</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="jam_lembur" name="jam_lembur" placeholder="biaya jam lembur" value="{{ $biaya->jam_lembur }}" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="kabel">Biaya Penarikan Fiber</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="kabel" name="kabel" placeholder="biaya penarikan fiber optik" value="{{ $biaya->kabel }}" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="transport">Biaya Transport</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="transport" name="transport" placeholder="biaya penarikan fiber optik" value="{{ $biaya->transport }}" required>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary me-2">Simpan</button>
                        <a href="{{ route('biaya-admin.index') }}" class="btn btn-outline-secondary">Batal</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection