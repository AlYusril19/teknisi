<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biaya extends Model
{
    use HasFactory;
    protected $table = 'biaya';

    protected $fillable = [
        'customer_id', 
        'jam_kerja', 
        'jam_lembur', 
        'kabel', 
        'transport',
        'jarak_tempuh'
    ];
}
