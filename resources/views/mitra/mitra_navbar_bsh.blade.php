<nav
  class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme mt-2"
  id="layout-navbar"
>
  <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
    <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
      <img src="{{ asset('sneat') }}/assets/img/icons/customs/back.png" alt class="w-px-30 h-auto rounded-circle" />
    </a>
  </div>
  {{-- tittle --}}
  <div class="navbar-nav align-items-center">
    <div class="nav-item d-flex align-items-center">
      <i class="bx bx-search fs-4 lh-0"></i>
      <input
        type="text"
        class="form-control border-0 shadow-none"
        placeholder="Search..."
        aria-label="Search..."
      />
    </div>
  </div>
  <div class="layout-menu-toggle navbar-nav align-items-xl-center d-xl-none">
    <a class="nav-item nav-link px-0" href="javascript:void(0)">
      <img src="{{ asset('sneat') }}/assets/img/icons/customs/home-button.png" alt class="w-px-30 h-auto rounded-circle" />
    </a>
  </div>
</nav>