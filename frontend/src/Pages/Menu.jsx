import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import axios from "axios";
import LogoutButton from "../Components/LogoutButton";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart } from 'react-icons/fi';
import { AiOutlineHome } from "react-icons/ai";

export default function Menu() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token is present

  const handleLogout = () => {
    // Perform logout logic here, such as removing the token from local storage
    localStorage.removeItem('token');
    window.location.href = "/"
    setLoggedIn(false);
  };

  const addToCart = ({ name, price, quantity, setQuantity }) => {
    const cartPurchase = {
      item_name: name,
      quantity: quantity,
      total_price: quantity * price,
      status: 'pending'
    };

    const token = localStorage.getItem('token');

    if (token) {
      axios
        .post("http://localhost:8080/cart/purchase", cartPurchase, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((res) => {
          toast.success(res.data.msg);
          setQuantity(1);
        })
        .catch((error) => {
          toast.error("Error adding item to cart:", error);
          // Add code here to display an error message to the user
        });
    } else {
      // User is not logged in, display a notification or alert
      toast.error("Login is required to add items to the cart.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/menu/")
      .then((res) => {
        setData(res.data.menu_items);
        toast.success("Menu items fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        toast.error("Error fetching menu items. Please try again later.");
      });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="bg-black p-4 text-white font-bold flex justify-between items-center">
      <div className="flex items-center">
          <Link to="/">
            <AiOutlineHome className="h-6 w-6 cursor-pointer" />
          </Link>
        </div>
        <Link to="/cart">
          <FiShoppingCart className="h-6 w-6 cursor-pointer" />
        </Link>
      </div>
      <div className="flex gap-5 p-8">
        {data.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            name={card.name}
            price={card.price}
            availability={card.availability}
            handleBuyClick={(itemDetails) => {
              addToCart(itemDetails);
            }}
          />
        ))}
      </div>
      <div className='fixed bottom-2 right-2'>
        {loggedIn && <LogoutButton handleLogout={handleLogout} />}
      </div>
      {/* Add the ToastContainer component here */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
