@extends('layouts.app_sneat_admin')

@section('content')
    {{-- <h5 class="pb-1 mb-6">Data Peserta</h5> --}}
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Laporan Kerja</h5>
            <a href="{{ route('laporan-admin.create') }}" class="btn btn-primary mb-0">Buat Laporan</a>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Laporan
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Teknisi</th>
                        <th>Tanggal</th>
                        <th>Jenis</th>
                        <th>Kegiatan</th>
                        <th>status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($laporan as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data->user_id }}</td>
                            <td>{{ $data->tanggal_kegiatan }}</td>
                            <td>{{ $data->jenis_kegiatan }}</td>
                            <td>{{ $data->keterangan_kegiatan }}</td>
                            <td align="center">
                                <span class="badge bg-label-{{ $data->status === 'draft' ? 'primary' : ($data->status === 'pending' ? 'warning' : 'success') }}">{{ $data->status ?? 'null' }}</span>
                            </td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        {{-- <a class="dropdown-item" href="{{ route('laporan.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                        <a class="dropdown-item" href="{{ route('laporan-admin.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                        {{-- <form action="{{ route('laporan-admin.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
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
    {{-- <div class="row">
        <div class="col-sm-12">
            <div class="card">
                {{ $laporan->links() }}
            </div>
        </div>
    </div> --}}
    {{-- <hr class="my-12"> --}}
@endsection
{{-- Redirect to Chat Whastapp --}}
@if (session('whatsappLink'))
    <script>
        window.open('{{ session('whatsappLink') }}', '_blank');
    </script>
@endif
