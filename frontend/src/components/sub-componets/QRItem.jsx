import React from "react";
import "./QRItem.css";

export default function QRItem({ cuentaDestino, nombre, qrViewerHandler }) {
  return (
    <>
      <div className="qr-item">
        <button onClick={qrViewerHandler}>+</button>
        <div className="qr-item__text">
          <h2>{nombre}</h2>
          <p>{cuentaDestino}</p>
        </div>
      </div>
    </>
  );
}
