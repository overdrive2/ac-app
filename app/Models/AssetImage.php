<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AssetImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'file_path_original',
        'file_path_thumbnail',
        'alt_text',
        'order',
    ];

    public $appends = [
        'thumbnail_image_url',
        'original_image_url',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    /**
     * Get the full URL for the thumbnail image.
     */
    public function getThumbnailImageUrlAttribute()
    {
        return route('private.file', ['path' => $this->file_path_thumbnail]);
    }

    public function getOriginalImageUrlAttribute()
    {
        return route('private.file', ['path' => $this->file_path_original]);
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // When an AssetImage is deleted, delete the physical files
        static::deleting(function ($image) {
            Storage::delete($image->file_path_original);
            Storage::delete($image->file_path_thumbnail);
        });
    }
}
