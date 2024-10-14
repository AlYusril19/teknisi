<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class LaporanKerja extends Model
{
    use HasFactory;

    protected $table = 'laporan_kerja';

    protected $fillable = [
        'user_id', 
        'tanggal_kegiatan', 
        'jam_mulai', 
        'jam_selesai',
        'jenis_kegiatan', 
        'keterangan_kegiatan',
        'barang',
        'barang_kembali',
        'status',
        'alamat_kegiatan',
    ];

    public function galeri()
    {
        return $this->hasMany(Galeri::class, 'laporan_id');
    }
    protected static function boot()
    {
        parent::boot();

        // Event saat laporan dihapus
        static::deleting(function ($laporan) {
            // Hapus semua foto yang terkait dengan laporan ini
            foreach ($laporan->galeri as $foto) {
                // Hapus file gambar dari storage
                Storage::disk('public')->delete($foto->file_path);

                // Hapus data foto dari database
                $foto->delete();
            }
        });
    }
}
