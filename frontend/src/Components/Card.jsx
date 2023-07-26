// Card.js
import React, { useState } from 'react';

export default function Card({ image, name, price, availability, handleBuyClick }) {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  return (
    <div className={`border rounded p-4 ${availability === "YES" ? '' : 'opacity-60 pointer-events-none'}`}>
      <img src={image} alt={name} className='w-52 h-40' />
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Price: {price}</p>
      {availability === "YES" ? (
        <p>Availability: In Stock</p>
      ) : (
        <p>Availability: Out of Stock</p>
      )}
      <div className="flex items-center">
        <button onClick={handleDecrement} disabled={availability === "NO"} className="border rounded px-2 py-1 mr-2">
          -
        </button>
        <span>Quantity: {quantity}</span>
        <button onClick={handleIncrement} className={`border rounded px-2 py-1 ml-2 ${availability === "YES" ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} disabled={availability === "NO"}>
          +
        </button>
      </div>
      <button onClick={() => handleBuyClick({ name, price, quantity, setQuantity })} disabled={availability === "NO"} className={`border rounded px-2 py-1 font-bold mt-2 ${availability === "YES" ? 'bg-green-500 text-white' : 'bg-red-500 text-white cursor-not-allowed'}`}>
        Buy
      </button>
    </div>
  );
}
