@extends('layouts.app_sneat_mitra')

@section('content')

<div class="row">
  <div class="col-md-12">
    {{-- Tagihan Teknisi dan Barang --}}
    @if ($penagihan->laporan_kerja->isNotEmpty())
        <div class="card mb-2">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Tagihan Teknisi dan Barang {{ $tanggalTagihan }}</h5>
                <form action="{{ route('laporan-mitra.index') }}" method="GET">
                    <div class="input-group">
                        <button type="submit" name="transaksi" value="{{ $id }}" class="btn btn-secondary"><i class="bx bx-show me-1"></i> Detail Tagihan</button>
                    </div>
                </form>
            </div>
            <div class="table-responsive ms-2 me-2">
                <table class="table">
                    <caption class="ms-4">
                        Data Tagihan {{ $tanggalTagihan }}
                    </caption>
                    <thead>
                        <tr align="center">
                            <th width="5%">No</th>
                            <th>tanggal</th>
                            <th>Jenis Tagihan</th>
                            <th>Nominal</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        @foreach($penagihan->laporan_kerja as $data)
                            <tr>
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td align="center">{{ $data->tanggal_kegiatan }}</td>
                                <td align="center">
                                    @if ($data->jenis_kegiatan === 'mitra')
                                        Teknisi
                                    @endif
                                    @if ($data->barang != null)
                                        dan Barang
                                    @endif
                                    @if ($data->diskon != null)
                                        <div class="badge bg-danger rounded-pill ms-auto">{{ $data->diskon }}% Off</div>
                                    @endif
                                </td>
                                <td align="right">{{ formatRupiah($data->tagihan->sum('total_biaya')) ?? '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif

    {{-- Tagihan Barang --}}
    @if ($penagihan->penjualan->isNotEmpty())
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Tagihan Barang {{ $tanggalTagihan }}</h5>
                <form action="{{ route('show-barang') }}" method="GET">
                    <div class="input-group">
                        <button type="submit" name="penagihan_id" value="{{ $id }}" class="btn btn-secondary"><i class="bx bx-show me-1"></i> Detail Tagihan</button>
                    </div>
                </form>
            </div>
            {{-- tabel tagihan teknisi dan barang --}}
            <div class="table-responsive ms-2 me-2">
                <table class="table">
                    <caption class="ms-4">
                        Data Tagihan {{ $tanggalTagihan }}
                    </caption>
                    <thead>
                        <tr align="center">
                            <th width="5%">No</th>
                            <th>tanggal</th>
                            <th>Jenis Tagihan</th>
                            <th>Nominal</th>
                            {{-- <th width="5%">Aksi</th> --}}
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        @foreach($penagihan->penjualan as $data)
                            <tr>
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td align="center">{{ $data->tanggal_penjualan }}</td>
                                <td align="center">
                                    Barang
                                </td>
                                <td align="right">{{ formatRupiah($data->total_biaya) }}</td>
                                {{-- <td align="center">
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="{{ route('penagihan-mitra.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a>
                                        </div>
                                    </div>
                                </td> --}}
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
  </div>
</div>

@endsection
