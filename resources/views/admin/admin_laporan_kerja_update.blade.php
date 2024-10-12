@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    @include('admin.navbar_laporan_admin')

    <div class="row g-6 mt-3">
      @foreach($laporanBarangView as $data)
        <div class="col-xl-4 col-lg-6 col-md-6 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start">
                <div class="d-flex align-items-center">
                  <div class="me-2">
                    <h5 class="mb-0 text-heading">{{ $data['laporan']->jenis_kegiatan }}</h5>
                    <small class="fw-medium">Staff: </small><small>{{ $data['laporan']->user['name'] }}</small>
                    <div class="client-info text-body">
                      <small class="fw-medium">Alamat: </small><small> {{ $data['laporan']->alamat_kegiatan ?? '-' }}</small>
                    </div>
                  </div>
                </div>
                <div class="ms-auto">
                  <p class="mb-0">Date: {{ $data['laporan']->tanggal_kegiatan }}</p>
                  <p class="mb-0">Time: {{ \Carbon\Carbon::parse($data['laporan']->jam_mulai)->format('H:i') }} - {{ \Carbon\Carbon::parse($data['laporan']->jam_selesai)->format('H:i') }}</p>
                  {{-- <p class="mb-0">Durasi: {{ $data['laporan']->jam_mulai + $data['laporan']->jam_selesai }}</p> --}}
                </div>
              </div>
              <h6 class="mb-0 mt-3 ">Keterangan Kegiatan :</h6>
              <p class="mb-2 pb-1">{{ $data['laporan']->keterangan_kegiatan }}</p>

              <h6 class="mb-0">Daftar Barang</h6>
              <ul class="mb-0">
                @foreach ($data['barangKeluarView'] as $barang)
                  <li>{{ $barang['nama'] }} | {{ $barang['jumlah'] }}x</li>
                @endforeach
              </ul>
            </div>
            <div class="card-body border-top">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center">
                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2">
                      @foreach ($data['laporan']->galeri as $foto)
                        <div class="image-container">
                          <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Dokumentasi" data-bs-original-title="Dokumentasi">
                              <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi" style="cursor: pointer;" onclick="openImageModal('{{ asset('storage/' . $foto->file_path) }}')">
                          </li>
                        </div>
                      @endforeach
                      {{-- <li><small class="text-muted">280 Members</small></li> --}}
                    </ul>
                </div>
                <div class="ms-auto">
                  <form method="POST" action="{{ route('laporan-admin.update', $data['laporan']->id) }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <button type="submit" name="status" value="selesai" class="btn badge bg-label-success">Accept</button>
                    <button type="submit" name="status" value="reject" class="btn badge bg-label-danger">Reject</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      @endforeach


      {{-- @foreach ($laporanBarangView as $data)
          <div class="col-xl-4 col-lg-6 col-md-6 mb-3">
            <div class="card">
              <div class="card-header pb-4">
                <div class="d-flex align-items-start">
                  <div class="d-flex align-items-center">
                    <div class="avatar me-4">
                      <img src="../../assets/img/icons/brands/social-label.png" alt="Avatar" class="rounded-circle">
                    </div>
                    <div class="me-2">
                      <h5 class="mb-0 text-heading">{{ $data['laporan']->jenis_kegiatan }}</h5>
                      <div class="client-info text-body"><span class="fw-medium">Staff: </span><span>{{ $data['laporan']->user['name'] }}</span></div>
                    </div>
                  </div>
                  <div class="ms-auto">
                    <p>{{ $data['laporan']->tanggal_kegiatan }}</p>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex align-items-center flex-wrap">
                  <div class="bg-lighter px-3 py-2 rounded me-auto mb-4">
                    <p class="mb-1"><span class="fw-medium text-heading">$24.8k</span>/ $18.2k</p>
                    <span class="text-body">Total Budget</span>
                  </div>
                  <div class="text-start mb-4">
                    <p class="mb-1"><span class="text-heading fw-medium">Start : </span>{{ \Carbon\Carbon::parse($data['laporan']->jam_mulai)->format('H:i') }}</p>
                    <p class="mb-1"><span class="text-heading fw-medium">End : </span>{{ \Carbon\Carbon::parse($data['laporan']->jam_selesai)->format('H:i') }}</p>
                  </div>
                </div>
                <p class="mb-0">{{ $data['laporan']->keterangan_kegiatan }}</p>
              </div>
              <div class="card-body border-top">
                <div class="d-flex align-items-center mb-4">
                  <p class="mb-0"><span class="text-heading fw-medium">All Hours: </span>380/244</p>
                  <span class="badge bg-label-success ms-auto">28 Days left</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <small class="text-body">Task: 290/344</small>
                  <small class="text-body">95% Completed</small>
                </div>
                <div class="progress mb-4 rounded" style="height: 8px;">
                  <div class="progress-bar rounded" role="progressbar" style="width: 95%;" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2">
                      
                      <li><small class="text-muted">280 Members</small></li>
                    </ul>
                  </div>
                  <div class="ms-auto">
                    <a href="javascript:void(0);" class="text-muted d-flex align-items-center"><i class="bx bx-chat me-1"></i> 15</a>
                  </div>
                </div>
              </div>
              <div class="card-body border-top">
                <div class="d-flex align-items-center mb-4 mt-2">
                  <p class="mb-0"><span class="text-heading fw-medium">All Hours: </span>380/244</p>
                  <span class="badge bg-label-success ms-auto">28 Days left</span>
                </div>
              </div>
            </div>
          </div>
      @endforeach --}}
    </div>
  </div>
</div>

{{-- Modal --}}
<!-- Modal untuk menampilkan gambar -->
<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="imageModalLabel">Dokumentasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img id="modalImage" src="" alt="Dokumentasi" class="img-fluid">
            </div>
        </div>
    </div>
</div>

@endsection
{{-- Redirect to Chat Whastapp --}}
@if (session('whatsappLink'))
    <script>
        window.open('{{ session('whatsappLink') }}', '_blank');
    </script>
@endif
@section('js')
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
