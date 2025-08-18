<ul class="nav nav-pills flex-column flex-md-row mb-3">
    <li class="nav-item">
        <a class="nav-link {{ \Route::is($routePrefix.'.create') && (request('menu') === 'account' || request()->missing('menu')) ? 'active' : '' }}" href="{{ route($routePrefix.'.create') }}?menu=account">
            <i class="icon-base bx bx-user icon-sm me-1"></i> Account
            @if ($user['alamat'] === null || $user['tanggal_lahir'] === null)
                <span class="badge bg-primary ms-2">New</span>
            @endif
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{ \Route::is($routePrefix.'.create') && request('menu') === 'notification' ? 'active' : '' }}" href="{{ route($routePrefix.'.create') }}?menu=notification">
            <i class="icon-base bx bx-bell icon-sm me-1"></i> Notification
            @if ($idTele === null)
                <span class="badge bg-primary ms-2">New</span>
            @endif
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link {{ \Route::is($routePrefix.'.create') && request('menu') === 'security' ? 'active' : '' }}" href="{{ route($routePrefix.'.create') }}?menu=security">
            <i class="icon-base bx bx-lock-alt icon-sm me-1"></i> Security
        </a>
    </li>
</ul>