<!-- Modal untuk Tabel Barang dan Pilihan Barang -->
<!-- Tabel Barang yang Ditambahkan -->
<div class="modal fade" id="barangModal" tabindex="-1" aria-labelledby="barangModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="barangModalLabel">Daftar Barang Keluar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Barang Selection -->
                <div class="row d-flex align-items-center">
                    <div class="col-sm-2 mb-2">
                        <label class="col-form-label" for="barang_id">Barang Keluar</label>
                    </div>
                    <div class="col-sm-8 mb-2">
                        <select name="barang_id" id="barang_id" class="form-control">
                            <option value="" disabled selected>Pilih Barang</option>
                                @foreach($barangs as $b)
                                    <option value="{{ $b['id'] }}">{{ $b['nama_barang'] }}</option>
                                @endforeach
                        </select>
                    </div>
                    <div class="col-sm-2 mb-2">
                        <button type="button" id="btn-tambah-barang" class="btn btn-light">
                            <i class="menu-icon tf-icons bx bx-cart">+</i>
                        </button>
                    </div>
                </div>
                <!-- Tabel Barang -->
                <div class="table-responsive mt-2">
                    <table class="table table-bordered" id="daftar-barang">
                        <thead>
                            <tr>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Daftar barang akan muncul di sini -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary" id="btn-simpan-barang">Simpan</button>
            </div>
        </div>
    </div>
</div>
{{-- End Modal Barang --}}

<!-- Modal Tabel Barang Kembali -->
<div class="modal fade" id="barangKembaliModal" tabindex="-1" aria-labelledby="barangKembaliModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="barangKembaliModalLabel">Daftar Barang Kembali</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Barang Selection -->
                <div class="row d-flex align-items-center">
                    <div class="col-sm-2 mb-2">
                        <label class="col-form-label" for="barang_kembali_id">Barang Kembali</label>
                    </div>
                    <div class="col-sm-8 mb-2">
                        <select name="barang_kembali_id" id="barang_kembali_id" class="form-control">
                            <option value="" disabled selected>Pilih Barang Kembali</option>
                            @foreach($barangsKembali as $b)
                                <option value="{{ $b['id'] }}">{{ $b['nama_barang'] }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-2 mb-2">
                        <button type="button" id="btn-tambah-barang-kembali" class="btn btn-light">
                            <i class="menu-icon tf-icons bx bx-cart">+</i>
                        </button>
                    </div>
                </div>
                <!-- Tabel Barang -->
                <div class="table-responsive mt-2">
                    <table class="table table-bordered" id="daftar-barang-kembali">
                        <thead>
                            <tr>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Daftar barang akan muncul di sini -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary" id="btn-simpan-barang-kembali">Simpan</button>
            </div>
        </div>
    </div>
</div>
{{-- End Modal Barang --}}

<!-- Modal untuk Tag Teknisi -->
<div class="modal fade" id="teknisiModal" tabindex="-1" aria-labelledby="teknisiModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="teknisiModalLabel">Tag Teknisi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="teknisi_id" class="form-label">Pilih Teknisi</label>
                    <select id="teknisi_id" class="form-select">
                        <option value="" disabled selected>Pilih Teknisi</option>
                        @foreach ($teknisi as $staff)
                            <option value="{{ $staff['id'] }}">{{ $staff['name'] }}</option>
                        @endforeach
                    </select>
                </div>
                <button type="button" id="btn-tambah-teknisi" class="btn btn-primary">Tambah Teknisi</button>
                <table class="table mt-3" id="daftar-teknisi">
                    <thead>
                        <tr>
                            <th>Nama Teknisi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Baris teknisi yang dipilih akan ditambahkan di sini -->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" id="btn-simpan-teknisi" class="btn btn-primary">Simpan</button>
            </div>
        </div>
    </div>
</div>
{{-- End Modal Tag Teknisi --}}

{{-- Modal Tag Helper Teknisi --}}
<div class="modal fade" id="helperModal" tabindex="-1" aria-labelledby="helperModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="helperModalLabel">Tag Helper</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="helper_id" class="form-label">Pilih Helper</label>
                    <select id="helper_id" class="form-select">
                        <option value="" disabled selected>Pilih Helper</option>
                        @foreach ($helper as $staff)
                            <option value="{{ $staff['id'] }}">{{ $staff['name'] }}</option>
                        @endforeach
                    </select>
                </div>
                <button type="button" id="btn-tambah-helper" class="btn btn-primary">Tambah Helper</button>
                <table class="table mt-3" id="daftar-helper">
                    <thead>
                        <tr>
                            <th>Nama Helper</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Baris helper yang dipilih akan ditambahkan di sini -->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" id="btn-simpan-helper" class="btn btn-primary">Simpan</button>
            </div>
        </div>
    </div>
</div>
{{-- End Modal Tag Helper Teknisi --}}