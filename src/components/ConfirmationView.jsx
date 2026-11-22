import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmationView({ order, onContinueShopping }) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8">
      <div className="text-center border-b border-gray-200 pb-6">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-sm text-gray-500 mt-1">Thank you for your purchase. Your order details are below.</p>
      </div>

      {/* Order Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-gray-200 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Order ID</p>
          <p className="font-bold text-gray-900 mt-1">{order.orderId}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Customer Name</p>
          <p className="font-semibold text-gray-900 mt-1">
            {order.customer.firstName} {order.customer.lastName}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Order Date</p>
          <p className="font-semibold text-gray-900 mt-1">{order.orderDate}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Order Status</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
            Pending
          </span>
        </div>
      </div>

      {/* Ordered Products */}
      <div className="py-6 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 mb-4">Ordered Products</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <div>
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-gray-500 ml-2">x{item.qty}</span>
              </div>
              <span className="font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="pt-6 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Shipping ({order.shippingMethod === 'express' ? 'Express' : 'Free'})</span>
          <span>${order.shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Payment Method</span>
          <span className="font-medium text-gray-900">
            {order.paymentMethod === 'khqr' ? 'KHQR' : 'Cash on Delivery'}
          </span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
          <span>Total Amount</span>
          <span>${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onContinueShopping}
        className="w-full mt-8 bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
      >
        Back to Store
      </button>
    </div>
  );
}