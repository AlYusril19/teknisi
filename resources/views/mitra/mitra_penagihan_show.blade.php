@extends('layouts.app_sneat_mitra')

@section('content')
<div class="row">
    <div class="col-12">
        <!-- Wrapper: Kedua Card (Bersebelahan) -->
        <div class="d-flex flex-wrap justify-content-center gap-4">

            <!-- Card 1: Tagihan Teknisi dan Barang -->
            <div class="card flex-fill">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Tagihan Teknisi dan Barang {{ $tanggalTagihan }}</h5>
                    <form action="{{ route('laporan-mitra.index') }}" method="GET">
                        <div class="input-group input-group-sm">
                        <button type="submit" name="transaksi" value="{{ $id }}" class="btn btn-secondary">
                            <i class="bx bx-show me-1"></i> Detail Tagihan
                        </button>
                        </div>
                    </form>
                </div>
                <div class="table-responsive ms-2 me-2">
                    <table class="table table-hover table-striped table-bordered">
                        <caption class="ms-4">
                        Data Tagihan {{ $tanggalTagihan }}
                        </caption>
                        <thead class="table-primary">
                        <tr align="center">
                            <th width="5%">No</th>
                            <th>Tanggal</th>
                            <th>Item Tagihan</th>
                            <th>Nominal</th>
                        </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                        @if ($penagihan->laporan_kerja->isNotEmpty())
                            @foreach($penagihan->laporan_kerja as $data)
                            <tr>
                                <td align="center" class="align-middle">
                                <i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong>
                                </td>
                                <td align="center" class="align-middle">{{ $data->tanggal_kegiatan }}</td>
                                <td class="align-middle">
                                @if ($data->jenis_kegiatan === 'mitra')
                                    Teknisi: 
                                    {{ formatRupiah(
                                        $data->tagihan->filter(fn($item) => $item['nama_biaya'] !== 'Biaya Barang')
                                                    ->sum('total_biaya')
                                    ) ?? '-' }}
                                @endif
                                @if ($data->barang !== "null")
                                    <br>Barang: 
                                    {{ formatRupiah(
                                        $data->tagihan->filter(fn($item) => $item['nama_biaya'] === 'Biaya Barang')
                                                    ->sum('total_biaya')
                                    ) ?? '-' }}
                                @endif
                                @if ($data->diskon !== null)
                                    <div class="badge bg-danger rounded-pill ms-auto mt-1">{{ $data->diskon }}% Off</div>
                                @endif
                                </td>
                                <td align="right" class="align-middle fw-bold">
                                {{ formatRupiah($data->tagihan->sum('total_biaya')) ?? '-' }}
                                </td>
                            </tr>
                            @endforeach
                        @else
                            <tr>
                            <td colspan="4" align="center" class="text-muted py-3">Tidak ada data tagihan teknisi & barang.</td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                </div>
                <!-- Total Teknisi dan Barang di Bawah Tabel -->
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <span>Total Tagihan Teknisi:</span>
                        <span class="text-success">
                        {{ formatRupiah(
                            $penagihan->laporan_kerja
                                        ->filter(fn($d) => $d->jenis_kegiatan === 'mitra')
                                        ->sum(fn($d) => $d->tagihan->filter(fn($i) => $i['nama_biaya'] !== 'Biaya Barang')->sum('total_biaya'))
                        ) ?? '0' }}
                        </span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mt-2 fw-bold">
                        <span>Total Tagihan Barang:</span>
                        <span class="text-success">
                        {{ formatRupiah(
                            $penagihan->laporan_kerja
                                        ->filter(fn($d) => $d->barang !== "null")
                                        ->sum(fn($d) => $d->tagihan->filter(fn($i) => $i['nama_biaya'] === 'Biaya Barang')->sum('total_biaya'))
                        ) ?? '0' }}
                        </span>
                    </div>

                    <hr class="my-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold">Total Keseluruhan:</span>
                        <span class="fw-bold text-primary">
                        {{ formatRupiah(
                            $penagihan->laporan_kerja->sum(fn($d) => $d->tagihan->sum('total_biaya'))
                        ) ?? '0' }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Card 2: Tagihan Barang -->
            <div class="card flex-fill">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Tagihan Barang {{ $tanggalTagihan }}</h5>
                    <form action="{{ route('show-barang') }}" method="GET">
                        <div class="input-group input-group-sm">
                        <button type="submit" name="penagihan_id" value="{{ $id }}" class="btn btn-secondary">
                            <i class="bx bx-show me-1"></i> Detail Tagihan
                        </button>
                        </div>
                    </form>
                </div>
                <div class="table-responsive ms-2 me-2">
                    <table class="table table-hover table-striped table-bordered">
                        <caption class="ms-4">
                        Data Tagihan {{ $tanggalTagihan }}
                        </caption>
                        <thead class="table-primary">
                        <tr align="center">
                            <th width="5%">No</th>
                            <th>Tanggal</th>
                            <th>Jenis Tagihan</th>
                            <th>Nominal</th>
                        </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                        @if ($penagihan->penjualan->isNotEmpty())
                            @foreach($penagihan->penjualan as $data)
                            <tr>
                                <td align="center" class="align-middle">
                                <i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong>
                                </td>
                                <td align="center" class="align-middle">{{ $data->tanggal_penjualan }}</td>
                                <td align="center" class="align-middle">Barang</td>
                                <td align="right" class="align-middle fw-bold">
                                {{ formatRupiah($data->total_biaya) }}
                                </td>
                            </tr>
                            @endforeach
                        @else
                            <tr>
                            <td colspan="4" align="center" class="text-muted py-3">Tidak ada data tagihan barang.</td>
                            </tr>
                        @endif
                        </tbody>
                    </table>
                </div>
                <div class="card-body pt-3">
                    <div class="d-flex justify-content-between align-items-center fw-bold">
                        <span>Total Tagihan Barang:</span>
                        <span class="text-success">
                        {{ formatRupiah($penagihan->penjualan->sum('total_biaya')) ?? '0' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
