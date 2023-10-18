import React from "react";
import './QRItem.css'

export default function QRItem() {
  return (
    <>
      <div className="qr-item">
        <button>+</button>
        <div className="qr-item__text">
          <h2>Nombre del QR</h2>
          <p>Número de cuenta</p>
        </div>
      </div>
    </>
  );
}
