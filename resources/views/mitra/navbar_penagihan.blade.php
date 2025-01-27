<div class="row mb-1">
    <div class="col-6">
        <div class="nav-align-top">
            <ul class="nav nav-pills flex-column mb-6">
                <li class="nav-item">
                    <a class="nav-link {{ \Route::is('penagihan-mitra.index') ? 'active' : '' }}" href="{{ route('penagihan-mitra.index') }}">
                        <i class="bx bx-sm bx-user me-1_5"></i> Tagihan Saya
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-6">  
        <div class="nav-align-top">
            <ul class="nav nav-pills flex-column mb-6">
                <li class="nav-item">
                    <a class="nav-link {{ \Route::is('coming-soon.index') ? 'active' : '' }}" href="{{ route('coming-soon.index') }}">
                        <i class="bx bx-sm bx-bell me-1_5"></i> Tagihan Mendatang
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>