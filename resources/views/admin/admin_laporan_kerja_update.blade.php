@extends('layouts.app_sneat_admin')

@section('content')

<div class="row">
  <div class="col-md-12">
    @include('admin.navbar_laporan_admin')

    <div class="row g-6 mt-3">
      @foreach($laporans as $laporan)
        <div class="col-xl-4 col-lg-6 col-md-6 mb-3">
          <div class="card 
            {{ $laporan->customer_name ? 'alert-primary' : '' }}
            {{ $laporan->jam_selesai < $laporan->jam_mulai ? 'alert-danger' : '' }}
          ">
            <div class="card-body">
              <div class="d-flex align-items-start">
                {{-- keterangan staff kerja --}}
                <div class="flex-grow-1 me-3">
                  <div class="me-2">
                    <h5 class="mb-0 text-heading">{{ $laporan->jenis_kegiatan }}</h5>
                    <small class="fw-medium">Staff: </small>
                    <small>{{ $laporan->user['name'] ?? '-' }}</small>

                    <div class="client-info text-body">
                      @foreach ($laporan->support as $item)
                        <small class="mb-0 text-primary">&commat;{{ $item['name'] }}</small>
                      @endforeach
                      @foreach ($laporan->supportHelper as $item)
                        <small class="mb-0 text-primary">&commat;{{ $item['name'] }} ~ helper</small>
                      @endforeach
                    </div>

                    <div class="client-info text-body">
                      <small class="fw-medium">Alamat: </small>
                      <small>{{ $laporan->alamat_kegiatan ?? '-' }}</small>
                    </div>
                  </div>
                </div>

                {{-- keterangan date time dan mitra --}}
                <div class="flex-shrink-0 text-end">
                  <p class="mb-0">Date: {{ $laporan->tanggal_kegiatan ?? '-' }}</p>
                  <p class="mb-0 {{ $laporan->jam_selesai < $laporan->jam_mulai ? 'alert-danger' : '' }}">
                    Time:
                    {{ \Carbon\Carbon::parse($laporan->jam_mulai)->format('H:i') ?? '-' }}
                    -
                    {{ \Carbon\Carbon::parse($laporan->jam_selesai)->format('H:i') }}
                  </p>

                  @if ($laporan->customer_name)
                    <p class="mb-0">Mitra: {{ $laporan->customer_name }}</p>
                  @endif
                </div>
              </div>

              <h6 class="mb-0 mt-3">Keterangan Kegiatan :</h6>
              <p class="mb-2 pb-1">
                {!! nl2br(e($laporan->keterangan_kegiatan ?? '-')) !!}
              </p>

              {{-- barang keluar --}}
              @if ($laporan->barangKeluarView)
                <div class="bg-info text-dark">
                  <h6 class="mb-0 text-dark">Daftar Barang Keluar</h6>
                  <ul class="mb-0">
                    @foreach ($laporan->barangKeluarView as $barang)
                      <li>{{ $barang['nama'] ?? '-' }} | x{{ $barang['jumlah'] ?? '-' }} {{ $barang['satuan'] ?? '' }}</li>
                    @endforeach
                  </ul>
                </div>
              @endif

              {{-- barang kembali --}}
              @if ($laporan->barangKembaliView)
                <div class="bg-warning text-dark mt-2">
                  <h6 class="mb-0 text-dark">Daftar Barang Kembali</h6>
                  <ul class="mb-0">
                    @foreach ($laporan->barangKembaliView as $barang)
                      <li>{{ $barang['nama'] ?? '-' }} | x{{ $barang['jumlah'] ?? '-' }} {{ $barang['satuan'] ?? '' }}</li>
                    @endforeach
                  </ul>
                </div>
              @endif
            </div>

            {{-- FORM --}}
            <form method="POST" action="{{ route('laporan-admin.update', $laporan->id) }}" enctype="multipart/form-data">
              @csrf
              @method('PUT')

              <div class="card-body border-top">
                @if ($laporan->customer_id)
                  <div class="row mb-2">
                    <div class="col-6">
                      <div class="input-group mt-0">
                        <input type="number" class="form-control" name="diskon" placeholder="diskon"
                          value="{{ $laporan->diskon ?? '' }}">
                        <span class="input-group-text">%</span>
                      </div>
                    </div>
                    @if ($laporan->transport_hari_ini)
                      <div class="kendaraan-wrapper d-none col-6">
                        <input type="number" class="form-control" name="kendaraan" placeholder="jumlah kendaraan" min="0">
                      </div>
                      @else
                        <div class="col-6">
                          <input type="number" class="form-control" name="kendaraan" placeholder="jumlah kendaraan" min="0">
                        </div>
                    @endif
                  </div>
                @endif
                {{--  --}}
                <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
                  {{-- Foto dokumentasi --}}
                  <div class="d-flex flex-wrap gap-2 mb-2" style="flex: 1 1;">
                    @if ($laporan)
                      @foreach ($laporan->galeri as $foto)
                        <div class="avatar avatar-sm" style="cursor: pointer;" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" aria-label="Dokumentasi" data-bs-original-title="Dokumentasi" onclick="openImageModal('{{ asset('storage/' . $foto->file_path) }}')">
                          <img src="{{ asset('storage/' . $foto->file_path) }}" alt="Dokumentasi">
                        </div>
                      @endforeach
                    @endif
                  </div>

                  {{-- Shift, Mobil, Transport --}}
                  <div class="d-flex flex-column">
                    @if (!$laporan->customer_id)
                      <div class="d-flex gap-1 mb-1">
                        <input type="checkbox" name="transport"> <span>Transport</span>
                      </div>
                    @elseif($laporan->transport_hari_ini)
                      <div class="d-flex gap-1 mb-1">
                        <input type="checkbox" name="transport_mitra" class="transport-checkbox"
                          data-sudah-transport="{{ $laporan->transport_hari_ini ? 1 : 0 }}">
                        <span>Transport</span>
                      </div>
                      <div class="mobil-wrapper d-none gap-1 mb-1"> 
                        <input type="checkbox" name="mobil">
                        <span>Mobil</span>
                      </div>
                      <small class="text-danger ms-2">
                        (Sudah ada Transport ⚠️)
                      </small>
                    @else
                      <div class="d-flex gap-1 mb-1">
                        <input type="checkbox" name="mobil"> <span>Mobil</span>
                      </div>
                    @endif
                    <div class="d-flex gap-1 mb-1">
                      {{-- <input type="checkbox" name="shift" value="2"> <span>Shift 2</span> --}}
                      <input type="time" class="form-control" id="shift" name="shift" placeholder="Jam Masuk">
                    </div>
                  </div>
                </div>
                {{--  --}}
                <div class="card-body border-top">
                  <div class="d-flex justify-content-between">
                    <div class="d-flex gap-1">
                      <button type="submit" name="status" value="selesai" class="btn badge bg-label-success">Accept</button>
                      <button type="submit" name="status" value="reject" class="btn badge bg-label-danger">Reject</button>

                      <button type="button" class="btn badge bg-label-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#commentModal-{{ $laporan->id }}">
                        <span data-laporan-id="{{ $laporan->id }}">
                          <i class="bx bx-comment-detail me-1"></i>
                          Comment
                          <span class="notif-chat badge bg-danger"
                            style="display:none">
                            {{ $laporan->chatCount }}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {{-- MODAL KOMENTAR --}}
        <div class="modal fade" id="commentModal-{{ $laporan->id }}" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-body">
                <div id="list-komentar-{{ $laporan->id }}"></div>
                <textarea id="inputKomentar-{{ $laporan->id }}" class="form-control mt-2"></textarea>
                <button class="btn btn-primary mt-2" onclick="kirimKomentar({{ $laporan->id }})">Kirim</button>
              </div>
            </div>
          </div>
        </div>
      @endforeach
      <div class="mt-4 d-flex justify-content-center">
        {{ $laporans->links('pagination::bootstrap-5') }}
      </div>
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
let komentarIntervals = {};

