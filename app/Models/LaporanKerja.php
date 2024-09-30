<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaporanKerja extends Model
{
    use HasFactory;

    protected $table = 'laporan_kerja';

    protected $fillable = [
        'user_id', 
        'tanggal_kegiatan', 
        'jam_mulai', 
        'jam_selesai',
        'jenis_kegiatan', 
        'keterangan_kegiatan',
        'barang',
        'status',
    ];
}
