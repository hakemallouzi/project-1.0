import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const cartItemsCount = getTotalItems();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleItemSelect = (itemId, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach(itemId => {
      removeFromCart(itemId);
    });
    setSelectedItems(new Set());
  };

  const isAllSelected = cartItems.length > 0 && selectedItems.size === cartItems.length;
  const subtotal = calculateSubtotal();
  const shipping = 50;
  const total = (parseFloat(subtotal) + shipping).toFixed(2);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 max-h-[calc(100vh-8rem)]">
      <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Logo on the left */}
          <img src="imgs/Jewelry-Logo.jpg" alt="Logo" className="w-32" />

          {/* Cart Title and Count in the center */}
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Cart</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">You have {cartItemsCount} items in your cart</p>
          </div>
        </div>


      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 py-6">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="sticky top-0 bg-white dark:bg-gray-900 z-10">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">All Products</span>

                    {selectedItems.size > 0 && (
                      <button
                        onClick={handleRemoveSelected}
                        className="ml-4 text-sm text-red-500 hover:underline"
                      >
                        Remove All
                      </button>
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-24 text-center">Quantity</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-24 text-right">Price</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-24 text-right">Subtotal</span>
                  </div>
                </div>

                <div className="border-b border-gray-200 dark:border-gray-700" />
              </div>

              <div className="overflow-y-auto flex-1 pr-4 -mr-4">
                <div className="space-y-6 py-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-6">
                      <div className="flex items-center space-x-4 flex-grow">
                        <input
                          type="checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={(e) => handleItemSelect(item.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain bg-white dark:bg-gray-800 p-2"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.color} | {item.size}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md w-20 justify-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-1.5 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            -
                          </button>
                          <span className="w-7 text-center py-0.5 text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-1.5 py-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <span className="w-20 text-right text-gray-900 dark:text-white">${item.price}</span>
                        <span className="w-20 text-right font-medium text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg sticky top-6">
                <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white">
                    <span>Grand Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                <button className="w-full bg-black dark:bg-gray-950 text-white py-3 rounded mt-6 hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors">
                  Checkout Now
                </button>
                <Link
                  to="/shop"
                  className="block text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
