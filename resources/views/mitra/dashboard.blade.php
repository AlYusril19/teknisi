@extends('layouts.app_sneat_mitra')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-xxl-8 mb-3 order-0">
            <div class="card">
                <div class="d-flex align-items-start row">
                    <div class="col-sm-7">
                        <div class="card-body">
                            <h5 class="card-title text-primary mb-3">Welcome {{ $userRole }} {{ $userName }} 🎉</h5>
                            @if ($penagihan->isNotEmpty())
                                <p class="mb-6">
                                    Hai {{ $userName }} Ada tagihan baru nih, cek di link berikut ya! 
                                    <a href="{{ route('penagihan-mitra.index') }}" class="btn btn-sm btn-outline-primary">tagihan</a>
                                </p>
                                
                            @endif
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
