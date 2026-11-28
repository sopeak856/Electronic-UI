import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';

export default function ShopView({ products, onAddToCart, addedId }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tech Store</h1>
        <p className="text-sm text-gray-500 mt-1">Select products to add to your shopping cart.</p>
      </div>

      {products.length === 0 ? (
        <p className="text-sm text-gray-500">No products are available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{product.specs}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onAddToCart(product)}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                    addedId === product.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {addedId === product.id ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}