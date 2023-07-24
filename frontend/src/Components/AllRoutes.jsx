import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Menu from '../Pages/Menu';


export default function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/menu' element={<Menu />}></Route>
        </Routes>
    )
}
