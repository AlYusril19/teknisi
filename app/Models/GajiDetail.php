<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GajiDetail extends Model
{
    use HasFactory;
    protected $table = 'gaji_detail';
    protected $fillable = [
        'gaji_staff_id',
        'jenis',
        'nama',
        'jumlah',
    ];
    public function gajiStaff()
    {
        return $this->belongsTo(GajiStaff::class, 'gaji_staff_id');
    }

    public function itemGaji()
    {
        return $this->belongsTo(ItemGaji::class, 'item_gaji_id');
    }
}
