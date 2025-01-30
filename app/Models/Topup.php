<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topup extends Model
{
    use HasFactory;
    protected $table = 'topup';
    protected $fillable = [
        'user_id',
        'amount',
        'metode_bayar',
        'status',
        'bukti_bayar',
        'id_transaksi',
    ];
}
