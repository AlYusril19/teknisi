@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Pembayaran</h5>
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
        <div class="table-responsive">
            <table class="table">
                <caption class="ms-4">
                    Data Pembayaran
                </caption>
                <thead>
                    <tr align="center">
                        <th width="5%">No</th>
                        <th>Customer</th>
                        <th>status</th>
                        <th>Nominal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($pembayarans as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data->customerName['nama'] }}</td>
                            <td align="center">
                                @if ($data->status === 'pending')
                                    <span class="badge bg-warning rounded-pill">Pending</span>
                                @elseif($data->status === 'cancel')
                                    <span class="badge bg-danger rounded-pill">Cancel</span>
                                @else
                                    ✅ {{ $data->status }} {{ $data->tanggal_konfirmasi }}
                                @endif
                            </td>
                            <td align="right">{{ formatRupiah($data->jumlah_dibayar) }}</td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <!-- Tombol untuk membuka modal -->
                                        <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalTagihan" onclick="loadTagihan({{ $data->penagihan->id }})">
                                            <i class="bx bx-show-alt me-2"></i> Show
                                        </button>
                                        <a class="dropdown-item" href="{{ route('penagihan-admin.show', $data->customer_id.'#pembayaran') }}"><i class="bx bx-show-alt me-2"></i> Detail</a>
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

<!-- Modal Show Tagihan -->
<div class="modal fade" id="modalTagihan" tabindex="-1" aria-labelledby="modalTagihanLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTagihanLabel">Tagihan Teknisi dan Barang</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span class="text-muted">inv : {{ getInv($data->penagihan_id) }}</span>
                <div id="tagihanContent" class="table-responsive">
                    <p>Memuat data...</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
<script>
    function loadTagihan(id) {
        $.ajax({
            url: `/pembayaran-admin/${id}`,
            type: 'GET',
            success: function(response) {
                let content = '';
                
                if (response.penagihan.laporan_kerja.length > 0) {
                    content += '<h5>Tagihan Teknisi dan Barang ' + response.tanggalTagihan + '</h5>';
                    content += '<table class="table"><thead><tr><th>No</th><th>Tanggal</th><th>Jenis Tagihan</th><th>Nominal</th></tr></thead><tbody>';

                    let totalSemuaTagihan = 0; // Inisialisasi total semua tagihan

                    response.penagihan.laporan_kerja.forEach((data, index) => {
                        let totalTagihan = data.tagihan.reduce((sum, item) => sum + Number(item.total_biaya), 0);
                        totalSemuaTagihan += totalTagihan; // Tambahkan ke total semua tagihan

                        content += `<tr>
                            <td>${index + 1}</td>
                            <td>${data.tanggal_kegiatan}</td>
                            <td>${data.jenis_kegiatan === 'mitra' ? 'Teknisi' : ''} ${data.barang ? 'dan Barang' : ''}</td>
                            <td align="right">${formatRupiahJS(totalTagihan)}</td>
                        </tr>`;
                    });

                    // Tambahkan total biaya di bawah tabel
                    content += `<tr>
                        <td colspan="3" align="right"><strong>Total Biaya:</strong></td>
                        <td align="right"><strong>${formatRupiahJS(totalSemuaTagihan)}</strong></td>
                    </tr>`;

                    content += '</tbody></table>';
                }

                
                if (response.penagihan.penjualan.length > 0) {
                    content += '<h5>Tagihan Barang ' + response.tanggalTagihan + '</h5>';
                    content += '<table class="table"><thead><tr><th>No</th><th>Tanggal</th><th>Jenis Tagihan</th><th>Nominal</th></tr></thead><tbody>';

                    let totalSemuaTagihanPenjualan = 0; // Total semua tagihan penjualan

                    response.penagihan.penjualan.forEach((data, index) => {
                        let totalTagihan = Number(data.total_biaya);
                        totalSemuaTagihanPenjualan += totalTagihan; // Tambahkan ke total semua tagihan penjualan

                        content += `<tr>
                            <td>${index + 1}</td>
                            <td>${data.tanggal_penjualan}</td>
                            <td>Barang</td>
                            <td align="right">${formatRupiahJS(totalTagihan)}</td>
                        </tr>`;
                    });

                    // Tambahkan total biaya penjualan barang
                    content += `<tr>
                        <td colspan="3" align="right"><strong>Total Biaya Barang:</strong></td>
                        <td align="right"><strong>${formatRupiahJS(totalSemuaTagihanPenjualan)}</strong></td>
                    </tr>`;

                    content += '</tbody></table>';
                }
                
                $('#tagihanContent').html(content);
            },
            error: function() {
                $('#tagihanContent').html('<p>Gagal memuat data.</p>');
            }
        });
    }
</script>
@endsection