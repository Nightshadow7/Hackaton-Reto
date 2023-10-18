import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRItem from "./sub-componets/QRItem";
import "./QRsDisponibles.css";
import axios from "axios";

export default function QRsDisponibles() {
  const [qrsPerUser, setQrsPerUser] = useState([]);
  const [qrViewer, setQrViewer] = useState("");

  const qrViewerHandler = (image) => {
    setQrViewer(image);
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/Ingreso");
    }
    axios
      .get(`http://localhost:7000/api/qrs/byUser/${usuario._id}`)
      .then(({ data }) => setQrsPerUser(data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  return (
    <div className="qr-disponibles-container">
      <div className="qrs-disponibles">
        <div className="qr-up-btns">
          <button
            className="qr-volver-btn"
            onClick={() => navigate("/UserCuenta")}
          >
            Volver
          </button>
          <button
            className="qr-volver-btn"
            onClick={() => navigate("/Formulario")}
          >
            Añadir QR
          </button>
        </div>
        {qrsPerUser == false ? (
          <h2>Este usuario no tiene QR's registrados</h2>
        ) : (
          qrsPerUser.map((el, index) => (
            <>
              <QRItem
                key={index}
                nombre={el.nombre}
                cuentaDestino={el.cuentaDestino}
                qrViewerHandler={() => setQrViewer(el.imagen)}
              />
            </>
          ))
        )}
      </div>
      <div className="crear-qr">
        <h2>Visualizador de QR's</h2>
        <img src={qrViewer} alt="" download />
      </div>
    </div>
  );
}
