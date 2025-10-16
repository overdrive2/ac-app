<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetRepair extends Model
{
    protected $fillable = [
        'asset_item_id',
        'vendor_id',
        'sent_date',
        'repair_days',
        'symptom',
        'sender_name',
        'contact_person',
        'contact_phone',
        'returned_date',
        'status',
        'note'
    ];

    public function assetItem()
    {
        return $this->belongsTo(AssetItem::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }
}
