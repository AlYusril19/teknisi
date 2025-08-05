@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Item Gaji</h5>
            <a href="{{ route('item-gaji.create') }}" class="btn btn-primary mb-0">Tambah Item</a>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Item Gaji
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Item</th>
                        <th>Jenis</th>
                        <th>Nominal Gaji</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($itemgaji as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data->nama }}</td>
                            <td align="center">{{ $data->jenis }}</td>
                            <td align="center">{{ formatRupiah($data->jumlah) }}</td>
                            <td align="center">
                                @if ($data->aktif === 1)
                                    <span class="badge bg-primary rounded-pill">Aktif</span>
                                @else
                                    <span class="badge bg-danger rounded-pill">Nonaktif</span>
                                @endif
                            </td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="{{ route('item-gaji.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                        <form action="{{ route('item-gaji.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i> Delete</button>
                                        </form>
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