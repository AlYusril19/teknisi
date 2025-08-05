<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GajiDetailDefault extends Model
{
    use HasFactory;
    protected $table = 'gaji_detail_default';
    protected $fillable = [
        'teknisi_id',
        'role',
        'item_gaji_id',
        'jenis',
        'jumlah',
        'aktif',
    ];

    // Relasi ke item gaji
    public function itemGaji()
    {
        return $this->belongsTo(ItemGaji::class);
    }
}
