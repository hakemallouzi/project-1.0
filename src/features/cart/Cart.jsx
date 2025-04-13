import React from 'react';
import CartItem from './CartItem';
import { useCartItems } from '../../hooks/useCartItems';

const Cart = () => {
  const { data, isLoading, error } = useCartItems();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart items</div>;

  const pricePerItem = 2500;
  const subtotal = data.length * pricePerItem;
  const shipping = 50;
  const grandTotal = subtotal + shipping;

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-8">

      <div className="w-full lg:w-2/3">
        {data.map(item => (
          <CartItem key={item.id} title={item.title} />
        ))}
      </div>


      <div className="w-full lg:w-1/3 border p-6 shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Tax</span>
          <span>Free</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold my-4">
          <span>Grand Total</span>
          <span>${grandTotal.toLocaleString()}</span>
        </div>
        <button className="w-full bg-black text-white py-2 rounded">Checkout Now</button>
      </div>
    </div>
  );
};

export default Cart;
