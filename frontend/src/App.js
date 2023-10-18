import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserN_Cuenta from './components/UserN-Cuenta';
import Ingreso from './components/Ingreso.jsx';
import Home from './components/Home.jsx';
import "./app.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserCuenta" element={<UserN_Cuenta />} />
        <Route path="/Ingreso" element={<Ingreso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
