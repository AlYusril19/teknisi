<?php 
// Daftarkan helper di composer.json
// dan jalankan menggunakan composer dump-autoload
// Helper function untuk mendapatkan data pengguna dari session
function getUserRole()
{
    return session('user_role');
}