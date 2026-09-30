<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'product_name',
        'quantity',
        'customer_name',
        'phone_number',
        'addresss',
        'total_price',
        'status',
    ];
}