@extends('layouts.app_sneat_mitra')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Tagihan Periode {{ $tahunDipilih }}</h5>
            <form action="{{ route('penagihan-mitra.index') }}" method="GET">
                <div class="input-group">
                    <select name="tahun" id="tahun" class="form-select" onchange="this.form.submit()">
                        @for ($y = date('Y') - 5; $y <= date('Y'); $y++)
                            <option value="{{ $y }}" {{ request('tahun', date('Y')) == $y ? 'selected' : '' }}>
                                {{ $y }}
                            </option>
                        @endfor
                    </select>
                </div>
            </form>
        </div>
        <div class="table-responsive me-2 ms-2">
            <table class="table">
                <caption class="ms-4">
                    Data Tagihan
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Tanggal Tagihan</th>
                        <th>Nominal</th>
                        <th>Keterangan</th>
                        <th>Status</th>
                        <th width="5%">Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($penagihans as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data->tanggal_tagihan }}</td>
                            <td align="right">{{ formatRupiah($data->laporan_kerja->flatMap->tagihan->sum('total_biaya')) ?? '-' }}</td>
                            <td>{{ $data->keterangan }}</td>
                            <td align="center">
                                @if ($data->status === 'lunas')
                                    <span class="badge bg-label-success">{{ $data->status ?? '-' }}</span>
                                @elseif($data->status === 'angsur')
                                    <span class="badge bg-label-warning">{{ $data->status ?? '-' }}</span>
                                @else
                                    <span class="badge bg-label-danger">{{ $data->status ?? '-' }}</span>
                                @endif
                            </td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="{{ route('penagihan-mitra.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a>
                                        {{-- <a class="dropdown-item" href="{{ route('penagihan-mitra.show', $data->id) }}"><i class="bx bx-credit-card me-2"></i> Pay</a> --}}
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
