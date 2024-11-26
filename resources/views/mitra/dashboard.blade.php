@extends('layouts.app_sneat_mitra')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-xxl-8 mb-3 order-0">
            <div class="card">
                <div class="d-flex align-items-start row">
                    <div class="col-sm-7">
                        <div class="card-body">
                            {{-- {{ __('You are logged in!') }} --}}
                            <p>Welcome {{ $userRole }} {{ $userName }}</p>
                            <h5 class="card-title text-primary mb-3">Welcome {{ $userRole }} {{ $userName }} 🎉</h5>
                            {{-- <p class="mb-6">You have 0 item data with low stock.<br>Check in bottom.</p> --}}
                            {{-- <a href="{{ route('laporan.index') }}" class="btn btn-sm btn-outline-primary">Buat Laporan</a> --}}
                            {{-- @if ($barangMenipis)
                                <a href="{{ route('laporan-admin.create') }}" class="btn btn-sm btn-outline-primary">View Pendings</a>
                            @endif --}}
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
    </div>
</div>
@endsection
