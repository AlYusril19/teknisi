@extends('layouts.app_sneat')

@section('content')
<div class="row justify-content-center">
        <div class="col-xl-12">
            @include('navbar_profile_user')
            <div class="card">
                <h5 class="card-header">Setting Notifications</h5>
                <div class="card-body mt-2">
                    <form method="POST" action="{{ route($routePrefix.'.store') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row g-3">
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="id_telegram">ID Telegram</label>
                                <input type="numeric" class="form-control" id="id_telegram" name="id_telegram" placeholder="1234567890" value="{{ old('name', $user['id_telegram'] ?? "") }}" required>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="submit" class="btn btn-primary me-2">Simpan</button>
                            <button type="reset" class="btn btn-outline-secondary">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif

    @if($errors->any())
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif
@endsection