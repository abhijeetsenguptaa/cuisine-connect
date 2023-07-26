import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar({ onAddItems, onLogin, onSignUp, tailwindCSS }) {
    return (
        <div>
            <ul className={tailwindCSS}>
                <li onClick={onAddItems} className=' hover:cursor-pointer'>Add Item</li>
                <li onClick={onLogin} className=' hover:cursor-pointer'>Login</li>
                <li onClick={onSignUp} className=' hover:cursor-pointer'>Sign up</li>
                <li className=' hover:cursor-pointer'><Link to='/menu'>Menu</Link></li>
            </ul>
        </div>
    )
}
