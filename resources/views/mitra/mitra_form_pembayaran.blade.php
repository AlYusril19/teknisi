@extends('layouts.app_sneat_mitra')

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

<div class="row">
    {{-- form input pembayaran --}}
    <div class="col-xl">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <a href="{{ route('penagihan-mitra.index') }}">
                    <button class="btn btn-secondary me-2">Back</button>
                </a>
                <h5 class="mb-0">Form Pembayaran</h5>
            </div>
            <div class="card-body">
                <form method="POST" action="{{ route('pembayaran-mitra.store') }}" enctype="multipart/form-data">
                    @csrf
                    {{-- @method('PUT') --}}
                    <input type="hidden" id="penagihan_id" name="penagihan_id" value="{{ $id }}" readonly>
                    <div class="mb-3">
                        <label class="form-label" for="totalTagihan">Total Tagihan</label>
                        <div class="input-group input-group-merge"></div>
                        <input type="text" class="form-control" id="totalTagihan" name="totalTagihan" value="{{ formatRupiah($totalTagihan) }}" readonly>
                    </div>
                    @if ($pembayaran->isNotEmpty())
                        <div class="mb-3">
                            <label class="form-label" for="totalTagihan">Sudah di Bayar</label>
                            <input type="text" class="form-control" id="totalTagihan" name="totalTagihan" value="{{ formatRupiah($totalBayar) }}" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="totalTagihan">Sisa Tagihan</label>
                            <input type="text" class="form-control" id="totalTagihan" name="totalTagihan" value="{{ formatRupiah($totalTagihan - $totalBayar) }}" readonly>
                        </div>
                    @endif
                    @if ($totalTagihan - $totalBayar != 0)
                        <div class="mb-3">
                            <label class="form-label" for="name">Jumlah Dibayar</label>
                            <input type="number" class="form-control" id="jumlah_dibayar" name="jumlah_dibayar" value="{{ $totalTagihan - $totalBayar }}" min="1" max="{{ $totalTagihan - $totalBayar }}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="name">Tanggal Pembayaran</label>
                            <input type="date" class="form-control" id="tanggal_bayar" name="tanggal_bayar" value="{{ date('Y-m-d') }}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="catatan">Catatan</label>
                            <textarea class="form-control" id="catatan" name="catatan" placeholder="Catatan (opsional)"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="foto">Upload Bukti <br><span class="text-muted">(Max: 5MB)</span></label>
                            <input type="file" class="form-control" name="foto" id="foto" accept="image/*" onchange="previewAndCompressImages()" required>
                        </div>
                        <!-- Tempat untuk menampilkan jajaran pratinjau gambar -->
                        <div id="imagePreview" class="image-preview"></div>

                        <div class="mt-4">
                            <button type="submit" class="btn btn-primary me-2">Simpan</button>
                            <button type="reset" class="btn btn-outline-secondary" onclick="resetImagePreview()">Batal</button>
                        </div>
                    @endif
                </form>
            </div>
        </div>
    </div>

    {{-- tabel pembayaran --}}
    <div class="col-xl">
        {{-- tabel pembayaran --}}
        @if ($listPembayaran->isNotEmpty())
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Tabel History Pembayaran</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <caption class="ms-4">
                                Data Pembayaran
                            </caption>
                            <thead>
                                <tr align="center">
                                    <th width="5%">No</th>
                                    <th>Tanggal</th>
                                    <th>Nominal</th>
                                    <th>status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0">
                                @foreach($listPembayaran as $data)
                                    <tr>
                                        <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                        <td>{{ $data->tanggal_bayar }}</td>
                                        <td align="right">{{ formatRupiah($data->jumlah_dibayar) }}</td>
                                        <td align="center">
                                            <div class="d-flex align-items-center justify-content-center">
                                                @if ($data->bukti_bayar != null)
                                                    <ul class="list-unstyled m-0 me-2 avatar-group d-flex align-items-center">
                                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up">
                                                            <img src="{{ asset('storage/' . $data->bukti_bayar) }}" alt="Gambar" class="rounded-circle" style="cursor: pointer;" onclick="openImageModal('{{ asset('storage/' . $data->bukti_bayar) }}')">
                                                        </li>
                                                    </ul>
                                                @endif
                                                @if ($data->status === 'pending')
                                                    <span class="badge bg-warning rounded-pill">Pending</span>
                                                @elseif($data->status === 'cancel')
                                                    <span class="badge bg-danger rounded-pill">Cancel</span>
                                                @else
                                                    ✅ {{ $data->tanggal_konfirmasi }}
                                                @endif
                                            </div>
                                        </td>
                                        <td align="center">
                                            <div class="dropdown">
                                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i class="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div class="dropdown-menu">
                                                    {{-- <a class="dropdown-item" href="{{ route('laporan-admin.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                                    @if ($data->tanggal_konfirmasi === null)
                                                        <form action="{{ route('pembayaran-mitra.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i> Delete</button>
                                                        </form>
                                                    @endif
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
        @endif
    </div>
</div>

<!-- Modal untuk menampilkan gambar -->
<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="imageModalLabel">Bukti Bayar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img id="modalImage" src="" alt="bukti bayar" class="img-fluid">
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')
{{-- preview bukti bayar --}}
<script>
    // Fungsi untuk mempratinjau dan mengompres gambar
    function previewAndCompressImages() {
        var preview = document.getElementById('imagePreview');
        var input = document.getElementById('foto');
        var files = input.files;

        // Hapus pratinjau gambar lama
        preview.innerHTML = '';

        // Jika tidak ada file yang dipilih, keluar dari fungsi
        if (files.length === 0) {
            return;
        }

        // Ambil file pertama
        var file = files[0];

        // Cek ukuran file
        if (file.size <= 350 * 1024) {
            // Jika ukuran file sudah sesuai, tampilkan pratinjau
            addFileToPreviewAndSelected(file);
        } else {
            // Buat FileReader untuk membaca file
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.src = e.target.result;
                img.onload = function() {
                    // Buat canvas untuk mengompres gambar
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');

                    // Atur ukuran canvas
                    var maxWidth = 800; // Atur lebar maksimum
                    var maxHeight = 800; // Atur tinggi maksimum
                    var width = img.width;
                    var height = img.height;

                    // Hitung rasio untuk menjaga proporsi
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    // Atur ukuran canvas
                    canvas.width = width;
                    canvas.height = height;

                    // Gambar gambar ke canvas
                    ctx.drawImage(img, 0, 0, width, height);

                    // Mengonversi canvas ke data URL
                    canvas.toBlob(function(blob) {
                        // Buat file baru dari blob
                        var compressedFile = new File([blob], file.name, { type: file.type });

                        // Tampilkan pratinjau gambar yang sudah dikompres
                        addFileToPreviewAndSelected(compressedFile);
                    }, file.type, 0.7); // 0.7 adalah kualitas kompresi
                };
            };
            reader.readAsDataURL(file);
        }
    }

    // Fungsi untuk menambahkan file ke pratinjau
    function addFileToPreviewAndSelected(file) {
        var preview = document.getElementById('imagePreview');
        var img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.width = '200px'; // Atur lebar pratinjau
        img.style.height = 'auto'; // Atur tinggi otomatis
        preview.appendChild(img);
    }

    function resetImagePreview() {
        document.getElementById('imagePreview').innerHTML = "";
    }
</script>

{{-- gambar bukti bayar --}}
<script>
    function openImageModal(imageSrc) {
        // Set the src of the image inside the modal to the clicked image
        document.getElementById('modalImage').src = imageSrc;
        // Show the modal
        var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    }
</script>

@endsection
