@extends('layouts.app_sneat_mitra')

@section('content')

<div class="row">
    @include('mitra.navbar_penagihan')
    @if ($tagihan->isNotEmpty() || $tagihanBarang)
        <div class="col-md-12">
            <div class="card mb-2">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Daftar Tagihan Teknisi dan Barang</h5>
                </div>
                <div class="table-responsive me-2 ms-2">
                    <table class="table">
                        <caption class="ms-4">
                            Data Tagihan
                        </caption>
                        <thead>
                            <tr align="center">
                                <th width="5%">No</th>
                                <th>Tanggal Kegiatan</th>
                                <th>Keterangan</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            @foreach($tagihan as $data)
                                <tr>
                                    <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                    <td align="center">
                                        {{ $data->tanggal_kegiatan }}
                                        <p class="mb-0 text-primary">&commat;{{ $data->user['name'] }}</p>
                                    </td>
                                    <td>
                                        {{ $data->keterangan_kegiatan }}
                                        @foreach ($data->support as $item)
                                            <p class="mb-0 text-primary">&commat;{{ $item['name'] }}</p>
                                        @endforeach
                                        @if ($data->diskon != null)
                                            <div class="badge bg-danger rounded-pill ms-auto">{{ $data->diskon }}% Off</div>
                                        @endif
                                    </td>
                                    <td align="right">
                                        {{ 
                                            formatRupiah($data->tagihan->sum('total_biaya')) ?? ''
                                        }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Daftar Tagihan Barang</h5>
                </div>
                <div class="table-responsive me-2 ms-2">
                    <table class="table">
                        <caption class="ms-4">
                            Data Tagihan
                        </caption>
                        <thead>
                            <tr align="center">
                                <th width="5%">No</th>
                                <th>Tanggal Pembelian</th>
                                <th>Barang</th>
                                <th>Nominal</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            @foreach($tagihanBarang as $data)
                                <tr>
                                    <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                    <td align="center">{{ $data['tanggal_penjualan'] }}</td>
                                    <td>
                                        @foreach ($data['penjualan_barang'] as $barang)
                                            <ul>
                                                <li>{{ $barang['barang']['nama_barang'] }} x{{ $barang['jumlah'] }} = {{ formatRupiah($barang['harga_jual']) }}</li>
                                            </ul>
                                        @endforeach
                                    </td>
                                    <td align="right">
                                        {{ 
                                            formatRupiah($data['total_harga']) ?? ''
                                        }}
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    @else
        <div class="d-flex flex-column align-items-center justify-content-center mt-5">  
            <h5 class="mb-3 mt-3">Tidak ada tagihan</h5>  
            <img src="{{ asset('sneat/assets/img/icons/customs/empty-cart.png') }}" width="80px" height="80px" alt="Tagihan belum tersedia">  
        </div> 
    @endif
</div>

@endsection
