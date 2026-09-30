<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required',
            'quantity' => 'required',
            'customer_name' => 'required',
            'phone_number' => 'required',
            'addresss' => 'required'
        ]);

        $product = Product::where('name', $request->product_name)->first();

        if (!$product) {
            return response()->json([
                'message' => 'Ürün bulunamadı.'
            ], 404);
        }

        if ($request->quantity > $product->stock) {
            return response()->json([
                'message' => 'Yeterli stok yok.',
                'stock' => $product->stock
            ], 400);
        }

        $totalPrice = $product->price * $request->quantity;

        $order = Order::create([
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'customer_name' => $request->customer_name,
            'phone_number' => $request->phone_number,
            'addresss' => $request->addresss,
            'total_price' => $totalPrice,
            'status' => 'pending'
        ]);

        $product->stock = $product->stock - $request->quantity;
        $product->save();

        return response()->json([
            'message' => 'Sipariş oluşturuldu.',
            'order' => $order
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Sipariş bulunamadı.'
            ], 404);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Sipariş durumu güncellendi.',
            'order' => $order
        ]);
    }
}