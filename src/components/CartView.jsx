import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function CartView({ cart, onUpdateQty, onRemoveItem, onNavigate }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = subtotal; // Shipping calculated at checkout

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-lg mx-auto my-8">
        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">Add some products from the store to get started.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => onNavigate('shop')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Cart ({cart.length} items)</h1>

          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex gap-5 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100 border border-gray-200"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.specs}</p>
                      <p className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)} each</p>
                    </div>
                    <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                  </div>

                  {/* Update QTY & Remove Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        disabled={item.qty === 1}
                        className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l-lg disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                        title="Decrease Quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 text-sm font-medium text-gray-900">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r-lg"
                        title="Increase Quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 transition-colors flex items-center gap-1 text-xs"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

          <div className="space-y-3 text-sm border-b border-gray-200 pb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 text-base font-bold text-gray-900">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors mt-2"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}