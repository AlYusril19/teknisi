@extends($layout)

@section('content')
<div class="row justify-content-center">
        <div class="col-xl-12">
            @include('navbar_profile_user')
            <div class="card">
                <h5 class="card-header">Change Password</h5>
                <!-- Account -->
                <div class="card-body mt-2">
                    <form method="POST" action="{{ route($routePrefix.'.store') }}" enctype="multipart/form-data">
                        @csrf
                        <div class="row g-3">
                            <div class="mb-3 col-md-6">
                                <label for="password" class="form-label">Password (biarkan kosong jika tidak diganti)</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;">
                            </div>
                            <div class="mb-3 col-md-6">
                                <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
                                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;">
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