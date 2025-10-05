<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssetKind extends Model
{
    protected $fillable = [
        'asset_category_id',
        'asset_code',
        'type_name',
        'useful_life',
        'depreciation_rate'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(AssetCategory::class, 'asset_category_id');
    }

    public function assets()
    {
        return $this->hasMany(Asset::class, 'asset_kind_id');
    }
}
