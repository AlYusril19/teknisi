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
                <h5 class="mb-0">Edit Laporan</h5>
                <small class="text-muted float-end">Form Data Laporan</small>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('laporan.update', $laporan->id) }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jenis_kegiatan">Kegiatan</label>
                        <div class="col-sm-10">
                            <select name="jenis_kegiatan" id="jenis_kegiatan" class="form-control">
                                <option value="pemasangan" {{ $laporan->jenis_kegiatan == 'pemasangan' ? 'selected' : '' }}>Pemasangan</option>
                                <option value="perbaikan" {{ $laporan->jenis_kegiatan == 'perbaikan' ? 'selected' : '' }}>Perbaikan</option>
                                <option value="pemutusan" {{ $laporan->jenis_kegiatan == 'pemutusan' ? 'selected' : '' }}>Pemutusan</option>
                                <option value="migrasi" {{ $laporan->jenis_kegiatan == 'migrasi' ? 'selected' : '' }}>Migrasi</option>
                                <option value="project" {{ $laporan->jenis_kegiatan == 'project' ? 'selected' : '' }}>Project</option>
                                <option value="mitra" {{ $laporan->jenis_kegiatan == 'mitra' ? 'selected' : '' }}>Mitra</option> <!-- Opsi mitra -->
                            </select>
                        </div>
                    </div>

                    <!-- Input untuk customer yang disembunyikan -->
                    <!-- Bagian Customer -->
                    <div class="row mb-3" id="customer_row" style="display: none;">
                        <label class="col-sm-2 col-form-label" for="customer_id">Customer</label>
                        <div class="col-sm-10">
                            <select name="customer_id" id="customer_id" class="form-control">
                                @foreach($customers as $cust)
                                    <option value="{{ $cust['id'] }}" {{ $laporan->customer_id == $cust['id'] ? 'selected' : '' }}>
                                        {{ $cust['nama'] }}
                                    </option>
                                @endforeach
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
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="barang">Barang Kembali</label>
                        <div class="col-sm-10">
                            <!-- Tombol untuk memunculkan modal -->
                            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#barangKembaliModal">
                                <i class="menu-icon tf-icons bx bx-cart"></i>
                                <span class="badge badge-center rounded-pill bg-danger w-px-20 h-px-20" id="total-barang-kembali">0</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Tanggal, Jam, Keterangan -->
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="tanggal_kegiatan">Tanggal Kegiatan</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="tanggal_kegiatan" name="tanggal_kegiatan" value="{{ $laporan->tanggal_kegiatan }}" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_mulai">Jam Mulai</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="jam_mulai" name="jam_mulai" value="{{ $laporan->jam_mulai }}" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="jam_selesai">Jam Selesai</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="jam_selesai" name="jam_selesai" value="{{ $laporan->jam_selesai }}" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="keterangan_kegiatan">Keterangan</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="keterangan_kegiatan" name="keterangan_kegiatan" required>{{ $laporan->keterangan_kegiatan }}</textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="alamat_kegiatan">Alamat</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="alamat_kegiatan" name="alamat_kegiatan" value="{{ $laporan->alamat_kegiatan }}" required>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="teknisi">Tag Teknisi</label>
                        <div class="col-sm-10">
                            <!-- Tombol untuk memunculkan modal -->
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#teknisiModal">
                                <i class="menu-icon tf-icons bx bx-user"></i>
                                <span class="badge badge-center rounded-pill bg-primary w-px-20 h-px-20" id="total-teknisi">0</span>
                            </button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="helper">Tag Helper</label>
                        <div class="col-sm-10">
                            <!-- Tombol untuk memunculkan modal -->
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#helperModal">
                                <i class="menu-icon tf-icons bx bx-user"></i>
                                <span class="badge badge-center rounded-pill bg-primary w-px-20 h-px-20" id="total-helper">0</span>
                            </button>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="fotos">Upload Gambar <br><span class="text-muted">(Max: 5MB)</span></label>
                        <div class="col-sm-10">
                            <input type="file" name="fotos[]" id="fotos" multiple accept="image/*" onchange="previewAndCompressImages()">
                            {{-- <div id="imagePreview" class="d-flex flex-wrap"></div> --}}
                        </div>
                    </div>
                    <div id="imagePreview" class="image-preview"></div>
                    <div id="imagePreview" class="image-preview">
                        @foreach ($laporan->galeri as $foto)
                            <div class="image-container">
                                <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi" width="150px">
                                <button class="delete-btn" type="button" onclick="deleteImage({{ $foto->id }})">×</button>
                            </div>
                        @endforeach
                    </div>

                    <div class="mt-4">
                        @if ($laporan->user_id === session('user_id'))
                            <button type="submit" name="status" value="pending" class="btn btn-primary me-2">Post</button>
                        @endif
                        <button type="submit" name="status" value="draft" class="btn btn-secondary me-2">Draft</button>
                        {{-- <button type="reset" class="btn btn-outline-secondary">Batal</button> --}}
                    </div>
                    @include('teknisi.modal_laporan_kerja_edit')
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')

