import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from './data/products';
import ShopView from './components/ShopView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import ConfirmationView from './components/ConfirmationView';

export default function App() {
  const [page, setPage] = useState('shop'); // 'shop' | 'cart' | 'checkout' | 'confirmation'
  const [cart, setCart] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePlaceOrder = (data) => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    setOrderDetails({
      ...data,
      orderId: 'ORD-0001',
      orderDate: today,
    });
    setCart([]);
    setPage('confirmation');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setPage('shop')}
            className="text-xl font-bold tracking-tight text-black"
          >
            TechStore
          </button>

          <nav className="flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setPage('shop')}
              className={page === 'shop' ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}
            >
              Products
            </button>

            <button
              onClick={() => setPage('cart')}
              className="relative flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {page === 'shop' && (
          <ShopView
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            addedId={addedId}
          />
        )}

        {page === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onNavigate={setPage}
          />
        )}

        {page === 'checkout' && (
          <CheckoutView
            cart={cart}
            onBack={() => setPage('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {page === 'confirmation' && orderDetails && (
          <ConfirmationView
            order={orderDetails}
            onContinueShopping={() => setPage('shop')}
          />
        )}
      </main>
    </div>
  );
}