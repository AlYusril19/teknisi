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
        'penagihan_id',
        'tanggal_kegiatan', 
        'jam_mulai', 
        'jam_selesai',
        'jenis_kegiatan', 
        'keterangan_kegiatan',
        'customer_id',
        'barang',
        'barang_kembali',
        'status',
        'alamat_kegiatan',
        'diskon',
        'shift',
    ];

    public function galeri()
    {
        return $this->hasMany(Galeri::class, 'laporan_id');
    }

    public function tagihan()
    {
        return $this->hasMany(Tagihan::class, 'laporan_id');
    }
    public function penagihan() {
        return $this->belongsTo(Penagihan::class, 'penagihan_id', 'id');
    }

    public function teknisi()
    {
        return $this->hasMany(Teknisi::class, 'laporan_id');
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
