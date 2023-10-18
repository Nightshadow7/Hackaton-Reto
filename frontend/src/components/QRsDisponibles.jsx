import React from "react";
import { useNavigate } from "react-router-dom";
import QRItem from "./sub-componets/QRItem";
import "./QRsDisponibles.css";

export default function QRsDisponibles() {
  const navigate = useNavigate();
  return (
    <div className="qr-disponibles-container">
      <div className="qrs-disponibles">
        <button className="qr-volver-btn" onClick={() => navigate('/home')}>Volver</button>
        <QRItem />
        <QRItem />
        <QRItem />
        <QRItem />
        <QRItem />
        <QRItem />
      </div>
      <div className="crear-qr">
        <h2>dkjdk</h2>
      </div>
    </div>
  );
}
