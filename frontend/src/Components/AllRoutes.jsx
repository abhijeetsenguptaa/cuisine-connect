import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Menu from '../Pages/Menu';
import Cart from '../Pages/Cart';


export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/menu' element={<Menu />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
        </Routes>
    )
}
