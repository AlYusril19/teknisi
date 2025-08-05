<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GajiStaff extends Model
{
    use HasFactory;
    protected $table = 'gaji_staff';
    protected $fillable = [
        'teknisi_id',
        'periode',
        'gaji_pokok',
        'total_tambahan',
        'total_potongan',
        'total_dibayar',
        'keterangan',
    ];
    public function detailGaji()
    {
        return $this->hasMany(GajiDetail::class);
    }
}
