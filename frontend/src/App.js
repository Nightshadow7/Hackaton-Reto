import React from 'react';
import UserN_Cuenta from './components/UserN-Cuenta';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/UserCuenta" element={<UserN_Cuenta/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
