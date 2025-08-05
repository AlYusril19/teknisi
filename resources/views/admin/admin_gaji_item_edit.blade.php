@extends('layouts.app_sneat_admin')

@section('content')
<div class="row justify-content-center">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Edit Item Gaji</h5>
                <small class="text-muted float-end">Form Edit Item Gaji</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('item-gaji.update', $itemgaji->id ?? '-') }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    {{-- Nama Item --}}
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="nama">Nama Item</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nama" name="nama" placeholder="nama item"
                                value="{{ old('nama', $itemgaji->nama ?? '') }}" required>
                        </div>
                    </div>

                    {{-- Jenis Item (tambah / potong) --}}
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jenis">Jenis</label>
                        <div class="col-sm-10">
                            <select name="jenis" id="jenis" class="form-select" required>
                                @foreach ($jenisList as $value => $label)
                                    <option value="{{ $value }}"
                                        {{ old('jenis', $itemgaji->jenis ?? '') == $value ? 'selected' : '' }}>
                                        {{ $label }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    {{-- Jumlah Nominal --}}
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jumlah">Nominal Gaji</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="jumlah" name="jumlah" placeholder="optional"
                                value="{{ old('jumlah', $itemgaji->jumlah ?? '') }}">
                        </div>
                    </div>

                    {{-- Checkbox Aktif --}}
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="aktif">Status</label>
                        <div class="col-sm-10">
                            <input type="hidden" name="aktif" value="0"> {{-- agar tetap kirim value jika unchecked --}}
                            <input class="form-check-input" type="checkbox" name="aktif" value="1" id="aktifCheckbox"
                                {{ old('aktif', $itemgaji->aktif ?? 1) ? 'checked' : '' }}>
                            <label class="form-check-label" for="aktifCheckbox">
                                Aktif
                            </label>
                        </div>
                    </div>

                    {{-- Tombol Aksi --}}
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