import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LogoutButton from '../Components/LogoutButton';
import CartTemplate from '../Components/CartTemplate';


export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token is present

  const handleLogout = () => {
    // Perform logout logic here, such as removing the token from local storage
    localStorage.removeItem('token');
    window.location.href = '/';
    setLoggedIn(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/cart/cartdetails', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }) // Replace with your cart API endpoint
      .then((res) => {
        setCartItems(res.data.cart_items);
        toast.success('Cart items fetched successfully!');
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        toast.error('No items in the Cart.');
      });
  }, []);

  const handleDelete = (itemId) => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`http://localhost:8080/cart/delete/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success('Item removed from the cart successfully!');
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== itemId)
          );
        })
        .catch((error) => {
          console.error('Error deleting item from cart:', error);
          toast.error('Error deleting item from the cart. Please try again later.');
        });
    } else {
      // User is not logged in, display a notification or alert
      toast.error('Login is required to delete items from the cart.');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="bg-black p-4 text-white font-bold flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <AiOutlineHome className="text-xl mr-2 cursor-pointer" />
          </Link>
          <span>Home</span>
        </div>
        <div className="flex items-center">
          <Link to="/menu">
            <AiOutlineMenu className="text-xl mr-2 cursor-pointer" />
          </Link>
          <span>Menu</span>
        </div>
      </div>
      {/* Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {cartItems.map((item, index) => (
          <CartTemplate
            key={index}
            item_name={item.item_name}
            quantity={item.quantity}
            total_price={item.total_price}
            status={item.status}
            onDelete={() => handleDelete(item._id)}
          />
        ))}
      </div>
      <div className="fixed bottom-2 right-2">
        {loggedIn && <LogoutButton handleLogout={handleLogout} />}
      </div>
      {/* Add the ToastContainer component here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
