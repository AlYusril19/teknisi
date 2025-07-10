<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatLaporan extends Model
{
    use HasFactory;
    protected $table = 'chat_laporan';

    protected $fillable = [
        'laporan_id', 
        'user_id', 
        'isi',
        'is_read'
    ];
}