{{-- barang keluar --}}
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

{{-- barang Kembali --}}
<script>
    $(document).ready(function() {
        // Function to update total barang kembali count
        function updateTotalBarangKembali() {
            var totalBarangKembali = 0;
            $('#daftar-barang-kembali tbody tr').each(function() {
                var jumlah = parseInt($(this).find('.jumlah-barang-input-kembali').val());
                totalBarangKembali += jumlah;
            });
            $('#total-barang-kembali').text(totalBarangKembali);
        }

        // Add barang kembali to the list
        $('#btn-tambah-barang-kembali').on('click', function() {
            var barangKembaliId = $('#barang_kembali_id').val();
            var barangKembaliNama = $('#barang_kembali_id option:selected').text();
            var jumlahKembali = 1; // Default jumlah awal

            console.log("Barang Kembali ID: " + barangKembaliId);
            console.log("Barang Kembali Nama: " + barangKembaliNama);

            if (barangKembaliId) {
                // Check if the barang kembali is already added
                var exists = false;
                $('#daftar-barang-kembali tbody tr').each(function() {
                    if ($(this).data('barang-id') == barangKembaliId) {
                        exists = true;
                        var currentJumlah = parseInt($(this).find('.jumlah-barang-input-kembali').val());
                        $(this).find('.jumlah-barang-input-kembali').val(currentJumlah + 1).trigger('input');
                        return false;
                    }
                });

                // If barang kembali is not already added, append to table
                if (!exists) {
                    var row = `<tr data-barang-id="${barangKembaliId}">
                        <td>${barangKembaliNama}</td>
                        <td>
                            <div class="input-group">
                                <button type="button" class="btn btn-secondary btn-kurang-barang-kembali">-</button>
                                <input type="number" class="form-control jumlah-barang-input-kembali" value="1" min="1" style="width: 80px; display: inline-block;">
                                <button type="button" class="btn btn-secondary btn-tambah-barang-kembali">+</button>
                            </div>
                            <input type="hidden" name="barang_kembali_ids[]" value="${barangKembaliId}">
                            <input type="hidden" name="jumlah_kembali[]" value="${jumlahKembali}">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger btn-hapus-barang-kembali">Hapus</button>
                        </td>
                    </tr>`;
                    $('#daftar-barang-kembali tbody').append(row);
                    updateTotalBarangKembali();
                }
            } else {
                alert('Pilih barang kembali terlebih dahulu!');
            }
        });

        // Function to remove barang kembali from the list
        $(document).on('click', '.btn-hapus-barang-kembali', function() {
            $(this).closest('tr').remove();
            updateTotalBarangKembali();
        });

        // Event listener for manual input
        $(document).on('input', '.jumlah-barang-input-kembali', function() {
            var row = $(this).closest('tr');
            var newValue = parseInt($(this).val());
            
            if (newValue >= 1) {
                row.find('input[name="jumlah_kembali[]"]').val(newValue);
                updateTotalBarangKembali();
            } else {
                $(this).val(1);
                updateTotalBarangKembali();
            }
        });

        // Function to increase jumlah barang kembali
        $(document).on('click', '.btn-tambah-barang-kembali', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input-kembali');
            var currentJumlah = parseInt(input.val());
            input.val(currentJumlah + 1).trigger('input');
            updateTotalBarangKembali();
        });

        // Function to decrease jumlah barang kembali
        $(document).on('click', '.btn-kurang-barang-kembali', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input-kembali');
            var currentJumlah = parseInt(input.val());
            if (currentJumlah > 1) {
                input.val(currentJumlah - 1).trigger('input');
                updateTotalBarangKembali();
            } else {
                // Optional: Remove the row if jumlah reaches 1
                $(this).closest('tr').remove();
                updateTotalBarangKembali();
            }
        });

        // Function to handle modal save button
        $('#btn-simpan-barang-kembali').on('click', function() {
            // Logic to save the data (if necessary)
            $('#barangKembaliModal').modal('hide'); // Close the modal
        });
        // Update total on page load
        updateTotalBarangKembali();
    });

