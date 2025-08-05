@extends('layouts.app_sneat_admin')

@section('content')
<div class="row justify-content-center">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Input Gaji Default Role</h5>
                <small class="text-muted float-end">Form Gaji Role</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('gaji-default.store') }}" enctype="multipart/form-data">
                    @csrf
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="role">Pilih Role</label>
                        <div class="col-sm-10">
                            <select name="role" id="role" class="form-control">
                                @foreach ($userRoles as $role)
                                    <option value="{{ $role }}">{{ $role }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="item_gaji_id">Item Gaji</label>
                        <div class="col-sm-10">
                            <select name="item_gaji_id" id="item_gaji_id" class="form-control" onchange="updateFields()">
                                @foreach ($itemGaji as $gaji)
                                    <option value="{{ $gaji->id }}" data-jumlah="{{ $gaji->jumlah }}" data-jenis="{{ $gaji->jenis }}">
                                        {{ $gaji->nama }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jumlah">Jumlah</label>
                        <div class="col-sm-10">
                            <input type="number" name="jumlah" id="jumlah" class="form-control" value="" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jenis">Jenis</label>
                        <div class="col-sm-10">
                            <input type="text" name="jenis" id="jenis" class="form-control" value="" readonly>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="aktif">Status</label>
                        <div class="col-sm-10">
                            <input type="hidden" name="aktif" value="0"> {{-- default saat unchecked --}}
                            <input class="form-check-input" type="checkbox" name="aktif" value="1" id="aktifCheckbox" checked>
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

@section('js')
{{-- ambil data jumlah gaji dari item gaji --}}
    <script>
        function updateFields() {
            // Ambil elemen select
            var selectElement = document.getElementById('item_gaji_id');
            
            // Ambil jumlah dan jenis dari data- atribut yang dipilih
            var jumlah = selectElement.options[selectElement.selectedIndex].getAttribute('data-jumlah');
            var jenis = selectElement.options[selectElement.selectedIndex].getAttribute('data-jenis');
            
            // Perbarui nilai input jumlah dan jenis
            document.getElementById('jumlah').value = jumlah;
            document.getElementById('jenis').value = jenis;
        }

        // Memanggil fungsi saat halaman dimuat pertama kali
        window.onload = updateFields;
    </script>
@endsection