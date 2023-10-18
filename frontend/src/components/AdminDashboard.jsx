import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../resources/header.jpg";

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
        <div className="user-header">
          <div>
            <details>
              <summary className="user-logo">
                <img src={image} className="userImage" alt="User" />
              </summary>
              <h2> XD </h2>
            </details>
          </div>
          <div className="user-info">
            <h2 className="white">{usuario.rol}</h2>
            <p className="white">User: {usuario.nombre}</p>
            <p className="white">documeto: {usuario.numeroDocumento}</p>
          </div>
        </div>
        <div className="logout-button">
          <button>Cerrar Sesión</button>
        </div>
        <div className="qrs-button">
          <button>Códigos QR</button>
        </div>
      </div>
    </div>
  );
}
