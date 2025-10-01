<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetKind extends Model
{
    protected $fillable = [        
        'asset_category_id',
        'asset_code',
        'type_name',
        'useful_life',
        'depreciation_rate'
    ];
}
