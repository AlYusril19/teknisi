@extends('layouts.app_sneat')

<style>
    .image-container {
        position: relative;
        display: inline-block;
        margin: 10px;
    }

    .image-container img {
        width: 150px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .delete-image-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(255, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .delete-image-btn:hover {
        background: rgba(255, 0, 0, 1);
    }

    #imagePreview {
        display: flex;
        flex-wrap: wrap;
    }
</style>

<style>
    .image-container {
        position: relative; /* Agar elemen anak bisa diposisikan secara absolut */
    }

    .delete-btn {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(255, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
</style>
<style>
    .input-group {
        display: flex;
        align-items: center;
        gap: 5px; /* Jarak antar elemen */
    }

    .input-group .form-control {
        text-align: center;
        padding: 5px;
        max-width: 60px; /* Sesuaikan dengan lebar input */
    }

</style>

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

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="barang">Barang Keluar</label>
                        <div class="col-sm-10">
                            <!-- Tombol untuk memunculkan modal -->
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#barangModal">
                                <i class="menu-icon tf-icons bx bx-cart"></i>
                                <span class="badge badge-center rounded-pill bg-primary w-px-20 h-px-20" id="total-barang">0</span>
                            </button>
                        </div>
                    </div>

                    <!-- Modal untuk Tabel Barang dan Pilihan Barang -->
                    <!-- Tabel Barang yang Ditambahkan -->
                    <div class="modal fade" id="barangModal" tabindex="-1" aria-labelledby="barangModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="barangModalLabel">Daftar Barang</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- Barang Selection -->
                                    <div class="row d-flex align-items-center">
                                        <div class="col-sm-2 mb-2">
                                            <label class="col-form-label" for="barang_id">Barang</label>
                                        </div>
                                        <div class="col-sm-8 mb-2">
                                            <select name="barang_id" id="barang_id" class="form-control">
                                                <option value="">Pilih Barang</option>
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
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="keterangan_kegiatan">Alamat</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="alamat_kegiatan" name="alamat_kegiatan" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="fotos">Dokumentasi Foto</label>
                        <div class="col-sm-10">
                            {{-- <input type="file" class="form-control" id="fotos" name="fotos[]" multiple> --}}
                            <input type="file" name="fotos[]" id="fotos" multiple accept="image/*" onchange="previewImages()">
                        </div>
                    </div>
                    <!-- Tempat untuk menampilkan jajaran pratinjau gambar -->
                    <div id="imagePreview" class="image-preview"></div>

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
{{-- get today --}}
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

{{-- Barang Keluar --}}
<script>
    $(document).ready(function() {
        // Function to update total barang count
        function updateTotalBarang() {
            var totalBarang = 0;
            $('#daftar-barang tbody tr').each(function() {
                var jumlah = parseInt($(this).find('.jumlah-barang-input').val());
                console.log('Jumlah:', jumlah); // Log untuk melihat apakah nilainya benar
                totalBarang += jumlah;
            });
            console.log('Total Barang:', totalBarang); // Log untuk melihat total yang dihitung
            $('#total-barang').text(totalBarang);
        }
        
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
                        var currentJumlah = parseInt($(this).find('.jumlah-barang-input').val());
                        $(this).find('.jumlah-barang-input').val(currentJumlah + 1).trigger('input');
                        return false;
                    }
                });

                // If barang is not already added, append to table
                if (!exists) {
                    var row = `<tr data-barang-id="${barangId}">
                        <td>${barangNama}</td>
                        <td>
                            <div class="input-group">
                                <button type="button" class="btn btn-secondary btn-kurang-barang">-</button>
                                <input type="number" class="form-control jumlah-barang-input" value="1" min="1" style="width: 80px; display: inline-block;">
                                <button type="button" class="btn btn-secondary btn-tambah-barang">+</button>
                            </div>
                            <input type="hidden" name="barang_ids[]" value="${barangId}">
                            <input type="hidden" name="jumlah[]" value="${jumlah}">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-hapus-barang">Hapus</button>
                        </td>
                    </tr>`;
                    $('#daftar-barang tbody').append(row);
                    updateTotalBarang();
                }
            } else {
                alert('Pilih barang terlebih dahulu!');
            }
        });

        // Function to remove barang from the list
        $(document).on('click', '.btn-hapus-barang', function() {
            $(this).closest('tr').remove();
            updateTotalBarang();
        });

        // Event listener for manual input
        $(document).on('input', '.jumlah-barang-input', function() {
            var row = $(this).closest('tr');
            var newValue = parseInt($(this).val());
            
            if (newValue >= 1) {
                row.find('input[name="jumlah[]"]').val(newValue);
                updateTotalBarang();
            } else {
                $(this).val(1);
                updateTotalBarang();
            }
        });

        // Function to increase jumlah
        $(document).on('click', '.btn-tambah-barang', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input');
            var currentJumlah = parseInt(input.val());
            input.val(currentJumlah + 1).trigger('input');
            updateTotalBarang();
        });

        // Function to decrease jumlah
        $(document).on('click', '.btn-kurang-barang', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input');
            var currentJumlah = parseInt(input.val());
            if (currentJumlah > 1) {
                input.val(currentJumlah - 1).trigger('input');
                updateTotalBarang();
            } else {
                // Optional: Remove the row if jumlah reaches 1
                $(this).closest('tr').remove();
                updateTotalBarang();
            }
        });

        // Function to handle modal save button
        $('#btn-simpan-barang').on('click', function() {
            // Logic to save the data (if necessary)
            $('#barangModal').modal('hide'); // Close the modal
        });
        updateTotalBarang();
    });
</script>

{{-- foto dokumentasi --}}
<script>
    // Inisialisasi DataTransfer untuk menyimpan file yang dipilih
    let selectedFiles = new DataTransfer();

    function previewImages() {
        var preview = document.getElementById('imagePreview');
        var input = document.getElementById('fotos');
        var files = input.files;

        // Loop melalui file yang baru dipilih
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            // Tambahkan file ke DataTransfer
            selectedFiles.items.add(file);

            // Buat pratinjau gambar
            var reader = new FileReader();
            reader.onload = function(e) {
                var container = document.createElement('div');
                container.classList.add('image-container');

                var img = document.createElement('img');
                img.src = e.target.result;
                container.appendChild(img);

                var deleteButton = document.createElement('button');
                deleteButton.textContent = '×';
                deleteButton.classList.add('delete-image-btn');

                // Event untuk menghapus gambar
                deleteButton.onclick = function() {
                    // Hapus file dari DataTransfer
                    for (let j = 0; j < selectedFiles.items.length; j++) {
                        if (file.name === selectedFiles.items[j].getAsFile().name) {
                            selectedFiles.items.remove(j);
                            break;
                        }
                    }

                    // Update input files
                    input.files = selectedFiles.files;

                    // Hapus pratinjau gambar
                    container.remove();
                };

                container.appendChild(deleteButton);
                preview.appendChild(container);
            };

            reader.readAsDataURL(file);
        }

        // Update input files dengan file yang sudah ditambahkan
        input.files = selectedFiles.files;
    }
</script>

@endsection
