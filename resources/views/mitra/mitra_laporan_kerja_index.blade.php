@extends('layouts.app_sneat_mitra')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="input-group">
                    @if (request('transaksi'))
                        <button onclick="window.history.back();" class="btn btn-secondary me-2">Back</button>
                    @else
                        <h5 class="mb-0">Daftar Laporan Kerja</h5>
                    @endif
                </div>
                <form action="{{ route('laporan-mitra.index') }}" method="GET">
                    <div class="input-group">
                        <input type="text" name="search" class="form-control" placeholder="kegiatan" value="{{ request('search') }}">
                        <button type="submit" class="btn btn-primary me-2"><i class="bx bx-search"></i></button>
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
                            <th>Kegiatan</th>
                            <th>Jam Kerja</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        @foreach($laporan as $data)
                            <tr class="
                            {{ $data->jam_selesai < $data->jam_mulai ? 'table-danger' : '' }}
                            {{ $data->jam_selesai > "17:00" ? 'table-warning' : '' }}
                            ">
                                <td align="center"><i class="fab fa-angular fa-lg text-danger"></i> <strong>{{ $loop->iteration }}</strong></td>
                                <td>{{ $data->user['name'] ?? '-' }}</td>
                                @if ($data->jam_selesai < $data->jam_mulai)
                                    <td align="center">{{ $data->tanggal_kegiatan }} <br> {{ \Carbon\Carbon::parse($data->tanggal_kegiatan)->addDay()->format('Y-m-d') }}</td> {{-- Tanggal ditambah 1 --}}
                                @else
                                    <td align="center">{{ $data->tanggal_kegiatan }}</td>
                                @endif
                                <td>
                                    {{ $data->keterangan_kegiatan }}
                                    @foreach ($data->support as $item)
                                        <p class="mb-0 text-primary">&commat;{{ $item['name'] }}</p>
                                    @endforeach
                                    @if ($data->diskon != null)
                                        <div class="badge bg-danger rounded-pill ms-auto">{{ $data->diskon }}% Off</div>
                                    @endif
                                </td>
                                
                                <td align="center">{{ formatTime($data->jam_mulai) }} - {{  formatTime($data->jam_selesai) }}</td>
                                <td align="center">
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            {{-- <a class="dropdown-item" href="{{ route('laporan-admin.show', $data->id) }}"><i class="bx bx-show-alt me-2"></i> Show</a> --}}
                                            <button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#laporanModal" data-id="{{ $data->id }}">
                                                <i class="bx bx-show-alt me-2"></i> Show
                                            </button>
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
            <p><strong>Alamat:</strong> <span id="laporanAlamat"></span></p>

            <!-- Daftar Barang -->
            <div class="col-md-6">
                <div class="card h-100 mb-0" id="titleBarang" style="display: none;">
                    <h6 class="card-header mb-0">Daftar Barang</h6>
                    <div class="card-body">
                        <ul id="laporanBarang"></ul>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mt-1">
                <div class="card h-100 mb-0" id="titleTagihan" style="display: none;">
                    <h6 class="card-header">Jumlah Biaya Kerja & Barang</h6>
                    <div class="card-body">
                        <table class="table table-bordered table-sm">
                            <thead>
                                <tr align="center">
                                    <th width="5%">No</th>
                                    <th>Jenis Biaya</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody id="laporanTagihan" class="table-border-bottom-0">
                                {{-- isi tagihan --}}
                            </tbody>
                        </table>
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
            fetch(`/laporan-mitra/${laporanId}`)
                .then(response => response.json())
                .then(data => {
                    // isi data laporan
                    let tanggalKegiatan = new Date(data.laporan.tanggal_kegiatan);
                    let jamMulai = data.laporan.jam_mulai;
                    let jamSelesai = data.laporan.jam_selesai;

                    // Konversi waktu ke format jam:menit
                    let jamMulaiDate = new Date(`1970-01-01T${jamMulai}`);
                    let jamSelesaiDate = new Date(`1970-01-01T${jamSelesai}`);

                    // Tentukan tanggal awal dan tanggal akhir
                    let tanggalAwal = new Date(tanggalKegiatan);
                    let tanggalAkhir = new Date(tanggalKegiatan);

                    // Jika jam selesai lebih kecil dari jam mulai, tambahkan satu hari ke tanggal akhir
                    if (jamSelesaiDate < jamMulaiDate) {
                        tanggalAkhir.setDate(tanggalAkhir.getDate() + 1);
                    }

                    // Format tanggal menjadi "DD-MM-YYYY"
                    const formatTanggal = (date) => {
                        let day = date.getDate().toString().padStart(2, '0');
                        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
                        let year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                    };

                    // Buat rentang tanggal
                    let rentangTanggal;
                    if (tanggalAwal.getTime() !== tanggalAkhir.getTime()) {
                        // Jika melewati hari, tambahkan kata "sampai"
                        rentangTanggal = `${formatTanggal(tanggalAwal)} sampai ${formatTanggal(tanggalAkhir)}`;
                    } else {
                        // Jika tidak melewati hari, tampilkan satu tanggal saja
                        rentangTanggal = `${formatTanggal(tanggalAwal)}`;
                    }

                    // Isi data laporan
                    document.getElementById('laporanUser').textContent = data.laporan.user.name;
                    document.getElementById('laporanTanggal').textContent = rentangTanggal;
                    document.getElementById('laporanJenis').textContent = data.laporan.jenis_kegiatan;
                    document.getElementById('laporanKeterangan').textContent = data.laporan.keterangan_kegiatan;
                    document.getElementById('laporanJamMulai').textContent = timeFormat(data.laporan.jam_mulai);
                    document.getElementById('laporanJamSelesai').textContent = timeFormat(data.laporan.jam_selesai);
                    document.getElementById('laporanAlamat').textContent = data.laporan.alamat_kegiatan;

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
                            li.textContent = `${barang.nama} | x${barang.jumlah} ${barang.satuan ?? ''} = ${formatRupiahJS(barang.harga_jual)}`;
                            barangList.appendChild(li);
                        });
                    } else {
                        // Jika tidak ada data barang, sembunyikan judul
                        titleBarang.style.display = 'none';
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

                    // Isi daftar barang kembali
                    var tagihanList = document.getElementById('laporanTagihan');
                    var titleTagihan = document.getElementById('titleTagihan');

                    // Kosongkan list barang
                    tagihanList.innerHTML = '';

                    if (data.tagihan.length > 0 || data.barangKeluarView.length > 0) {
                        // Tampilkan judul tagihan jika ada data barang kembali atau barang keluar
                        titleTagihan.style.display = 'block';

                        let totalBiaya = 0;
                        let no = 0;
                        
                        // Iterasi data tagihan
                        data.tagihan.forEach(function(tagihan) {
                            var tr = document.createElement('tr');
                            tagihanList.appendChild(tr);
                            var tdNo = document.createElement('td');
                            tdNo.setAttribute('align', 'center');
                            tdNo.textContent = no += 1;
                            tagihanList.appendChild(tdNo);
                            var tdNama = document.createElement('td');
                            tdNama.textContent = tagihan.nama_biaya;
                            tagihanList.appendChild(tdNama);
                            var tdBiaya = document.createElement('td');
                            tdBiaya.setAttribute('align', 'right');
                            tdBiaya.textContent = formatRupiahJS(tagihan.total_biaya);
                            tagihanList.appendChild(tdBiaya);
                            totalBiaya += parseInt(tagihan.total_biaya);
                        });

                        // Tambahkan total keseluruhan biaya
                        var trTotal = document.createElement('tr');
                        tagihanList.appendChild(trTotal);
                        var tdTotalLabel = document.createElement('td');
                        tdTotalLabel.setAttribute('colspan', '2');
                        tdTotalLabel.setAttribute('align', 'right');
                        tdTotalLabel.textContent = 'Total Biaya';
                        tagihanList.appendChild(tdTotalLabel);
                        var tdTotalBiaya = document.createElement('td');
                        tdTotalBiaya.setAttribute('align', 'right');
                        tdTotalBiaya.textContent = formatRupiahJS(totalBiaya);
                        tagihanList.appendChild(tdTotalBiaya);
                    } else {
                        // Jika tidak ada data, sembunyikan judul tagihan
                        titleTagihan.style.display = 'none';
                    }
                });
        });
    });
</script>
@endsection