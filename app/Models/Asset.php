<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asset extends Model
{
    protected $fillable = [
        'asset_code',
        'asset_name',
        'asset_kind_id',
        'buy_date',
        'price',
        'warranty_months',
        'vendor_id'
    ];

    // ความสัมพันธ์กับชนิดครุภัณฑ์
    public function kind(): BelongsTo
    {
        return $this->belongsTo(AssetKind::class, 'asset_kind_id');
    }

    // ความสัมพันธ์อ้อมกับประเภทครุภัณฑ์ ผ่าน kind
    public function category(): BelongsTo
    {
        return $this->kind?->category();
    }
}
