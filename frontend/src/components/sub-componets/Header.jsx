import React from 'react';
import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import Login from './login.jsx';
import UserN_Cuenta from '../UserN-Cuenta.jsx';
const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <BrowserRouter> */}
            <header >

            <nav>
                <ul className='header-container'>
                    <li onClick={()=>navigate('/Ingreso')}> Login </li>
                    <li onClick={()=>navigate("/pagar")}> Pagar </li>
                </ul>
            </nav>
            </header>

            {/* <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/pagar' element={<UserN_Cuenta />} />

            </Routes> */}

            {/* </BrowserRouter> */}

        </>
    );

};

export default Header;