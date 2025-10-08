<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'owner_name',
        'tax_id',
    ];
}
