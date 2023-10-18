import React from 'react';
import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import UserN_Cuenta from '../UserN-Cuenta.jsx';
import "./header.css"
const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* <BrowserRouter> */}
            <div className='header' >

            <nav>
                <ul className='header-container'>
                    <li className='bottoms' onClick={()=>navigate('/Ingreso')}> Login </li>
                    <li className='bottoms' onClick={()=>navigate("/pagar")}> Pagar </li>
                </ul>
            </nav>
            </div>

            {/* <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/pagar' element={<UserN_Cuenta />} />

            </Routes> */}

            {/* </BrowserRouter> */}

        </>
    );

};

export default Header;