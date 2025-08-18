@extends('layouts.app_sneat')

@section('content')
    <div class="row">
        <div class="col-xxl-6 mb-3 order-0">
            @extends('modal_himbauan')
            <div class="card">
                <div class="d-flex align-items-start row">
                    <div class="col-sm-7">
                        <div class="card-body">
                            <h5 class="card-title text-primary mb-3">Welcome {{ $userRole!=='magang' ? $userRole : '' }} {{ $userName }} 🎉</h5>
                            <p>Keterangan Laporan per periode kerja</p>

                            <a href="{{ route('laporan.index') }}" class="btn btn-sm btn-outline-primary mb-3">Buat Laporan</a>
                            
                            @if ($laporanReject)
                                <p class="mb-6">You have {{ $laporanReject ?? '0' }} report reject.<br>Check in bottom.</p>
                                <a href="{{ route('laporan.index') }}" class="btn btn-sm btn-outline-primary mb-5">View Report</a>
                            @endif

                            <h6 class="mb-1">Cek data pada bulan yang dipilih</h6>
                            <!-- Dropdown Pemilihan Bulan dan Tahun -->
                            <form action="{{ route('teknisi.index') }}" id="formDateLaporan" method="GET">
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <label for="bulan" class="form-label">Pilih Bulan</label>
                                        <select name="bulan" id="bulan" class="form-select">
                                            @for ($i = 1; $i <= 12; $i++)
                                                <option value="{{ $i }}" {{ request('bulan', date('n')) == $i ? 'selected' : '' }}>
                                                    {{ DateTime::createFromFormat('!m', $i)->format('F') }}
                                                </option>
                                            @endfor
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="tahun" class="form-label">Pilih Tahun</label>
                                        <select name="tahun" id="tahun" class="form-select">
                                            @for ($y = date('Y') - 5; $y <= date('Y'); $y++)
                                                <option value="{{ $y }}" {{ request('tahun', date('Y')) == $y ? 'selected' : '' }}>
                                                    {{ $y }}
                                                </option>
                                            @endfor
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-5 text-center text-sm-left">
                        <div class="card-body pb-0 px-0 px-md-6">
                            <img src="{{ asset('sneat') }}/assets/img/illustrations/man-with-laptop-light.png" height="175" class="scaleX-n1-rtl" alt="View Badge User">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Total Revenue --}}
        <div class="col-xxl-6 col-lg-12 col-md-4 order-1">
            <div class="row">
                {{-- Banding Laporan --}}
                <div class="col-lg-4 col-md-12 col-6 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title d-flex align-items-start justify-content-between">
                                <div class="avatar flex-shrink-0">
                                    <img src="{{ asset('sneat') }}/assets/img/icons/unicons/report.png" alt="Credit Card" class="rounded" />
                                </div>
                                <div class="dropdown">
                                    <button
                                        class="btn p-0"
                                        type="button"
                                        id="cardOpt1"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="cardOpt1">
                                        <a class="dropdown-item" href="{{ route('laporan.index') }}">View More</a>
                                    </div>
                                </div>
                            </div>
                            <span class="fw-semibold d-block mb-1">Report</span>
                            <h3 class="card-title mb-2">{{ $laporanSekarang }}</h3>
                            @if ($bandingLaporan >=0)
                                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> {{ $bandingLaporan }}%</small>
                            @else
                                <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> {{ $bandingLaporan }}%</small>
                            @endif
                        </div>
                    </div>
                </div>

                {{-- Total Jam Kerja --}}
                <div class="col-lg-4 col-md-12 col-6 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title d-flex align-items-start justify-content-between">
                                <div class="avatar flex-shrink-0">
                                    <img src="{{ asset('sneat') }}/assets/img/icons/unicons/hard-work.png" alt="Credit Card" class="rounded" />
                                </div>
                                <div class="dropdown">
                                    <button
                                        class="btn p-0"
                                        type="button"
                                        id="cardOpt1"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="cardOpt1">
                                        <a class="dropdown-item" href="{{ route('laporan.index') }}">View More</a>
                                    </div>
                                </div>
                            </div>
                            <span class="fw-semibold d-block mb-1">Time Work</span>
                            <h3 class="card-title mb-2">{{ $totalJamKerjaSekarang }} Hours</h3>
                            @if ($bandingJamKerja >=0)
                                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> {{ $bandingJamKerja }}%</small>
                            @else
                                <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> {{ $bandingJamKerja }}%</small>
                            @endif
                        </div>
                    </div>
                </div>

                {{-- Total OT --}}
                <div class="col-lg-4 col-md-12 col-6 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-title d-flex align-items-start justify-content-between">
                                <div class="avatar flex-shrink-0">
                                    <img src="{{ asset('sneat') }}/assets/img/icons/unicons/hard-work.png" alt="Credit Card" class="rounded" />
                                </div>
                                <div class="dropdown">
                                    <button
                                        class="btn p-0"
                                        type="button"
                                        id="cardOpt1"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i class="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="cardOpt1">
                                        <form action="{{ route('laporan.index') }}" method="GET">
                                            <button type="submit" name="filter" value="lembur" class="dropdown-item">View More</button>
                                        </form>
                                        {{-- <a class="dropdown-item" href="{{ route('laporan-admin.index') }}">View More</a> --}}
                                    </div>
                                </div>
                            </div>
                            <span class="fw-semibold d-block mb-1">Over Time</span>
                            <h3 class="card-title mb-2">{{ $totalJamLemburSekarang }} Hours</h3>
                            @if ($bandingJamLembur >=0)
                                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> {{ $bandingJamLembur }}%</small>
                            @else
                                <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> {{ $bandingJamLembur }}%</small>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
{{-- listener bulan dan tahun --}}
    <script>
        document.getElementById('bulan').addEventListener('change', function() {
            document.getElementById('formDateLaporan').submit();
        });

        document.getElementById('tahun').addEventListener('change', function() {
            document.getElementById('formDateLaporan').submit();
        });
    </script>
@endsection