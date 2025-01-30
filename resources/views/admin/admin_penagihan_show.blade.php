@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    {{-- Biodata Customer --}}
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Data Customer</h5>
            {{-- <a href="{{ route('biaya-admin.create') }}" class="btn btn-primary mb-0">Tambah Biaya</a> --}}
            {{-- <form action="{{ route('biaya-admin.index') }}" method="GET">
                <div class="input-group">
                    <input type="text" name="search" class="form-control" placeholder="jenis / kegiatan" value="{{ request('search') }}">
                    <button type="submit" class="btn btn-primary me-2"><i class="bx bx-search"></i></button>
                    <select name="filter" class="form-select" onchange="this.form.submit()">
                        <option value="">Semua Laporan</option>
                        <option value="lembur" {{ request('filter') == 'lembur' ? 'selected' : '' }}>Laporan Lembur</option>
                    </select>
                </div>
            </form> --}}
        </div>
        <div class="table-responsive me-3 ms-3">
            <table class="table table-sm table-bordered">
                <caption class="ms-4">
                    Data Customer
                </caption>
                <tbody>
                    <tr align="center">
                        <td rowspan="3" width="80">
                            <img src="https://skytama.com/corona/assets/images/profil/profil.png" alt="pelanggan" width="30" height="30">
                        </td>
                    </tr>
                    <tr>
                        <td width="120">No HP</td>
                        <td> {{ $customer['hp'] }}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td> {{ $customer['nama'] }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
  
  {{-- Generate Tagihan --}}
  <div class="col-md-6 mt-2">
    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0">Tagihan Customer Periode {{ DateTime::createFromFormat('!m', $bulanDipilih)->format('F') }}</h5>
            <form action="{{ route('penagihan-admin.show', $customer['id']) }}" id="penagihanForm" method="GET">
                <div class="input-group">
                    <select name="bulan" id="bulan" class="form-select">
                        @for ($i = 1; $i <= 12; $i++)
                            <option value="{{ $i }}" {{ request('bulan', date('n')) == $i ? 'selected' : '' }}>
                                {{ DateTime::createFromFormat('!m', $i)->format('F') }}
                            </option>
                        @endfor
                    </select>
                    <select name="tahun" id="tahun" class="form-select">
                        @for ($y = date('Y') - 5; $y <= date('Y'); $y++)
                            <option value="{{ $y }}" {{ request('tahun', date('Y')) == $y ? 'selected' : '' }}>
                                {{ $y }}
                            </option>
                        @endfor
                    </select>
                </div>
            </form>
        </div>
        
        <div class="card-body">
            {{-- Tagihan Before Generate --}}
            @if ($tagihans->count() > 0 || $tagihansBarang)
                {{-- tagihan teknisi dan barang --}}
                @if ($tagihans->count() > 0)
                    <div class="table-responsive mb-2">
                        <table class="table table-sm table-bordered table-secondary">
                            <caption class="ms-4">
                                Tagihan Teknisi dan Barang
                            </caption>
                            <thead>
                                <tr align="center">
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Nominal</th>
                                    {{-- <th>Status</th> --}}
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($tagihans as $data)
                                    <tr>
                                        <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                        <td align="center">{{ $data->tanggal_kegiatan }}</td>
                                        <td align="right">{{ formatRupiah($data->tagihan->sum('total_biaya')) }}</td>
                                        {{-- <td align="center">{{ $data->penagihan_id ?? 'belum lunas' }}</td> --}}
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif

                {{-- tagihan barang (pembelian) --}}
                @if ($tagihansBarang)
                    <div class="table-responsive mb-2">
                        <table class="table table-sm table-bordered table-secondary">
                            <caption class="ms-4">
                                Tagihan Barang
                            </caption>
                            <thead>
                                <tr align="center">
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Nominal</th>
                                    {{-- <th>Status</th> --}}
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($tagihansBarang as $data)
                                    <tr>
                                        <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                        <td align="center">{{ $data['tanggal_penjualan'] }}</td>
                                        <td align="right">{{ formatRupiah($data['total_harga']) }}</td>
                                        {{-- <td align="center">{{ $data->penagihan_id ?? 'belum lunas' }}</td> --}}
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif

                <h5 class="mt-3">Form Generate Tagihan</h5>
                <form method="POST" action="{{ route('penagihan-admin.store') }}" enctype="multipart/form-data" class="mb-3">
                    @csrf
                    {{-- hidden input --}}
                    <input type="text" name="bulan" value="{{ $bulanDipilih }}" hidden>
                    <input type="text" name="tahun" value="{{ $tahunDipilih }}" hidden>
                    <input type="text" name="customer_id" value="{{ $customer['id'] }}" hidden>
                    {{-- end hidden input --}}
                    <div class="row mb-2">
                        <label class="form-label" for="tanggal_tagihan">Tanggal Tagihan</label>
                        <div>
                            <input type="date" class="form-control" id="tanggal_tagihan" name="tanggal_tagihan" value="{{ date('Y-m-d') }}" required>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <label class="form-label" for="keterangan">Keterangan</label>
                        <div>
                            <input type="text" class="form-control" id="keterangan" name="keterangan" value="Tagihan Periode {{ DateTime::createFromFormat('!m', $bulanDipilih)->format('F') }} {{ $tahunDipilih }}" required>
                        </div>
                    </div>
                    <button type="submit">Generate</button>
                </form>
            @endif

            {{-- Tagihan After Generate --}}
            @if ($penagihans->count() > 0)
                <div class="table-responsive">
                    <h5 class="mb-1">Tabel Data Penagihan</h5>
                    <table class="table table-sm table-bordered table-primary">
                        <caption class="ms-4">
                            Data Penagihan
                        </caption>
                        <thead>
                            <tr align="center">
                                <th>No</th>
                                <th>Tanggal Tagihan</th>
                                <th>Nominal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($penagihans as $data)
                                <tr>
                                    <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                    <td align="center">
                                        {{ $data->tanggal_tagihan }} <br>
                                        <span class="text-muted">{{ $data->keterangan }}</span>
                                        @if ($data->diskon)
                                            <div class="badge bg-danger rounded-pill ms-auto">{{ $data->diskon }}% Off</div>
                                        @endif
                                    </td>
                                    {{-- <td></td> --}}
                                    <td align="right">
                                        {{ 
                                         formatRupiah($data->laporan_kerja->flatMap->tagihan->sum('total_biaya')
                                         + 
                                         $data->penjualan->sum('total_biaya')) ?? '-'
                                        }}
                                    </td>
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
                                        <form action="{{ route('penagihan-admin.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i></button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif

            {{-- Form Pembayaran --}}
            @if ($listPenagihan->count() > 0)
                <div class="form-control mt-2">
                    <h5 class="mt-3">Form Pembayaran</h5>
                    <form method="POST" action="{{ route('pembayaran-admin.store') }}" enctype="multipart/form-data">
                        @csrf
                        <select name="penagihan_id" id="penagihan_id" class="form-control mb-3">
                            {{-- <option value="">--Pilih Tagihan--</option> --}}
                                @foreach($listPenagihan as $data)
                                    <option value="{{ $data->id }}">
                                        {{ formatRupiah($data->laporan_kerja?->flatMap->tagihan->sum('total_biaya') + $data->penjualan->sum('total_biaya')) }} ||
                                        <span class="text-muted">{{ $data->keterangan }}</span>
                                        
                                        @if ($data->pembayaran->sum('jumlah_dibayar') != null)
                                            sisa tagihan ({{ 
                                                formatRupiah(
                                                    ($data->laporan_kerja?->flatMap->tagihan->sum('total_biaya') + $data->penjualan->sum('total_biaya') ?? 0) -
                                                    ($data->pembayaran?->sum('jumlah_dibayar') ?? 0)
                                                ) 
                                            }})
                                        @endif
                                    </option>
                                @endforeach
                        </select>
                        <div class="row mb-3">
                            <label class="form-label" for="tanggal_bayar">Tanggal Pembayaran</label>
                            <div>
                                <input type="date" class="form-control" id="tanggal_bayar" name="tanggal_bayar" value="{{ date('Y-m-d') }}" required>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label class="form-label" for="jumlah_dibayar">Jumlah di Bayar</label>
                            <div>
                                <input type="number" class="form-control" id="jumlah_dibayar" name="jumlah_dibayar" placeholder="100000" min="1000" required>
                            </div>
                        </div>
                        <button type="submit">Bayar</button>
                    </form>
                </div>
            @endif

            {{-- tabel pembayaran periode bulan --}}
            @if ($pembayaran->count() > 0)
                <div class="table-responsive mt-3">
                    <h5 class="mb-1">Tabel Data Pembayaran</h5>
                    <table class="table table-sm table-bordered table-success">
                        <caption class="ms-4">
                            Data Pembayaran
                        </caption>
                        <thead>
                            <tr align="center">
                                <th>No</th>
                                <th>Tanggal bayar</th>
                                <th>Nominal</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($pembayaran as $data)
                                <tr>
                                    <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                    <td align="center">
                                        {{ $data->tanggal_bayar }} <br>
                                        {{-- <span class="text-muted">{{ $data->keterangan }}</span> --}}
                                    </td>
                                    {{-- <td></td> --}}
                                    <td align="right">
                                        {{ formatRupiah($data->jumlah_dibayar) }}
                                    </td>
                                    <td align="center">{{ $data->status }}</td>
                                    <td align="center">
                                        <form action="{{ route('pembayaran-admin.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i></button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </div>
    </div>
  </div>

  {{-- Tabel Periode Tahun --}}
  <div class="col-md-6 mt-2">

    {{-- Tabel Tagihan Tahunan --}}
    <div class="card">
        <div class="card-header d-flex justifiy-content-between align-items-center">
            <h5 class="mb-0">Tabel Tagihan Customer Periode {{ $tahunDipilih }}</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm table-bordered table-secondary">
                    <caption class="ms-4">
                        Detail Tagihan
                    </caption>
                    <thead>
                        <tr align="center">
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Nominal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($penagihanTahunan as $data)
                            <tr>
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td align="center">{{ $data->tanggal_tagihan }}</td>
                                <td align="right">
                                    {{
                                     formatRupiah($data->laporan_kerja->flatMap->tagihan->sum('total_biaya')
                                      + 
                                     $data->penjualan->sum('total_biaya')) ?? '-' 
                                    }}
                                </td>
                                <td align="center">
                                    @if ($data->status === 'lunas')
                                        <span class="badge bg-label-success">{{ $data->status ?? '-' }}</span>
                                    @elseif($data->status === 'angsur')
                                        <span class="badge bg-label-warning">{{ $data->status ?? '-' }}</span>
                                    @else
                                        <span class="badge bg-label-danger">{{ $data->status ?? '-' }}</span>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {{-- Tabel Pembayaran Tahunan --}}
    <div class="card mt-2">
        <div class="card-header d-flex justifiy-content-between align-items-center">
            <h5 class="mb-0">Tabel Pembayaran Customer Periode {{ $tahunDipilih }}</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm table-bordered table-success">
                    <caption class="ms-4">
                        Detail Pembayaran
                    </caption>
                    <thead>
                        <tr align="center">
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Nominal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($pembayaranTahunan as $data)
                            <tr>
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td align="center">{{ $data->tanggal_bayar }}</td>
                                <td align="right">
                                    {{ formatRupiah($data->jumlah_dibayar) }}
                                </td>
                                <td align="center">{{ $data->status }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
  
</div>
@endsection

@section('js')
    <script>
        // Menambahkan event listener untuk mengirim form saat bulan atau tahun diubah
        document.getElementById('bulan').addEventListener('change', function() {
            document.getElementById('penagihanForm').submit();
        });

        document.getElementById('tahun').addEventListener('change', function() {
            document.getElementById('penagihanForm').submit();
        });
    </script>
@endsection