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
                                <option value="{{ $laporan->jenis_kegiatan }}">{{ $laporan->jenis_kegiatan }}</option>
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
                                    <option value="{{ $b['id'] }}">{{ $b['nama_barang'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <button type="button" id="btn-tambah-barang" class="btn btn-primary">Tambah Barang</button>
                        </div>
                    </div>

                    <!-- Tabel Barang yang Ditambahkan -->
                    <div class="row mb-3">
                        <div class="table-responsive col-sm-12">
                            <table class="table table-bordered" id="daftar-barang">
                                <thead>
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>Jumlah</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Tampilkan barang yang sudah ada dari JSON -->
                                    @if($barangKeluarView)
                                        @foreach($barangKeluarView as $barang)
                                            <tr data-barang-id="{{ $barang['id'] }}">
                                                <td>{{ $barang['nama'] }}</td>
                                                <td>
                                                    <div class="input-group">
                                                        <button type="button" class="btn btn-secondary btn-kurang-barang">-</button>
                                                        <input type="number" class="form-control jumlah-barang-input text-center" value="{{ $barang['jumlah'] ?? 1 }}" min="1" style="max-width: 60px;">
                                                        <button type="button" class="btn btn-secondary btn-tambah-barang">+</button>
                                                    </div>
                                                    <input type="hidden" name="barang_ids[]" value="{{ $barang['id'] }}">
                                                    <input type="hidden" name="jumlah[]" value="{{ $barang['jumlah'] }}">
                                                </td>
                                                <td>
                                                    <button type="button" class="btn btn-danger btn-hapus-barang">Hapus</button>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @endif
                                </tbody>
                            </table>
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
                        <label class="col-sm-2 col-form-label" for="fotos">Dokumentasi Foto</label>
                        <div class="col-sm-10">
                            <input type="file" name="fotos[]" id="fotos" multiple accept="image/*" onchange="previewImages()">
                        </div>
                    </div>
                    <div id="imagePreview" class="image-preview">
                        @foreach ($laporan->galeri as $foto)
                            <div class="image-container">
                                <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi" width="150px">
                                <button class="delete-btn" type="button" onclick="deleteImage({{ $foto->id }})">×</button>
                            </div>
                        @endforeach
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
                            <input type="number" class="form-control jumlah-barang-input" value="{{ $barang['jumlah'] ?? 1 }}" min="1" style="width: 80px; display: inline-block;">
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

        // Event listener for manual input
        $(document).on('input', '.jumlah-barang-input', function() {
            var row = $(this).closest('tr');
            var newValue = parseInt($(this).val());
            
            if (newValue >= 1) {  // Ensure the input is at least 1
                row.find('.jumlah-barang').text(newValue);
                row.find('input[name="jumlah[]"]').val(newValue);
            } else {
                $(this).val(1);  // Reset to 1 if the value is invalid
            }
        });

        // Function to increase jumlah
        $(document).on('click', '.btn-tambah-barang', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input');
            var currentJumlah = parseInt(input.val());
            input.val(currentJumlah + 1).trigger('input');  // Update input field and trigger input event
        });

        // Function to decrease jumlah
        $(document).on('click', '.btn-kurang-barang', function() {
            var row = $(this).closest('tr');
            var input = row.find('.jumlah-barang-input');
            var currentJumlah = parseInt(input.val());
            if (currentJumlah > 1) {
                input.val(currentJumlah - 1).trigger('input');  // Update input field and trigger input event
            }
        });
    });
</script>
<script>
    let selectedFiles = new DataTransfer();

    function previewImages() {
        var preview = document.getElementById('imagePreview');
        var input = document.getElementById('fotos');
        var files = input.files;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            selectedFiles.items.add(file);

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

                // Event untuk menghapus gambar pratinjau
                deleteButton.onclick = function() {
                    for (let j = 0; j < selectedFiles.items.length; j++) {
                        if (file.name === selectedFiles.items[j].getAsFile().name) {
                            selectedFiles.items.remove(j);
                            break;
                        }
                    }

                    input.files = selectedFiles.files;
                    container.remove();
                };

                container.appendChild(deleteButton);
                preview.appendChild(container);
            };

            reader.readAsDataURL(file);
        }

        input.files = selectedFiles.files;
    }

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

@endsection