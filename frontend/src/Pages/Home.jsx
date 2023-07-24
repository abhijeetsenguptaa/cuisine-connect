import React, { useState } from 'react';
import NavBar from '../Components/NavBar';

function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showAddItems, setShowAddItems] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [item_name, setItem_Name] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    // const [itemsList, setItemsList] = useState([]);
    const [availability, setAvailability] = useState('YES');

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }


    const handleQuantityChange = (e) => {
        setQuantity(e.target.value)
    }


    const toggleLogin = () => {
        setShowLogin(!showLogin);
    };


    const toggleSignUp = () => {
        setShowSignUp(!showSignUp)
    }

    const toggleAddItems = () => {
        setShowAddItems(!showAddItems)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleItemChange = (e) => {
        setItem_Name(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        // Clear form fields
        setEmail('');
        setPassword('');
    };

    const handleAddItems = (e) => {
        e.preventDefault();
        let items = {
            'name': item_name,
            'price': price,
            'quantity': quantity,
            'availability':availability
        }
        console.log(items);
        setItem_Name('');
        setPrice('0');
        setQuantity(1);
        setAvailability('YES');
    };

    return (
        <div className="relative">
            <NavBar onLogin={toggleLogin} onAddItems={toggleAddItems} onSignUp={toggleSignUp} />
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
                        <form onSubmit={handleLogin}>
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
        </div>
    );
}

export default Home;