// ambil komentar
function fetchKomentar(laporanId) {
  const list = document.getElementById(`list-komentar-${laporanId}`);
  if (!list) return;

  fetch(`/chat-laporan/${laporanId}/fetch`)
    .then(res => res.json())
    .then(data => {
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
          <div class="p-2 rounded ${komentar.is_me ? 'bg-primary text-white' : 'bg-light'}">
            <strong>${komentar.name}</strong><br/>
            <div>${isiKomentar}</div>
            <small>${komentar.created_at}</small>
          </div>
        `;
        list.appendChild(div);
      });

      list.scrollTop = list.scrollHeight;
    });
}

// kirim komentar
function kirimKomentar(laporanId) {
  const input = document.getElementById(`inputKomentar-${laporanId}`);
  if (!input) return;

  const komentar = input.value.trim();
  if (!komentar) return;

  fetch('/chat-laporan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': '{{ csrf_token() }}'
    },
    body: JSON.stringify({
      laporan_id: laporanId,
      komentar: komentar
    })
  })
  .then(res => res.json())
  .then(() => {
    input.value = '';
    fetchKomentar(laporanId);
  });
}

// modal dibuka → fetch + polling
document.addEventListener('shown.bs.modal', function (event) {
  const modal = event.target;
  if (!modal.id.startsWith('commentModal-')) return;

  const laporanId = modal.id.replace('commentModal-', '');
  fetchKomentar(laporanId);

  komentarIntervals[laporanId] = setInterval(() => {
    fetchKomentar(laporanId);
  }, 5000);
});

// modal ditutup → stop polling
document.addEventListener('hidden.bs.modal', function (event) {
  const modal = event.target;
  if (!modal.id.startsWith('commentModal-')) return;

  const laporanId = modal.id.replace('commentModal-', '');
  clearInterval(komentarIntervals[laporanId]);
});
</script>


{{-- script count komentar --}}
<script>
function updateChatBadges() {
  fetch('/chat-laporan/show')
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-laporan-id]').forEach(el => {
        const laporanId = el.dataset.laporanId;
        const badge = el.querySelector('.notif-chat');
        if (!badge) return;

        const count = Number(data[laporanId] ?? 0);

        if (count > 0) {
          badge.textContent = count;
          badge.style.display = 'inline-block';
        } else {
          badge.textContent = '';
          badge.style.display = 'none';
        }
      });
    });
}

setInterval(updateChatBadges, 5000);
updateChatBadges();
</script>

 {{-- Script Transport Exist Mitra --}}
{{-- <script>
  document.querySelectorAll('input[name="transport_mitra"]').forEach(el => {
    el.addEventListener('change', function() {
      if (this.checked && this.dataset.sudahTransport === "1") {
        if (!confirm("Transport sudah pernah dihitung hari ini. Yakin ingin tambah lagi?")) {
          this.checked = false;
        }
      }
    });
  });
</script> --}}

{{-- Script Transport Mobil Mitra --}}
<script>
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.transport-checkbox').forEach(function (checkbox) {
    const card = checkbox.closest('.card');
    const mobilWrapper = card.querySelector('.mobil-wrapper');
    const kendaraanWrapper = card.querySelector('.kendaraan-wrapper');
    
    // Selector untuk input di dalamnya agar bisa di-reset
    const mobilInput = mobilWrapper?.querySelector('input[name="mobil"]');
    const kendaraanInput = kendaraanWrapper?.querySelector('input[name="kendaraan"]');

    // Fungsi sakti untuk muncul/sembunyi
    const toggleTransportExtras = (isChecked) => {
      if (isChecked) {
        // Munculkan semua
        mobilWrapper?.classList.remove('d-none');
        kendaraanWrapper?.classList.remove('d-none');
      } else {
        // Sembunyikan semua
        mobilWrapper?.classList.add('d-none');
        kendaraanWrapper?.classList.add('d-none');
        
        // Reset data agar tidak terkirim ke server saat hidden
        if (mobilInput) mobilInput.checked = false;
        if (kendaraanInput) kendaraanInput.value = ''; 
      }
    };

    // 1. Cek kondisi awal (saat page load)
    toggleTransportExtras(checkbox.checked);

    // 2. Event Listener saat klik checkbox transport
    checkbox.addEventListener('change', function () {
      // Logika konfirmasi jika sudah pernah transport hari ini
      if (this.checked && this.dataset.sudahTransport === "1") {
        if (!confirm("Transport sudah pernah dihitung hari ini. Yakin ingin tambah lagi?")) {
          this.checked = false;
          toggleTransportExtras(false);
          return;
        }
      }
      
      toggleTransportExtras(this.checked);
    });
  });
});
</script>

@endsection
