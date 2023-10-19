import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../resources/header.jpg";
import "./adminDashboard.css"
import lupa from '../resources/busqueda-de-lupa.png'

export default function AdminDashboard() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      return navigate("/Ingreso");
    }
    if (usuario.rol !== "ENTIDAD") {
      return navigate("/UserCuenta");
    }
  }, []);

  return (
    <div className="user-cuenta-container">
      <div className="user-section">
        <div className="headInfo">
          <div className="user-header">
            <div>
              <div className="user-logo">
                <img src={image} className="userImage" alt="User" />
              </div>
            </div>
            <div className="user-info">
              <h2 className="white">{usuario.rol}</h2>
              <p className="white">User: {usuario.nombre}</p>
              <p className="white">documeto: {usuario.numeroDocumento}</p>
            </div>
          </div>
          <div className="bottoms">
            <button className="bootom Csecion">Cerrar Sesión</button>
            <button className="bootom Qrcodigo">Códigos QR</button>
          </div>
        </div>
        <div className="bloqueo">
          <form className="busqueda">
            <img src={lupa} className="lupa" />
          <input type="number" className="input" placeholder="Numero de identidad"/>
          <button type="submit" className="submitSave">Buscar</button>
          </form>
          <div className="lista">
            <div className="seccionUserDocument">
              <h1 className="documento">15469842</h1>
              <h1 className="inactivo">Inactivo</h1>
              </div>
            <div className="seccionUserDocument">
              <h1 className="documento">451654121</h1>
              <h1 className="activo">Activo</h1>              </div>
          </div>
          <div className="user">
          </div>
        </div>
      </div>
      <div className="FuntionSeccion">
        <div className="headerFuntions">
          <div className="informacion">informacion</div>
          <div className="hisMovimientos">Movimientos</div>
          <div className="plantillas">+ plantillas</div>
        </div>

      </div>
    </div>
  );
}
