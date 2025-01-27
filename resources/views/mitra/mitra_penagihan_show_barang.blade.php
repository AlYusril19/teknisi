@extends('layouts.app_sneat_mitra')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <button onclick="window.history.back();" class="btn btn-secondary me-2">Back</button>
            <h5 class="mb-0">Detail Tagihan Barang</h5>
        </div>
        <div class="table-responsive ms-2 me-2">
            <table class="table">
                <caption class="ms-4">
                    Detail Tagihan Barang
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>tanggal pembelian</th>
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
                                <ul>
                                    @foreach ($data['penjualan_barang'] as $item)
                                        <li>{{ $item['barang']['nama_barang'] }} x{{ $item['jumlah'] }} = {{ formatRupiah($item['harga_jual'] * $item['jumlah']) }}</li>
                                    @endforeach
                                </ul>
                            </td>
                            <td align="right">{{ formatRupiah($data['total_harga']) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
  </div>
</div>

@endsection
