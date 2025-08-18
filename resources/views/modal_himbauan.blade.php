<!-- Modal -->
 <div class="modal fade" id="himbauanModal" tabindex="-1" aria-labelledby="himbauanModalLabel" aria-hidden="true">
     <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
             <div class="modal-header bg-warning d-flex justify-content-center">
                 <h3 class="modal-title" id="himbauanModalLabel">Pengumuman</h3>
             </div>
             <h6 class="modal-body d-flex justify-content-center">
                 Harap lengkapi data diri anda.
             </h6>
             <div class="modal-footer">
                @if ($userRole === 'mitra')
                    <a href="{{ route('mitra.create') }}" class="btn btn-primary">Update Profil</a>
                @elseif($userRole === 'staff' || $userRole === 'magang')
                    <a href="{{ route('teknisi.create') }}" class="btn btn-primary">Update Profil</a>
                @else
                    <a href="{{ route('admin.create') }}" class="btn btn-primary">Update Profil</a>
                @endif
                 {{-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button> --}}
             </div>
         </div>
     </div>
 </div>