</script>

{{-- image Preview --}}
    <script>
        // Inisialisasi DataTransfer untuk menyimpan file yang dipilih
        let selectedFiles = new DataTransfer();

        // Fungsi untuk mempratinjau dan kompres gambar
        function previewAndCompressImages() {
            var preview = document.getElementById('imagePreview');
            var input = document.getElementById('fotos');
            var files = input.files;

            // Loop melalui file yang baru dipilih
            for (let i = 0; i < files.length; i++) {
                let file = files[i];

                // Jika ukuran file di bawah 350KB, tambahkan langsung tanpa kompresi
                if (file.size <= 350 * 1024) {
                    addFileToPreviewAndSelected(file);
                } else {
                    // Buat FileReader untuk membaca file
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var img = new Image();
                        img.src = e.target.result;

                        img.onload = function() {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');

                            var width = img.width;
                            var height = img.height;
                            var maxDimension = 1024;

                            // Resize gambar jika lebih besar dari maxDimension
                            if (width > height) {
                                if (width > maxDimension) {
                                    height = Math.round((height *= maxDimension / width));
                                    width = maxDimension;
                                }
                            } else {
                                if (height > maxDimension) {
                                    width = Math.round((width *= maxDimension / height));
                                    height = maxDimension;
                                }
                            }

                            // Atur ukuran canvas
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);

                            // Fungsi untuk kompresi bertahap hingga ukuran di bawah 350kB
                            function compressImage(quality, callback) {
                                canvas.toBlob(function(blob) {
                                    if (blob.size <= 350 * 1024 || quality <= 0.1) {
                                        var compressedFile = new File([blob], file.name, { type: file.type });
                                        callback(compressedFile);
                                    } else {
                                        compressImage(quality - 0.05, callback);
                                    }
                                }, file.type, quality);
                            }

                            // Kompres gambar dengan kualitas awal 0.9
                            compressImage(0.9, function(compressedFile) {
                                addFileToPreviewAndSelected(compressedFile);
                            });
                        };
                    };

                    reader.readAsDataURL(file);
                }
            }
        }

        // Fungsi untuk menambahkan file ke pratinjau dan DataTransfer
        function addFileToPreviewAndSelected(file) {
            // Tambahkan file ke DataTransfer
            selectedFiles.items.add(file);

            // Update input files dengan gambar yang terkompres
            document.getElementById('fotos').files = selectedFiles.files;

            // Buat pratinjau gambar
            var preview = document.getElementById('imagePreview');
            var container = document.createElement('div');
            container.classList.add('image-container');

            var img = document.createElement('img');
            img.src = URL.createObjectURL(file);
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
                document.getElementById('fotos').files = selectedFiles.files;

                // Hapus pratinjau gambar
                container.remove();
            };

            container.appendChild(deleteButton);
            preview.appendChild(container);
        }
    </script>

