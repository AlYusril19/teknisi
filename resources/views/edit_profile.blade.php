@extends($layout)

@section('content')
<div class="row justify-content-center">
        <div class="col-xl-12">
            @include('navbar_profile_user')
            <div class="card">
                {{-- <h5 class="card-header">Profile Details</h5> --}}
                <!-- Account -->
                <div class="card-body">
                    <form id="formUploadPhoto" enctype="multipart/form-data">
                        <div class="d-flex align-items-start align-items-sm-center gap-4">
                            <img
                                src="{{ $userProfil ? config('api.base_url').'/storage/'.$userProfil : asset('sneat/assets/img/avatars/1.png') }}"
                                alt="user-avatar"
                                class="d-block rounded"
                                height="100"
                                width="100"
                                id="uploadedAvatar"
                                />
                            <div class="button-wrapper">
                                <label for="photo" class="btn btn-primary me-2 mb-2" tabindex="0">
                                    <span class="d-none d-sm-block">Upload new photo</span>
                                    <i class="bx bx-upload d-block d-sm-none"></i>
                                    <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    class="account-file-input"
                                    hidden
                                    accept="image/*"
                                    />
                                </label>

                                <button type="button" class="account-image-reset" hidden> </button>

                                <p class="mb-0">Allowed JPG, GIF or PNG. Max size of 2048K</p>
                            </div>
                        </div>
                        <hr>
                    </form>
                </div>
                <div class="card-body">
                    <form method="POST" action="{{ route($routePrefix.'.store') }}" enctype="multipart/form-data">
                        @csrf
                        {{-- @method('PUT') --}}
                        <div class="row g-3">
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="name">Nama</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Budiono Siregar" value="{{ old('name', $user['name']) }}" required>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="email">Email</label>
                                <input type="text" class="form-control" id="email" name="email" placeholder="budiono@skytama.com" value="{{ old('email', $user['email']) }}" required>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="nohp">No HP</label>
                                <input type="numeric" class="form-control" id="nohp" name="nohp" placeholder="085712345678" value="{{ old('nohp', $user['nohp'] ?? "") }}" required>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="alamat">Alamat</label>
                                <input type="numeric" class="form-control" id="alamat" name="alamat" placeholder="RT.05 RW.02 Ds. Kalikatir Kec. Gondang Mojokerto" value="{{ old('alamat', $user['alamat'] ?? "") }}" required>
                            </div>
                            <div class="mb-3 col-md-6">
                                <label class="form-label" for="tanggal_lahir">Tanggal Lahir</label>
                                <input type="date" class="form-control" id="tanggal_lahir" name="tanggal_lahir" value="{{ old('tanggal_lahir', $user['tanggal_lahir'] ?? "") }}" required>
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="submit" class="btn btn-primary me-2">Simpan</button>
                            <button type="reset" class="btn btn-outline-secondary">Batal</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Modal crop -->
            <div id="cropModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
                background:#fff; padding:20px; z-index:9999; border-radius:10px; box-shadow:0 0 12px rgba(0,0,0,0.3);">
                <div id="cropContainer"></div>
                <button id="cropSaveBtn">Simpan Crop & Upload</button>
                <button id="cropCancelBtn">Batal</button>
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