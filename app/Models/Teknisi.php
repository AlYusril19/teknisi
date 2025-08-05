<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teknisi extends Model
{
    use HasFactory;
    protected $table = 'teknisi';

    protected $fillable = [
        'laporan_id',
        'teknisi_id',
        'helper'
    ];
}
