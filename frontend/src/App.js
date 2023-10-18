import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserN_Cuenta from './components/UserN-Cuenta';
import Ingreso from './components/Ingreso.jsx';
import Home from './components/Home.jsx';
import Header from './components/sub-componets/Header';
import Plantilla from './components/Plantilla';
import EditPlantilla from './components/EditPlantilla';
import "./app.css"
import Pay from './components/pay';
import QRsDisponibles from './components/QRsDisponibles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserCuenta" element={<UserN_Cuenta />} />   {/*protegida*/}
        <Route path="/Ingreso" element={<Ingreso />} />
        <Route path='/pagar' element={<Pay />}></Route>
        <Route path='/codigos-qr' element={<QRsDisponibles />}/>  {/*protegida*/}
        <Route path='/plantilla' element={<Plantilla />}/>        {/*protegida*/}
        <Route path='/edit' element={<EditPlantilla />}/>         {/*protegida*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
