<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquents\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
    ];
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
    //
}
