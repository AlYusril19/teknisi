@extends('layouts.app_sneat')

@section('content')
{{-- <h5 class="pb-1 mb-6">Data Peserta</h5> --}}
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        {{-- <h5 class="mb-0">Daftar Laporan Kerja</h5> --}}
        <a href="{{ route('laporan.create') }}" class="btn btn-primary mb-0">Buat Laporan</a>
        <form action="{{ route('laporan.index') }}" method="GET">
            <div class="input-group">
                <input type="text" name="search" class="form-control" placeholder="jenis / kegiatan" value="{{ request('search') }}">
                <button type="submit" class="btn btn-primary me-2"><i class="bx bx-search"></i></button>
                <select name="filter" class="form-select" onchange="this.form.submit()">
                    <option value="">Semua Laporan</option>
                    <option value="lembur" {{ request('filter') == 'lembur' ? 'selected' : '' }}>Laporan Lembur</option>
                    {{-- <option value="transport" {{ request('filter') == 'transport' ? 'selected' : '' }}>Kegiatan Keluar</option> --}}
                </select>
            </div>
        </form>
    </div>
    <div class="table-responsive">
        <table class="table">
            <caption class="ms-4">
                Data Laporan
            </caption>
            <thead>
                <tr align="center">
                    <th width="5%">No</th>
                    <th>Tanggal</th>
                    <th>Jenis</th>
                    <th>Kegiatan</th>
                    <th>status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0">
                @foreach($laporan as $data)
                    <tr>
                        <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                        <td>{{ $data->tanggal_kegiatan }}</td>
                        <td>{{ $data->jenis_kegiatan }}</td>
                        <td>
                            {{ $data->keterangan_kegiatan }}
                            @foreach ($data->support as $item)
                                <p class="mb-0 text-primary">&commat;{{ $item['name'] }}</p>
                            @endforeach
                        </td>
                        <td align="center">
                            <span class="badge bg-label-{{ $data->status === 'draft' ? 'primary' : 
                                                        ($data->status === 'pending' ? 'warning' : 
                                                        ($data->status === 'reject' ? 'danger' : 'success')) }}">
                                                        {{ $data->status ?? 'null' }}
                            </span>
                        </td>
                        <td align="center">
                            <div class="dropdown">
                                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                </button>
                                <div class="dropdown-menu">
                                    {{-- <a class="dropdown-item" href="{{ route('laporan.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                    <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#laporanModal" data-id="{{ $data->id }}">
                                        <i class="bx bx-show-alt me-2"></i> Show
                                    </button>
                                    @if ($data->status != 'selesai' && $data->status != 'pending')
                                        <a class="dropdown-item" href="{{ route('laporan.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a>
                                    @endif
                                    @if ($data->status != 'selesai' && $data->status != 'pending')
                                        <form action="{{ route('laporan.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
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

<!-- Modal -->
<div class="modal fade" id="laporanModal" tabindex="-1" aria-labelledby="laporanModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="laporanModalLabel">Detail Laporan Kerja</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Data Laporan -->
        <p><strong>Teknisi:</strong> <span id="laporanUser"></span></p>
        <p id="titleTeknisi" style="display: none;" class="mb-0"><strong>Team Support:</strong> <ul id="laporanTeknisi"></ul></p>
        <p><strong>Tanggal:</strong> <span id="laporanTanggal"></span></p>
        <p><strong>Jenis Kegiatan:</strong> <span id="laporanJenis"></span></p>
        <p><strong>Keterangan Kegiatan:</strong> <span id="laporanKeterangan"></span></p>
        <p><strong>Jam Mulai:</strong> <span id="laporanJamMulai"></span></p>
        <p><strong>Jam Selesai:</strong> <span id="laporanJamSelesai"></span></p>
        <p><strong>Alamat:</strong> <span id="laporanAlamat"></span></p>

        <!-- Daftar Barang -->
        <div class="col-md-6">
            <div class="card h-100 mb-0" id="titleBarang" style="display: none;">
                <h6 class="card-header mb-0">Daftar Barang Keluar</h6>
                <div class="card-body">
                    <ul id="laporanBarang"></ul>
                </div>
            </div>
        </div>

        <!-- Daftar Barang Kembali -->
        <div class="col-md-6">
            <div class="card border-warning mt-1" id="titleBarangKembali" style="display: none;">
                <h6 class="card-header mb-0">Daftar Barang Kembali</h6>
                <div class="card-body">
                    <ul id="laporanBarangKembali"></ul>
                </div>
            </div>
        </div>

        <!-- Galeri Foto -->
        <h6 class="mt-3">Galeri Foto</h6>
        <ul id="laporanGaleri" class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2"></ul>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
{{-- end Modal --}}

{{-- modal image --}}
<!-- Modal untuk gambar besar -->
<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="imageModalLabel">Dokumentasi</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img id="popupImage" src="" alt="Dokumentasi" class="img-fluid">
      </div>
    </div>
  </div>
</div>

{{-- end modal image --}}

@endsection
{{-- Redirect to Chat Whastapp --}}
@if (session('whatsappLink'))
    <script>
        window.open('{{ session('whatsappLink') }}', '_blank');
    </script>
@endif

@section('js')
<script>
    function timeFormat(timeString) {
        // Asumsikan timeString dalam format "HH:MM:SS"
        var timeParts = timeString.split(':');
        var hour = timeParts[0];
        var minute = timeParts[1];
        return `${hour}:${minute}`;  // format 24 jam, hanya jam dan menit
    }
    document.addEventListener('DOMContentLoaded', function () {
        var laporanModal = document.getElementById('laporanModal');
        var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        var popupImage = document.getElementById('popupImage');
        
        laporanModal.addEventListener('show.bs.modal', function (event) {
            // Ambil tombol yang memicu modal
            var button = event.relatedTarget;
            var laporanId = button.getAttribute('data-id');
            
            // Lakukan ajax untuk mengambil data laporan
            fetch(`/laporan/${laporanId}`)
                .then(response => response.json())
                .then(data => {
                    // Isi data laporan
                    document.getElementById('laporanUser').textContent = data.laporan.user.name;
                    document.getElementById('laporanTanggal').textContent = data.laporan.tanggal_kegiatan;
                    document.getElementById('laporanJenis').textContent = data.laporan.jenis_kegiatan;
                    document.getElementById('laporanKeterangan').textContent = data.laporan.keterangan_kegiatan;
                    document.getElementById('laporanJamMulai').textContent = timeFormat(data.laporan.jam_mulai);
                    document.getElementById('laporanJamSelesai').textContent = timeFormat(data.laporan.jam_selesai);
                    document.getElementById('laporanAlamat').textContent = data.laporan.alamat_kegiatan;

                    // Isi daftar barang keluar
                    var teknisiList = document.getElementById('laporanTeknisi');
                    var titleTeknisi = document.getElementById('titleTeknisi');

                    // Kosongkan list barang
                    teknisiList.innerHTML = '';

                    if (data.teknisi.length > 0) {
                        // Jika ada data barang kembali, tampilkan judul dan list barang
                        titleTeknisi.style.display = 'block';

                        data.teknisi.forEach(function(teknisi) {
                            var li = document.createElement('li');
                            li.textContent = `${teknisi.name}`;
                            teknisiList.appendChild(li);
                        });
                    } else {
                        // Jika tidak ada data barang, sembunyikan judul
                        titleTeknisi.style.display = 'none';
                    }

                    // Isi daftar barang keluar
                    var barangList = document.getElementById('laporanBarang');
                    var titleBarang = document.getElementById('titleBarang');

                    // Kosongkan list barang
                    barangList.innerHTML = '';

                    if (data.barangKeluarView.length > 0) {
                        // Jika ada data barang kembali, tampilkan judul dan list barang
                        titleBarang.style.display = 'block';

                        data.barangKeluarView.forEach(function(barang) {
                            var li = document.createElement('li');
                            li.textContent = `${barang.nama} | x${barang.jumlah} ${barang.satuan}`;
                            barangList.appendChild(li);
                        });
                    } else {
                        // Jika tidak ada data barang, sembunyikan judul
                        titleBarang.style.display = 'none';
                    }

                    // Isi daftar barang kembali
                    var barangList = document.getElementById('laporanBarangKembali');
                    var titleBarangKembali = document.getElementById('titleBarangKembali');

                    // Kosongkan list barang
                    barangList.innerHTML = '';

                    if (data.barangKembaliView.length > 0) {
                        // Jika ada data barang kembali, tampilkan judul dan list barang
                        titleBarangKembali.style.display = 'block';

                        data.barangKembaliView.forEach(function(barang) {
                            var li = document.createElement('li');
                            li.textContent = `${barang.nama} | x${barang.jumlah} ${barang.satuan}`;
                            barangList.appendChild(li);
                        });
                    } else {
                        // Jika tidak ada data barang, sembunyikan judul
                        titleBarangKembali.style.display = 'none';
                    }


                    // Isi galeri foto
                    var galeriList = document.getElementById('laporanGaleri');
                    galeriList.innerHTML = '';
                    data.galeri.forEach(function(foto) {
                        var li = document.createElement('li');
                        li.setAttribute('data-bs-toggle', 'tooltip');
                        li.setAttribute('data-popup', 'tooltip-custom');
                        li.setAttribute('data-bs-placement', 'top');
                        li.setAttribute('aria-label', 'Dokumentasi');
                        li.setAttribute('data-bs-original-title', 'Dokumentasi');
                        li.classList.add('avatar', 'avatar-sm', 'pull-up');

                        var img = document.createElement('img');
                        img.src = `/storage/${foto.file_path}`;
                        img.alt = 'Dokumentasi';
                        img.style.cursor = 'pointer';
                        img.onclick = function() {
                            popupImage.src = img.src;  // Set gambar di modal
                            imageModal.show();  // Tampilkan modal
                        };

                        li.appendChild(img);
                        galeriList.appendChild(li);
                    });
                });
        });
    });
</script>
@endsection