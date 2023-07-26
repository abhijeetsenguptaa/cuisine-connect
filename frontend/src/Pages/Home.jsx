import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutButton from "../Components/LogoutButton";



function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [item_name, setItem_Name] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [availability, setAvailability] = useState("YES");
    const [imageURL, setImageURL] = useState("")
    const [username, setUsername] = useState("")
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token is present

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = "/"
        setLoggedIn(false);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };

    const toggleSignUp = () => {
        setShowSignUp(!showSignUp);
    };

    const toggleAddItems = () => {
        setShowAddItems(!showAddItems);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleItemChange = (e) => {
        setItem_Name(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageURL(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        let user = {
            email: email,
            password: password
        }

        axios
            .post("http://localhost:8080/user/login", user)
            .then((res) => {
                if (res.data.message === "Login successful!") {
                    toast.success(res.data.message);
                    localStorage.setItem('token', res.data.token)
                    setTimeout(()=>{
                        window.location.href = "/menu"
                    },2500)
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((error) => {
                toast.error("An error occurred while logging in. Please try again later.");
            });

        setEmail("");
        setPassword("");
    };

    const handleRegister = (e) => {
        e.preventDefault();

        let user = {
            name: username,
            email: email,
            password: password
        }

        axios
            .post("http://localhost:8080/user/register", user)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    toast.error("User with this email already exists. Please use a different email.");
                } else {
                    toast.error("An error occurred while registering. Please try again later.");
                }
            });

        setEmail("");
        setPassword("");
    };

    const handleAddItems = (e) => {
        e.preventDefault();
        let items = {
            name: item_name,
            price: price,
            quantity: quantity,
            availability: availability,
            image: imageURL
        };

        axios
            .post("http://localhost:8080/menu/insert", items)
            .then((res) => toast.success(res.data.msg))
            .catch((error) => toast.error("An error occurred while adding items. Please try again later."));
        
        setItem_Name("");
        setPrice("0");
        setQuantity(1);
        setAvailability("YES");
        setImageURL("");
    };

    return (
        <div className="relative">
            <NavBar
                onLogin={toggleLogin}
                onAddItems={toggleAddItems}
                onSignUp={toggleSignUp}
                tailwindCSS={'flex gap-5 text-xl font-bold justify-end text-white m-3 mr-9'}
            />
            <div
                className="flex justify-center items-center bg-cover bg-center bg-no-repeat h-screen -mt-14"
                style={{
                    backgroundImage:
                        "url('https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png')",
                }}
            >
                <div className="p-12 text-white text-center">
                    <h1 className="font-bold text-6xl my-4">Cuisine-Connect</h1>
                    <h2 className="text-4xl">
                        Find the best restaurants, cafes and bars in India
                    </h2>
                </div>
            </div>
            {showLogin && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        {/* Login form and content */}
                        <h3 className="text-xl font-bold mb-4">Login</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 p-3 w-full text-white font-bold rounded shadow-lg"
                            >
                                Login
                            </button>
                        </form>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded mt-2"
                            onClick={toggleLogin}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showSignUp && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                        {/* Signup form */}
                        <h3 className="text-xl font-bold mb-4">Sign up</h3>
                        <form onSubmit={handleRegister}>
                            <label htmlFor="name" className="block text-gray-700">
                                Name:
                            </label>
                            <input
                                type="name"
                                id="name"
                                value={username}
                                onChange={handleNameChange}
                                className="border p-2 w-full"
                                required
                            />
                            <label htmlFor="email" className="block text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="border p-2 w-full"
                                required
                            />

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="border p-2 w-full"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-600 p-3 w-full text-white font-bold rounded shadow-lg"
                            >
                                Sign up
                            </button>
                        </form>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded mt-2"
                            onClick={toggleSignUp}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {showAddItems && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 animate-slide-up">
                    <div className="bg-white p-4 rounded shadow-lg">
                        {/* Add Items menu */}
                        <h3 className="text-xl font-bold mb-4">Add Items</h3>
                        {/* Add your Add Items menu content here */}
                        <form onSubmit={handleAddItems}>
                            <label htmlFor="name" className="block text-gray-700">
                                Name:
                            </label>
                            <input
                                type="text"
                                value={item_name}
                                onChange={handleItemChange}
                                className="border p-2 w-full"
                                required
                            />
                            <label htmlFor="name" className="block text-gray-700">
                                Price:
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={handlePriceChange}
                                className="border p-2 w-full"
                                required
                            />
                            <label htmlFor="name" className="block text-gray-700">
                                Quantity:
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="border p-2 w-full"
                                required
                            />
                            <label htmlFor="name" className="block text-gray-700">
                                Image URL:
                            </label>
                            <input
                                type="url"
                                value={imageURL}
                                onChange={handleImageUrlChange}
                                className="border p-2 w-full"
                                required
                            />
                            <select name="availability" className="text-gray-700">
                                <option value="">Availability</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-green-600 p-3 w-full text-white font-bold rounded shadow-lg"
                            >
                                ADD Items
                            </button>
                        </form>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded mt-2"
                            onClick={toggleAddItems}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
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

export default Home;
