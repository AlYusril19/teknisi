@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    @include('admin.navbar_laporan_admin')
    <div class="card mt-3">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Laporan Kerja</h5>
            {{-- <a href="{{ route('laporan-admin.create') }}" class="btn btn-primary mb-0">Buat Laporan</a> --}}
            <form action="{{ route('laporan-admin.index') }}" method="GET">
                <div class="input-group">
                    <input type="text" name="search" class="form-control me-2" placeholder="Cari Barang" value="{{ request('search') }}">
                    <button type="submit" class="btn btn-primary">Cari</button>
                    <select name="filter" class="form-select" onchange="this.form.submit()">
                        <option value="">Semua Laporan</option>
                        <option value="lembur" {{ request('filter') == 'lembur' ? 'selected' : '' }}>Laporan Lembur</option>
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
                        <th>Teknisi</th>
                        <th>Tanggal</th>
                        <th>Jenis</th>
                        <th>Kegiatan</th>
                        <th>status</th>
                        <th>Jam Kerja</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    @foreach($laporan as $data)
                        <tr>
                            <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                            <td align="center">{{ $data->user['name'] ?? '-' }}</td>
                            <td>{{ $data->tanggal_kegiatan }}</td>
                            <td>{{ $data->jenis_kegiatan }}</td>
                            <td>{{ $data->keterangan_kegiatan }}</td>
                            <td align="center">
                                <span class="badge bg-label-{{ $data->status === 'draft' ? 'primary' : ($data->status === 'pending' ? 'warning' : 'success') }}">{{ $data->status ?? 'null' }}</span>
                            </td>
                            <td>{{ formatTime($data->jam_mulai) }} - {{  formatTime($data->jam_selesai) }}</td>
                            <td align="center">
                                <div class="dropdown">
                                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        {{-- <a class="dropdown-item" href="{{ route('laporan-admin.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#laporanModal" data-id="{{ $data->id }}">
                                            Show
                                        </button>
                                        {{-- <a class="dropdown-item" href="{{ route('laporan-admin.edit', $data->id) }}"><i class="bx bx-edit-alt me-2"></i> Edit</a> --}}
                                        {{-- <form action="{{ route('laporan-admin.destroy', $data->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus data ini?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="dropdown-item"><i class="bx bx-trash me-1"></i> Delete</button>
                                        </form> --}}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    {{-- <div class="row">
        <div class="col-sm-12">
            <div class="card">
                {{ $laporan->links() }}
            </div>
        </div>
    </div> --}}
    {{-- <hr class="my-12"> --}}
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
        <p><strong>Tanggal:</strong> <span id="laporanTanggal"></span></p>
        <p><strong>Jenis Kegiatan:</strong> <span id="laporanJenis"></span></p>
        <p><strong>Keterangan Kegiatan:</strong> <span id="laporanKeterangan"></span></p>
        <p><strong>Jam Mulai:</strong> <span id="laporanJamMulai"></span></p>
        <p><strong>Jam Selesai:</strong> <span id="laporanJamSelesai"></span></p>

        <!-- Daftar Barang -->
        <h6 class="mb-0">Daftar Barang</h6>
        <ul id="laporanBarang"></ul>

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
        fetch(`/laporan-admin/${laporanId}`)
            .then(response => response.json())
            .then(data => {
                // Isi data laporan
                document.getElementById('laporanUser').textContent = data.laporan.user.name;
                document.getElementById('laporanTanggal').textContent = data.laporan.tanggal_kegiatan;
                document.getElementById('laporanJenis').textContent = data.laporan.jenis_kegiatan;
                document.getElementById('laporanKeterangan').textContent = data.laporan.keterangan_kegiatan;
                document.getElementById('laporanJamMulai').textContent = timeFormat(data.laporan.jam_mulai);
                document.getElementById('laporanJamSelesai').textContent = timeFormat(data.laporan.jam_selesai);

                // Isi daftar barang
                var barangList = document.getElementById('laporanBarang');
                barangList.innerHTML = '';
                data.barangKeluarView.forEach(function(barang) {
                    var li = document.createElement('li');
                    li.textContent = `${barang.nama} | ${barang.jumlah}x`;
                    barangList.appendChild(li);
                });

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