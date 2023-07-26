import React from 'react';

export default function CartTemplate({ item_name, quantity, total_price, status }) {
  return (
    <div className="border rounded p-4">
      <h2 className="text-xl font-bold">{item_name}</h2>
      <p>Quantity: {quantity}</p>
      <p>Total Price: {total_price}</p>
      <p>Status: {status}</p>
    </div>
  );
}