{{-- Delete Image --}}
<script>
    // Fungsi untuk menghapus gambar yang sudah ada di database
    function deleteImage(imageId) {
        fetch(`/delete-image/${imageId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}',  // Token CSRF untuk keamanan
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Hapus elemen gambar dari DOM
                document.querySelector(`button[onclick="deleteImage(${imageId})"]`).parentElement.remove();
            } else {
                alert('Gagal menghapus gambar: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
</script>

{{-- get mitra (customer) --}}
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const jenisKegiatan = document.getElementById('jenis_kegiatan');
        const customerRow = document.getElementById('customer_row');

        // Fungsi untuk menampilkan atau menyembunyikan input customer
        function toggleCustomerInput() {
            if (jenisKegiatan.value === 'mitra') {
                customerRow.style.display = 'block';
            } else {
                customerRow.style.display = 'none';
            }
        }

        // Jalankan saat halaman pertama kali dimuat
        toggleCustomerInput();

        // Jalankan saat jenis kegiatan diubah
        jenisKegiatan.addEventListener('change', function () {
            toggleCustomerInput();
        });
    });
</script>

{{-- select2 modal --}}
<script>
    // Inisialisasi Select2 di dalam modal
    $('#barangModal').on('shown.bs.modal', function () {
        $('#barang_id').select2({
            dropdownParent: $('#barangModal')
        });
    });
    $('#barangKembaliModal').on('shown.bs.modal', function () {
        $('#barang_kembali_id').select2({
            dropdownParent: $('#barangKembaliModal')
        });
    });
</script>

{{-- tag teknisi --}}
<script>
    $(document).ready(function () {
        // Update daftar teknisi yang sudah di-tag saat halaman dimuat
        function updateDaftarTeknisi() {
            var totalTeknisi = 0;
            $('#daftar-teknisi tbody tr').each(function () {
                totalTeknisi++;
            });
            $('#total-teknisi').text(totalTeknisi);
        }

        // Tambah teknisi ke daftar
        $('#btn-tambah-teknisi').on('click', function () {
            var teknisiId = $('#teknisi_id').val();
            var teknisiNama = $('#teknisi_id option:selected').text();

            if (teknisiId) {
                // Cek apakah teknisi sudah ada di daftar
                var exists = false;
                $('#daftar-teknisi tbody tr').each(function () {
                    if ($(this).data('teknisi-id') == teknisiId) {
                        exists = true;
                        alert('Teknisi sudah ditambahkan!');
                        return false;
                    }
                });

                // Jika teknisi belum ada, tambahkan ke tabel
                if (!exists) {
                    var row = `<tr data-teknisi-id="${teknisiId}">
                        <td>${teknisiNama}</td>
                        <td>
                            <input type="hidden" name="teknisi_ids[]" value="${teknisiId}">
                            <button type="button" class="btn btn-danger btn-hapus-teknisi">Hapus</button>
                        </td>
                    </tr>`;
                    $('#daftar-teknisi tbody').append(row);
                    updateDaftarTeknisi();
                }
            } else {
                alert('Pilih teknisi terlebih dahulu!');
            }
        });

        // Hapus teknisi dari daftar
        $(document).on('click', '.btn-hapus-teknisi', function () {
            $(this).closest('tr').remove();
            updateDaftarTeknisi();
        });

        // Simpan teknisi yang diubah
        $('#btn-simpan-teknisi').on('click', function () {
            $('#teknisiModal').modal('hide'); // Tutup modal
        });

        // Update daftar teknisi pada halaman load
        updateDaftarTeknisi();
    });
</script>

{{-- get tag helper teknisi --}}
<script>
    $(document).ready(function () {
        // Update daftar helper yang sudah di-tag saat halaman dimuat
        function updateDaftarHelper() {
            var totalHelper = 0;
            $('#daftar-helper tbody tr').each(function () {
                totalHelper++;
            });
            $('#total-helper').text(totalHelper);
        }

        // Tambahkan helper ke daftar
        $('#btn-tambah-helper').on('click', function () {
            var helperId = $('#helper_id').val();
            var helperNama = $('#helper_id option:selected').text();

            if (helperId) {
                // Periksa apakah helper sudah ada di daftar
                var exists = false;
                $('#daftar-helper tbody tr').each(function () {
                    if ($(this).data('helper-id') == helperId) {
                        exists = true;
                        return false;
                    }
                });

                // Jika belum ada, tambahkan ke tabel
                if (!exists) {
                    var row = `<tr data-helper-id="${helperId}">
                        <td>${helperNama}</td>
                        <td>
                            <button type="button" class="btn btn-danger btn-hapus-helper">Hapus</button>
                            <input type="hidden" name="helper_ids[]" value="${helperId}">
                        </td>
                    </tr>`;
                    $('#daftar-helper tbody').append(row);
                    updateDaftarHelper()
                } else {
                    alert('Helper sudah ditambahkan!');
                }
            } else {
                alert('Pilih helper terlebih dahulu!');
            }
        });

        // Hapus helper dari daftar
        $(document).on('click', '.btn-hapus-helper', function () {
            $(this).closest('tr').remove();
            updateDaftarHelper()
        });

        // Simpan helper yang ditambahkan
        $('#btn-simpan-helper').on('click', function () {
            $('#helperModal').modal('hide'); // Tutup modal
        });

        // Update daftar helper pada halaman load
        updateDaftarHelper();
    });
</script>

@endsection