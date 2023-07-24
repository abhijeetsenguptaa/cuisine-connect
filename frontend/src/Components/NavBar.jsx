import React from 'react'
import { Link } from 'react-router-dom'


export default function NavBar({ onAddItems, onLogin, onSignUp }) {
    return (
        <div>
            <ul className='flex gap-5 text-xl font-bold justify-end text-white m-3 mr-9'>
                <li onClick={onAddItems}>Add Item</li>
                <li onClick={onLogin}>Login</li>
                <li onClick={onSignUp}>Sign up</li>
                <li><Link to='/menu'>Menu</Link></li>
            </ul>
        </div>
    )
}
