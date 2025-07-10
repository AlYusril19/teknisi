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
            {{-- foto, shift, diskon, acc --}}
            <form method="POST" action="{{ route('laporan-admin.update', $data['laporan']->id) ?? '-' }}" enctype="multipart/form-data">
              @csrf
              @method('PUT')
              <div class="card-body border-top">
                  @if ($data['laporan']->customer_id)
                    <div class="row mb-2">
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
                  <div class="d-flex flex-column flex-md-row justify-content-between">
                    {{-- Foto dokumentasi --}}
                    <div class="d-flex flex-wrap gap-1 mb-2">
                      @if ($data['laporan'])
                        @foreach ($data['laporan']->galeri as $foto)
                          <div class="avatar avatar-sm" style="cursor: pointer;" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" aria-label="Dokumentasi" data-bs-original-title="Dokumentasi" onclick="openImageModal('{{ asset('storage/' . $foto->file_path) }}')">
                            <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi">
                          </div>
                        @endforeach
                      @endif
                    </div>

                    {{-- Shift, Mobil, Accept --}}
                    <div class="d-flex flex-column align-items-start">
                      @if (!$data['laporan']->customer_id)
                        <div class="d-flex gap-1 mb-1">
                          <input type="checkbox" name="transport"> <span>Transport</span>
                        </div>
                      @else
                        <div class="d-flex gap-1 mb-1">
                          <input type="checkbox" name="mobil"> <span>Mobil</span>
                        </div>
                      @endif
                      <div class="d-flex gap-1 mb-1">
                        <input type="checkbox" name="shift" value="2"> <span>Shift 2</span>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="card-body border-top">
                <div class="d-flex justify-content-between">
                  <div class="d-flex gap-1">
                    <button type="submit" name="status" value="selesai" class="btn badge bg-label-success">Accept</button>
                    <button type="submit" name="status" value="reject" class="btn badge bg-label-danger">Reject</button>
                    <button type="button" class="btn badge bg-label-primary" data-bs-toggle="modal" data-bs-target="#commentModal-{{ $data['laporan']->id }}">
                      <span class="d-flex align-items-center align-middle" data-laporan-id="{{ $data['laporan']->id }}">
                        <i class="bx bx-comment-detail me-1"></i>
                        <span class="flex-grow-1 align-middle">Comment</span>
                        <span class="notif-chat flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20 ms-1" style="min-width: 20px; height: 20px; font-size: 11px; border-radius: 50%;">{{ $data['laporan']->chatCount }}</span>
                      </span>
                    </button>
                    {{-- <button type="button" class="btn badge bg-label-primary" data-bs-toggle="modal" data-bs-target="#commentModal-{{ $data['laporan']->id }}">
                      <span class="d-flex align-items-center align-middle" data-laporan-id="{{ $data['laporan']->id }}">
                        <i class="bx bx-comment-detail me-1"></i>
                        <span class="flex-grow-1 align-middle">Comment</span>
                        <span class="notif-chat flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20 ms-1">
                          {{ $data['laporan']->chatCount }}
                        </span>
                      </span>
                    </button> --}}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Modal untuk menampilkan komentar -->
        <div class="modal fade" id="commentModal-{{ $data['laporan']->id }}" tabindex="-1" aria-labelledby="commentModalLabel-{{ $data['laporan']->id }}" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Komentar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <div id="list-komentar-{{ $data['laporan']->id }}" class="mb-3" style="max-height: 200px; overflow-y: auto; background: #f9f9f9; padding:10px; border-radius:5px; border:1px solid #ccc"></div>
                <textarea class="form-control" id="inputKomentar-{{ $data['laporan']->id }}" rows="3" placeholder="Tulis komentar..."></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="kirimKomentar({{ $data['laporan']->id }})">Kirim</button>
              </div>
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
{{-- script galeri laporan --}}
<script>
    function openImageModal(imageSrc) {
        // Set the src of the image inside the modal to the clicked image
        document.getElementById('modalImage').src = imageSrc;

        // Show the modal
        var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();
    }
</script>

{{-- script komentar laporan --}}
<script>
  @foreach($laporanBarangView as $data)
    let interval{{ $data['laporan']->id }};

    function fetchKomentar{{ $data['laporan']->id }}() {
      fetch(`/chat-laporan/{{ $data['laporan']->id }}/fetch`)
        .then(res => res.json())
        .then(data => {
          const list = document.getElementById('list-komentar-{{ $data['laporan']->id }}');
          list.innerHTML = '';

          if (!data.length) {
            list.innerHTML = '<div class="text-muted">Belum ada komentar.</div>';
            return;
          }

          data.forEach(komentar => {
            const div = document.createElement('div');
            const isiKomentar = komentar.komentar.replace(/\n/g, '<br>');
            div.className = komentar.is_me ? 'text-end mb-2' : 'text-start mb-2';
            div.innerHTML = `
              <div class="p-2 rounded bg-light ${komentar.is_me ? 'bg-primary text-white' : ''}">
                <strong>${komentar.name}</strong><br/>
                <div>${isiKomentar}</div>
                <small>${komentar.created_at}</small><br/>
              </div>
            `;
            list.appendChild(div);
          });

          list.scrollTop = list.scrollHeight;
        });
    }

    // Modal shown: fetch + polling
    document.getElementById('commentModal-{{ $data['laporan']->id }}')
      .addEventListener('shown.bs.modal', () => {
        fetchKomentar{{ $data['laporan']->id }}();
        interval{{ $data['laporan']->id }} = setInterval(fetchKomentar{{ $data['laporan']->id }}, 5000);
      });

    // Modal hidden: stop polling
    document.getElementById('commentModal-{{ $data['laporan']->id }}')
      .addEventListener('hidden.bs.modal', () => {
        clearInterval(interval{{ $data['laporan']->id }});
      });

    // Kirim komentar
    function kirimKomentar(id) {
      const input = document.getElementById('inputKomentar-' + id);
      const komentar = input.value.trim();
      if (!komentar) return;

      fetch('/chat-laporan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': '{{ csrf_token() }}'
        },
        body: JSON.stringify({
          laporan_id: id,
          komentar: komentar
        })
      })
      .then(res => res.json())
      .then(() => {
        input.value = '';
        fetchKomentar{{ $data['laporan']->id }}();
      });
    }
  @endforeach
</script>

{{-- script count komentar --}}
<script>
function updateChatBadges() {
  fetch('/chat-laporan/show')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-laporan-id]').forEach(el => {
        const laporanId = el.getAttribute('data-laporan-id');
        const badge = el.querySelector('.notif-chat');

        const count = data[laporanId] ?? 0;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
      });
    });
}

// Update setiap 5 detik
setInterval(updateChatBadges, 5000);

// Jalankan pertama kali
updateChatBadges();
</script>


@endsection
