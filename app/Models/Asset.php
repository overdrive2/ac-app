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
        'price'
    ];

    public function items()
    {
        return $this->hasMany(AssetItem::class);
    }

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

    // ความสัมพันธ์กับผู้ขาย
    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function images()
    {
        return $this->hasMany(AssetImage::class)->orderBy('order');
    }

    /**
     * Get the primary image for the asset (optional, if you define one).
     */
    public function primaryImage()
    {
        return $this->hasOne(AssetImage::class)->where('order', 0); // Assuming order 0 is the primary image
    }

    public static function generateNextCode(int $assetKindId): string
    {
        // ดึง asset_kind มาดู prefix code
        $assetKind = AssetKind::find($assetKindId);

        if (!$assetKind) {
            throw new \Exception("AssetKind not found for ID {$assetKindId}");
        }

        // สมมติ asset_kind มีฟิลด์ asset_code_prefix เช่น "7440-103"
        $prefix = $assetKind->asset_code_prefix ?? $assetKind->asset_code ?? '0000-000';

        // หา asset ล่าสุดใน prefix เดียวกัน
        $lastAsset = self::where('asset_code', 'like', "{$prefix}-%")
            ->orderByDesc('asset_code')
            ->first();

        if (!$lastAsset) {
            // ถ้ายังไม่มีเลย → เริ่มที่ 0001
            return "{$prefix}-0001";
        }

        // ดึงลำดับจากรหัสล่าสุด เช่น "7440-103-0012" => 12
        if (preg_match('/-(\d{4})$/', $lastAsset->asset_code, $m)) {
            $lastNumber = intval($m[1]);
            $nextNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
            return "{$prefix}-{$nextNumber}";
        }

        // ถ้า pattern ไม่ตรง
        return "{$prefix}-0001";
    }

    // สร้างรหัสครุภัณฑ์ย่อยอัตโนมัติ
    public function generateItems(
        int $quantity,
        ?int $vendorId = null,
        ?string $itemName = null,
        ?string $buyDate = null,
        ?float $price = null,
        ?int $warrantyMonths = null,
        ?string $remark = null,
        ?int $brandId = null,
    ) {
        $last = $this->items()->orderByDesc('id')->first();
        $lastNo = 0;

        if ($last && preg_match('/-(\d{4})$/', $last->asset_item_code, $m)) {
            $lastNo = intval($m[1]);
        }

        $newItems = [];
        for ($i = 1; $i <= $quantity; $i++) {
            $seq = str_pad($lastNo + $i, 4, '0', STR_PAD_LEFT);
            $newItems[] = $this->items()->create([
                'asset_item_code' => "{$this->asset_code}-{$seq}",
                'asset_item_name' => $itemName,
                'brand_id' => $brandId,
                'vendor_id' => $vendorId,
                'buy_date' => $buyDate,
                'price' => $price,
                'warranty_months' => $warrantyMonths,
                'remark' => $remark
            ]);
        }

        return $newItems;
    }
}
