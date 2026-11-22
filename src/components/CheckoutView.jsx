import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutView({ cart, onBack, onPlaceOrder }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [shippingMethod, setShippingMethod] = useState('free'); // 'free' ($0) or 'express' ($9)
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = shippingMethod === 'express' ? 9 : 0;
  const grandTotal = subtotal + shippingCost;

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onPlaceOrder({
      customer: form,
      shippingMethod,
      paymentMethod,
      shippingCost,
      subtotal,
      grandTotal,
      items: cart,
    });
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Customer Details & Shipping Method */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="Enter first name"
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="Enter last name"
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com"
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+855 12 345 678"
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  rows="3"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Street, Sangkat, Khan, City..."
                  className={`w-full px-3.5 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
                    errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                  }`}
                />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Shipping Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`border rounded-xl p-4 cursor-pointer flex items-center justify-between transition-colors ${
                  shippingMethod === 'free' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'free'}
                    onChange={() => setShippingMethod('free')}
                    className="accent-black"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">7–20 Days</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">$0</span>
              </label>

              <label
                className={`border rounded-xl p-4 cursor-pointer flex items-center justify-between transition-colors ${
                  shippingMethod === 'express' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="accent-black"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Express Shipping</p>
                    <p className="text-xs text-gray-500">1–3 Days</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">$9</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`border rounded-xl p-4 cursor-pointer flex items-center transition-colors ${
                  paymentMethod === 'khqr' ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'khqr'}
                  onChange={() => setPaymentMethod('khqr')}
                  className="accent-red-600"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">KHQR</p>
                  <p className="text-xs text-gray-500">Pay securely with KHQR</p>
                </div>
              </label>

              <label
                className={`border rounded-xl p-4 cursor-pointer flex items-center transition-colors ${
                  paymentMethod === 'cod' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-black"
                />
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when your order arrives</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Cart</h2>

          <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-b border-gray-200 pb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">${shippingCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 text-base font-bold text-gray-900">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}