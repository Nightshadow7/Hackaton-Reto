import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserN_Cuenta from './components/UserN-Cuenta';
import Ingreso from './components/Ingreso.jsx';
import Home from './components/Home.jsx';
import Header from './components/sub-componets/Header';
import "./app.css"
import Pay from './components/pay';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserCuenta" element={<UserN_Cuenta />} />
        <Route path="/Ingreso" element={<Ingreso />} />
        <Route path="/header" element={<Header />} />
        <Route path='/home' element={<UserN_Cuenta />}></Route>
        <Route path='/pagar' element={<Pay />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
