@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Customer</h5>
        </div>
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Laporan
                </caption>
                <thead>
                    <tr>
                        <th width="5%">No</th>
                        <th>Customer</th>
                        <th>status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($customers as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td>{{ $data['nama'] ?? '-' }}</td>
                            <td>
                                @if ($data['tagihan']->count())
                                    <p>
                                        Tagihan
                                        <span class="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">{{ $data['tagihan']->count() }}</span>
                                        <br>
                                        <i>Total: <small>{{ formatRupiah($data['total_tagihan']) }}</small></i>
                                    </p>
                                @else
                                    Tagihan Lunas ✅
                                @endif
                            </td>
                            <td>
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="{{ route('penagihan-admin.show', $data['id']) }}"><i class="bx bx-show-alt me-2"></i> Show</a>
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
  </div>
</div>
@endsection