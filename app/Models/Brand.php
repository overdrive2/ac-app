<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'brand_name',
        'brand_name_en',
        'model',
        'origin_country',
        'contact_info',
    ];

    public function items()
    {
        return $this->hasMany(AssetItem::class);
    }
}
