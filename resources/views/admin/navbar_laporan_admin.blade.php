<div class="nav-align-top">
    <ul class="nav nav-pills flex-column flex-md-row mb-6">
        <li class="nav-item"><a class="nav-link {{ \Route::is('laporan-admin.create') ? 'active' : '' }}" href="{{ route('laporan-admin.create') }}"><i class="bx bx-sm bx-user me-1_5"></i> Pending</a></li>
        <li class="nav-item"><a class="nav-link {{ \Route::is('laporan-admin.index') ? 'active' : '' }}" href="{{ route('laporan-admin.index') }}"><i class="bx bx-sm bx-bell me-1_5"></i> Selesai</a></li>
        {{-- <li class="nav-item"><a class="nav-link" href="pages-account-settings-connections.html"><i class="bx bx-sm bx-link-alt me-1_5"></i> Connections</a></li> --}}
    </ul>
</div>