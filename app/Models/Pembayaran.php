<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;
    protected $table = 'pembayaran';
    protected $fillable = [
        'bank_id',
        'penagihan_id',
        'customer_id',
        'tanggal_bayar',
        'tanggal_konfirmasi',
        'jumlah_dibayar',
        'status',
        'bukti_bayar'
    ];

    public function penagihan() {
        return $this->belongsTo(Penagihan::class, 'penagihan_id', 'id')
            ->with('laporan_kerja.tagihan');
    }
}
