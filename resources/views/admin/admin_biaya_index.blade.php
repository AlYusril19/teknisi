@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Biaya Kegiatan</h5>
            <a href="{{ route('biaya-admin.create') }}" class="btn btn-primary mb-0">Tambah Biaya</a>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Laporan
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Customer</th>
                        <th>Jam Kerja</th>
                        <th>Jam Lembur</th>
                        <th>Jasa Penarikan Kabel</th>
                        <th>Transport</th>
                        <th>Jarak Tempuh</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($biayaDetail as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data['customer'] ?? '-' }}</td>
                            <td align="center">{{ formatRupiah($data['biaya']->jam_kerja) }}</td>
                            <td align="center">{{ formatRupiah($data['biaya']->jam_lembur) }}</td>
                            <td align="center">{{ formatRupiah($data['biaya']->kabel) }}</td>
                            <td align="center">{{ formatRupiah($data['biaya']->transport) }}</td>
                            <td align="center">{{ $data['biaya']->jarak_tempuh ?? 0 }} KM</td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        {{-- <a class="dropdown-item" href="{{ route('laporan-admin.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                        <a class="dropdown-item" href="{{ route('biaya-admin.edit', $data['biaya']->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
  </div>
</div>
@endsection