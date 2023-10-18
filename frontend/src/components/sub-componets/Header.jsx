import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Login from './login.jsx';
import UserN_Cuenta from '../UserN-Cuenta.jsx';
const Header = () => {

    return (
        <>
            <BrowserRouter>
            <header >

            <nav>
                <ul className='header-container'>
                    <li> <NavLink to='/login' > Login </NavLink> </li>
                    <li> <NavLink to='/pagar'>Pagar</NavLink> </li>
                </ul>
            </nav>
            </header>

            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/pagar' element={<UserN_Cuenta />} />

            </Routes>

            </BrowserRouter>

        </>
    );

};

export default Header;