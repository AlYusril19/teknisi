<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penagihan extends Model
{
    use HasFactory;
    protected $table = 'penagihan';
    protected $fillable = [
        'customer_id',
        'user_id',
        'tanggal_tagihan',
        'tanggal_jatuh_tempo',
        'tanggal_lunas',
        'diskon',
        'status',
        'keterangan'
    ];

    public function laporan_kerja()
    {
        return $this->hasMany(LaporanKerja::class, 'penagihan_id');
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class, 'penagihan_id');
    }
}
