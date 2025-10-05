<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssetCategory extends Model
{
    protected $fillable = [
        'code',
        'name',
        'name_en',
    ];

    public function AssetKinds(): HasMany
    {
        return $this->hasMany(AssetKind::class);
    }
}
