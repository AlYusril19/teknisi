<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemGaji extends Model
{
    use HasFactory;
    protected $table = 'item_gaji';
    protected $fillable = [
        'nama',
        'jenis',
        'jumlah',
        'aktif',
    ];
    public function detailGaji()
    {
        return $this->hasMany(GajiDetail::class);
    }
    // Relasi ke default gaji teknisi
    public function defaultDetails()
    {
        return $this->hasMany(GajiDetailDefault::class);
    }
}
