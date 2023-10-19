import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./header.css"
const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='header' >

            <nav>
                <ul className='header-container'>
                    <li className='bottoms' onClick={()=>navigate('/Ingreso')}> Login </li>
                    <li className='bottoms' onClick={()=>navigate("/pagar")}> Pagar </li>
                </ul>
            </nav>
            </div>
        </>
    );

};

export default Header;