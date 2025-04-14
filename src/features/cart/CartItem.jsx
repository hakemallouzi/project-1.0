import React, { useState } from 'react';

const CartItem = ({ title, price = 2500 }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(q => q - 1);

  return (
    <div className="flex items-center border-b py-4">
      <input type="checkbox" className="mr-4" defaultChecked />
      <img src="https://picsum.photos/80/80" className="w-20 h-auto" alt="cart" />
      <div className="ml-4 flex-1">
        <p className="font-bold">{title}</p>
        <p className="text-gray-500">Green | M</p>

      </div>
      <div>
        <div className="flex items-center">
          <button onClick={decreaseQuantity} className="px-2 py-1 border bg-gray-100 dark:bg-gray-800">-</button>
          <span className="px-4">{quantity}</span>
          <button onClick={increaseQuantity} className="px-2 py-1 border bg-gray-100 dark:bg-gray-800">+</button>

        </div>
        <button className="text-sm text-gray-500 mt-2">🗑️ Remove</button></div>
      <div className="w-28 text-right font-bold">${(price * quantity).toLocaleString()}</div>
    </div>
  );
};

export default CartItem;
