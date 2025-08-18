@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-6">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Gaji Staff</h5>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Gaji Staff
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Nama Staff</th>
                        <th>Status</th>
                        <th>Total Gaji</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($listStaff as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="left">
                                @if ($data['role'] === 'magang')
                                    {{ $data['name'] }}<small class="text-primary"> &commat;Helper</small>
                                @else
                                    {{ $data['name'] }}
                                @endif
                            </td>
                            <td align="center"><span class="{{ $data['class'] ?? '' }}">{{ $data['status'] }}</span></td>
                            <td align="right">{{ formatRupiah($data['gaji']) }}</td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="{{ route('gaji-default.show', $data['id']) }}"><i class="bx bx-show-alt me-2"></i> Show</a>
                                        {{-- <a class="dropdown-item" href="{{ route('item-gaji.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                        <form action="{{ route('item-gaji.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i> Delete</button>
                                        </form> --}}
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
  <div class="col-md-6">
    {{-- Gaji Default Role --}}
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Gaji Default Role</h5>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Gaji Staff
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Role</th>
                        <th>Total Gaji</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($userRoles as $role => $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="left">{{ $role }}</td>
                            <td align="right">{{ formatRupiah($data['gaji']) }}</td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="{{ route('gaji-default.show', $role) }}"><i class="bx bx-show-alt me-2"></i> Show</a>
                                        {{-- <a class="dropdown-item" href="{{ route('item-gaji.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                        <form action="{{ route('item-gaji.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i> Delete</button>
                                        </form> --}}
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