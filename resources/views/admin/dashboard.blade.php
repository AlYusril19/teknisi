@extends('layouts.app_sneat_admin')

@section('content')
    <div class="row">
        <div class="col-xxl-6 mb-3 order-0">
            <div class="card">
                <div class="d-flex align-items-start row">
                    <div class="col-sm-7">
                        <div class="card-body">
                            <h5 class="card-title text-primary mb-3">Welcome {{ $userRole }} {{ $userName }} 🎉</h5>
                            <p class="mb-6">You have {{ $laporanPending ?? '0' }} report pending today.<br>Check in bottom.</p>
                            
                            @if ($laporanPending)
                                <a href="{{ route('laporan-admin.create') }}" class="btn btn-sm btn-outline-primary">View Pendings</a>
                            @endif

                            <h6 class="mt-5 mb-1">Cek data pada bulan yang dipilih</h6>
                            <!-- Dropdown Pemilihan Bulan dan Tahun -->
                            <form action="{{ route('admin.index') }}" method="GET">
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
                                <button type="submit" class="btn btn-primary mt-3">Terapkan</button>
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

        <!--/ Total Revenue -->
        <div class="col-xxl-6 col-lg-12 col-md-4 order-1">
            <div class="row">
                {{-- Banding Jumlah Laporan --}}
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
                                        <a class="dropdown-item" href="{{ route('laporan-admin.index') }}">View More</a>
                                        {{-- <a class="dropdown-item" href="javascript:void(0);">Delete</a> --}}
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

                {{-- Banding Jam Kerja --}}
                @foreach ($bandingJamKerjaPerUser  as $data)
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
                                            <form action="{{ route('laporan-admin.index') }}" method="GET">
                                                <button type="submit" name="teknisi" value="{{ $data['user_id'] }}" class="dropdown-item">View More</button>
                                            </form>
                                                {{-- <a class="dropdown-item" href="{{ route('laporan-admin.index') }}">View More {{ $data['user_id'] }}</a> --}}
                                            {{-- <a class="dropdown-item" href="javascript:void(0);">Delete</a> --}}
                                        </div>
                                    </div>
                                </div>
                                <span class="fw-semibold d-block mb-1">{{ $data['name'] }}</span>
                                <h3 class="card-title mb-2">{{ $data['total_jam'] }} Hours</h3>
                                @if ($data['perbandingan'] >=0)
                                    <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i> {{ $data['perbandingan'] }}%</small>
                                @else
                                    <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i> {{ $data['perbandingan'] }}%</small>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script>
        const profileReportChartEl = document.querySelector('#reportChart'),
        profileReportChartConfig = {
        chart: {
            height: 80,
            // width: 175,
            type: 'line',
            toolbar: {
            show: false
            },
            dropShadow: {
            enabled: true,
            top: 10,
            left: 5,
            blur: 3,
            color: config.colors.warning,
            opacity: 0.15
            },
            sparkline: {
            enabled: true
            }
        },
        grid: {
            show: false,
            padding: {
            right: 8
            }
        },
        colors: [config.colors.warning],
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 5,
            curve: 'smooth'
        },
        series: [
            {
            data: [110, 270, 145, 245]
            }
        ],
        xaxis: {
            show: false,
            lines: {
            show: false
            },
            labels: {
            show: false
            },
            axisBorder: {
            show: false
            }
        },
        yaxis: {
            show: false
        }
        };
        if (typeof profileReportChartEl !== undefined && profileReportChartEl !== null) {
            const reportChart = new ApexCharts(profileReportChartEl, profileReportChartConfig);
            reportChart.render();
        }
    </script>
@endsection
