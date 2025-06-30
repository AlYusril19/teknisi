@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    @include('admin.navbar_laporan_admin')

    <div class="row g-6 mt-3">
      @foreach($laporanBarangView as $data)
        <div class="col-xl-4 col-lg-6 col-md-6 mb-3">
          <div class="card 
          {{ $data['customer'] ? 'alert-primary' : '' }}
          {{ $data['laporan']->jam_selesai < $data['laporan']->jam_mulai ? 'alert-danger' : '' }}
          ">
            <div class="card-body">
              <div class="d-flex align-items-start">
                <div class="d-flex align-items-center">
                  <div class="me-2">
                    <h5 class="mb-0 text-heading">{{ $data['laporan']->jenis_kegiatan }}</h5>
                    <small class="fw-medium">Staff: </small><small>{{ $data['laporan']->user['name'] ?? '-'}}</small>
                    <div class="client-info text-body">
                      {{-- <small class="fw-medium">Support: </small> --}}
                      @foreach ($data['laporan']->support as $item)
                        <small class="mb-0 text-primary">&commat;{{ $item['name'] }}</small>
                      @endforeach
                    </div>
                    <div class="client-info text-body">
                      <small class="fw-medium">Alamat: </small><small> {{ $data['laporan']->alamat_kegiatan ?? '-' }}</small>
                    </div>
                  </div>
                </div>
                <div class="ms-auto">
                  <p class="mb-0">Date: {{ $data['laporan']->tanggal_kegiatan ?? '-'}}</p>
                  <p class="mb-0 {{ $data['laporan']->jam_selesai < $data['laporan']->jam_mulai ? 'alert-danger' : '' }}">Time: {{ \Carbon\Carbon::parse($data['laporan']->jam_mulai)->format('H:i') ?? '-' }} - {{ \Carbon\Carbon::parse($data['laporan']->jam_selesai)->format('H:i') }}</p>
                  @if ($data['customer'])
                      <p class="mb-0">Mitra: {{ $data['customer'] ?? '-' }}</p>
                  @endif
                  {{-- <p class="mb-0">Durasi: {{ $data['laporan']->jam_mulai + $data['laporan']->jam_selesai }}</p> --}}
                </div>
              </div>
              <h6 class="mb-0 mt-3 ">Keterangan Kegiatan :</h6>
              <p class="mb-2 pb-1">{{ $data['laporan']->keterangan_kegiatan ?? '-' }}</p>

              {{-- barang keluar --}}
              @if ($data['barangKeluarView'])
                  <div class="bg-info text-dark">
                    <h6 class="mb-0 text-dark">Daftar Barang Keluar</h6>
                    <ul class="mb-0">
                      @foreach ($data['barangKeluarView'] as $barang)
                        <li>{{ $barang['nama'] ?? '-' }} | x{{ $barang['jumlah'] ?? '-' }} {{ $barang['satuan'] ?? '' }}</li>
                      @endforeach
                    </ul>
                  </div>
              @endif

              {{-- barang kembali --}}
              @if ($data['barangKembaliView'])
                  <div class="bg-warning text-dark mt-2">
                    <h6 class="mb-0 text-dark">Daftar Barang Kembali</h6>
                    <ul class="mb-0">
                      @foreach ($data['barangKembaliView'] as $barang)
                        <li>{{ $barang['nama'] ?? '-' }} | x{{ $barang['jumlah'] ?? '-' }} {{ $barang['satuan'] ?? '' }}</li>
                      @endforeach
                    </ul>
                  </div>
              @endif
            </div>
            <div class="card-body border-top">
              <form method="POST" action="{{ route('laporan-admin.update', $data['laporan']->id) ?? '-' }}" enctype="multipart/form-data">
                @csrf
                @method('PUT')
                @if ($data['laporan']->customer_id)
                  <div class="row">
                    <div class="col-6">
                      <div class="input-group mt-0">
                        <input type="number" class="form-control" id="diskon" name="diskon" placeholder="diskon" min="0" max="100" value="{{ $data['laporan']->diskon ?? '' }}">
                        <span class="input-group-text">%</span>
                      </div>
                    </div>
                    <div class="col-6">
                      <input type="number" class="form-control" id="kendaraan" name="kendaraan" placeholder="kendaraan" min="0" max="10">
                    </div>
                  </div>
                @endif
                <div class="d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <ul class="list-unstyled d-flex align-items-center avatar-group mb-0 z-2">
                      @if ($data['laporan'])
                          @foreach ($data['laporan']->galeri as $foto)
                            <div class="image-container">
                              <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Dokumentasi" data-bs-original-title="Dokumentasi">
                                  <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi" style="cursor: pointer;" onclick="openImageModal('{{ asset('storage/' . $foto->file_path) }}')">
                              </li>
                            </div>
                          @endforeach
                      @endif
                    </ul>
                  </div>
                  <div class="ms-auto">
                    {{-- <form method="POST" action="{{ route('laporan-admin.update', $data['laporan']->id) ?? '-' }}" enctype="multipart/form-data">
                      @csrf
                      @method('PUT') --}}
                      @if (!$data['laporan']->customer_id)
                        <div class="mt-0">
                          <input type="checkbox" name="transport"> <span>Transport</span>
                        </div>
                      @else
                        <div class="mt-1">
                          <input type="checkbox" name="mobil"> <span>Mobil</span>
                        </div>
                      @endif
                      <div class="mt-1">
                        <input type="checkbox" name="shift" value="2"> <span>Shift 2</span>
                      </div>
                      
                      <button type="submit" name="status" value="selesai" class="btn badge bg-label-success">Accept</button>
                      <button type="submit" name="status" value="reject" class="btn badge bg-label-danger">Reject</button>
                    {{-- </form> --}}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      @endforeach
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
