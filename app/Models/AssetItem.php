<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetItem extends Model
{
    protected $fillable = [
        'asset_id', 'asset_item_code', 'asset_item_name', 'brand_id', 'vendor_id', 'buy_date',
        'price', 'warranty_months', 'serial_number', 'status', 'remark'
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
