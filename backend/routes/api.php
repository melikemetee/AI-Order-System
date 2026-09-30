<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Order;
use App\Http\Controllers\OrderController;

Route::get('/products', function () {
    return Product::all();
});

Route::post('/orders', [OrderController::class, 'store']);

Route::put('/orders/{id}', [OrderController::class, 'update']);

Route::get('/orders', function () {
    return Order::all();
});
