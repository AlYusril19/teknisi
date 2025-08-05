@extends('layouts.app_sneat_admin')

@section('content')
<div class="row justify-content-center">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Input Item Gaji</h5>
                <small class="text-muted float-end">Form Item Gaji</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('item-gaji.store') }}" enctype="multipart/form-data">
                    @csrf

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="nama">Nama Item</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nama" name="nama" placeholder="nama item" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jenis">Jenis</label>
                        <div class="col-sm-10">
                            <select name="jenis" id="jenis" class="form-control">
                                <option value="tambah">Tambah</option>
                                <option value="potong">Potong</option>
                                {{-- @foreach($allowedRoleUser as $role)
                                    <option value="{{ $role }}">{{ $role }}</option>
                                @endforeach --}}
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jumlah">Nominal Gaji</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="jumlah" name="jumlah" placeholder="optional">
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="aktif">Status</label>
                        <div class="col-sm-10">
                            <input type="hidden" name="aktif" value="0"> {{-- default saat unchecked --}}
                            <input class="form-check-input" type="checkbox" name="aktif" value="1" id="aktifCheckbox" checked>
                            {{-- <input class="form-check-input" type="checkbox" name="aktif" value="1" id="aktifCheckbox" {{ old('aktif', $item->aktif ?? true) ? 'checked' : '' }}> --}}
                            <label class="form-check-label" for="aktifCheckbox">
                                Aktif
                            </label>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary me-2">Simpan</button>
                        <a href="{{ url()->previous() }}" class="btn btn-outline-secondary">Batal</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection