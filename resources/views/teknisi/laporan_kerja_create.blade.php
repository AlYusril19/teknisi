@extends('layouts.app_sneat')

@section('content')
<div class="row justify-content-center">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="mb-0">Input Laporan</h5>
                <small class="text-muted float-end">Form Data Laporan</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('laporan.store') }}" enctype="multipart/form-data">
                    @csrf
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jenis_kegiatan">Kegiatan</label>
                        <div class="col-sm-10">
                            <select name="jenis_kegiatan" id="jenis_kegiatan" class="form-control">
                                <option value="pemasangan">Pemasangan</option>
                                <option value="perbaikan">Perbaikan</option>
                                <option value="pemutusan">Pemutusan</option>
                            </select>
                        </div>
                    </div>

                    <!-- Barang Selection -->
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="barang_id">Barang</label>
                        <div class="col-sm-8">
                            <select name="barang_id" id="barang_id" class="form-control">
                                <option value="">Pilih Barang</option>
                                @foreach($barangs as $b)
                                    @if ($b['status'] === 'aktif')
                                        <option value="{{ $b['id'] }}">{{ $b['nama_barang'] }}</option>
                                    @endif
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" id="btn-tambah-barang" class="btn btn-primary">Tambah Barang</button>
                        </div>
                    </div>

                    <!-- Tabel Barang yang Ditambahkan -->
                    <div class="row mb-3">
                        <div class="col-sm-12">
                            <table class="table table-bordered" id="daftar-barang">
                                <thead>
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>Jumlah</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tanggal, Jam, Keterangan -->
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="tanggal_kegiatan">Tanggal Kegiatan</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="tanggal_kegiatan" name="tanggal_kegiatan" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_mulai">Jam Mulai</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="jam_mulai" name="jam_mulai" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_selesai">Jam Selesai</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="jam_selesai" name="jam_selesai" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="keterangan_kegiatan">Keterangan</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="keterangan_kegiatan" name="keterangan_kegiatan" required></textarea>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" name="status" value="pending" class="btn btn-primary me-2">Post</button>
                        <button type="submit" name="status" value="draft" class="btn btn-secondary me-2">Draft</button>
                        {{-- <button type="reset" class="btn btn-outline-secondary">Batal</button> --}}
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')
<script>
    // Fungsi untuk mengambil tanggal sekarang dalam format YYYY-MM-DD
    function getTodayDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2,   
    '0');
        return yyyy + '-' + mm + '-' + dd;
    }

    // Mengambil elemen input dengan ID "tanggal" dan mengisi nilainya
    const tanggalInput = document.getElementById('tanggal_kegiatan');
    tanggalInput.value = getTodayDate();
</script>
<script>
    $(document).ready(function() {
        // Add barang to the list
        $('#btn-tambah-barang').on('click', function() {
            var barangId = $('#barang_id').val();
            var barangNama = $('#barang_id option:selected').text();
            var jumlah = 1; // Default jumlah awal

            if (barangId) {
                // Check if the barang is already added
                var exists = false;
                $('#daftar-barang tbody tr').each(function() {
                    if ($(this).data('barang-id') == barangId) {
                        exists = true;
                        var currentJumlah = parseInt($(this).find('.jumlah-barang').text());
                        $(this).find('.jumlah-barang').text(currentJumlah + 1);
                        $(this).find('input[name="jumlah[]"]').val(currentJumlah + 1);
                        return false;
                    }
                });

                // If barang is not already added, append to table
                if (!exists) {
                    var row = `<tr data-barang-id="${barangId}">
                        <td>${barangNama}</td>
                        <td>
                            <button type="button" class="btn btn-secondary btn-kurang-barang">-</button>
                            <span class="jumlah-barang">${jumlah}</span>
                            <button type="button" class="btn btn-secondary btn-tambah-barang">+</button>
                            <input type="hidden" name="barang_ids[]" value="${barangId}">
                            <input type="hidden" name="jumlah[]" value="${jumlah}">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-hapus-barang">Hapus</button>
                        </td>
                    </tr>`;
                    $('#daftar-barang tbody').append(row);
                }
            } else {
                alert('Pilih barang terlebih dahulu!');
            }
        });

        // Function to remove barang from the list
        $(document).on('click', '.btn-hapus-barang', function() {
            $(this).closest('tr').remove();
        });

        // Function to increase jumlah
        $(document).on('click', '.btn-tambah-barang', function() {
            var row = $(this).closest('tr');
            var currentJumlah = parseInt(row.find('.jumlah-barang').text());
            row.find('.jumlah-barang').text(currentJumlah + 1);
            row.find('input[name="jumlah[]"]').val(currentJumlah + 1);
        });

        // Function to decrease jumlah
        $(document).on('click', '.btn-kurang-barang', function() {
            var row = $(this).closest('tr');
            var currentJumlah = parseInt(row.find('.jumlah-barang').text());

            if (currentJumlah > 1) {
                row.find('.jumlah-barang').text(currentJumlah - 1);
                row.find('input[name="jumlah[]"]').val(currentJumlah - 1);
            }
        });
    });
</script>
@endsection
