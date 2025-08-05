@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    {{-- Biodata Staff --}}
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Data Staff</h5>
        </div>
        <div class="table-responsive me-3 ms-3">
            <table class="table table-sm table-bordered">
                <caption class="ms-4">
                    Data Staff
                </caption>
                <tbody>
                    <tr align="center">
                        <td rowspan="3" width="80">
                            <img src="https://skytama.com/corona/assets/images/profil/profil.png" alt="pelanggan" width="30" height="30">
                        </td>
                    </tr>
                    <tr>
                        <td width="120">No HP</td>
                        <td> {{ $staff['nohp'] ?? '-'}}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td> {{ $staff['name'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>

  {{-- Tabel Item Gaji --}}
  <div class="col-md-6 mt-2">
    {{-- Tabel Item Gaji Staff --}}
    <div class="card">
        <div class="card-header d-flex justifiy-content-between align-items-center">
            <h5 class="mb-0">Tabel Item Gaji</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm table-bordered table-secondary">
                    <caption class="ms-4">
                        Detail Item
                    </caption>
                    <thead>
                        <tr align="center">
                            <th>No</th>
                            <th>Nama item</th>
                            <th>Nominal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($itemGajiStaff as $data)
                            <tr>
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td align="center">{{ $data->itemGaji->nama ?? '' }}</td>
                                <td align="right">
                                    @if ($data->jenis === 'potong')
                                        -
                                    @endif
                                    {{ formatRupiah($data->jumlah) }}
                                </td>
                                <td align="center">
                                    <div class="d-flex align-items-center justify-content-center gap-2">
                                        <span>
                                            @if ($data->aktif === 1)
                                                aktif
                                            @else
                                                <span class="badge bg-danger rounded-pill">nonaktif</span>
                                            @endif
                                        </span>
                                        <form action="{{ route('gaji-default.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');" class="mb-0">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-link p-0"><i class="bx bx-trash"></i></button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                        <tr>
                            <td align="right" colspan="2">Jumlah</td>
                            <td align="right">{{ formatRupiah($jumlahGaji) }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>

  @if ($listItemGaji->isNotEmpty())
    {{-- Input Item Gaji Staff --}}
    <div class="col-md-6 mt-2">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Form Input Item Gaji</h5>
            </div>

            <div class="card-body">
                <div class="form-control mt-2">
                    <h5 class="mt-3">Form Item Gaji</h5>
                    <form method="POST" action="{{ route('gaji-default.store') }}" enctype="multipart/form-data">
                        @csrf
                        <input type="hidden" name="teknisi_id" value="{{ $staff['id'] }}">
                        <div class="row mb-3">
                            <label class="col-sm-2 col-form-label" for="item_gaji_id">Item Gaji</label>
                            <div class="col-sm-10">
                                <select name="item_gaji_id" id="item_gaji_id" class="form-control" onchange="updateFields()">
                                    @foreach ($listItemGaji as $gaji)
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  @endif

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