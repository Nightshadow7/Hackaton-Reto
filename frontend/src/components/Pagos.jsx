import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Pagos.css";

export default function Pagos() {
  const { id } = useParams();
  const [apiData, setApiData] = useState({});

  const handleInputChange = (e) => {
    e.preventDefault();

    console.log(e.target);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/qrs/${id}`)
      .then((res) => setApiData(res.data))
      .then(() => console.log(apiData))
      .catch((err) => console.log(err));
  }, []);

  const { plantilla, usuario } = apiData;
  if (usuario == undefined) {
    return <>Loading...</>;
  }

  return (
    <div className="pago-container">
      <div className="formulario-pago">
        <h4>Hacer consignación a {usuario.nombre}</h4>
        <h2>{plantilla.nombre}</h2>
        <form >
          {plantilla.campos.map((element, index) => (
            <div className="input-group">
              {console.log(element)}
              <label htmlFor={element.titulo}>{element.titulo}</label>
              <input
                id={element.titulo}
                name={element.titulo}
                key={index}
                type={element.tipo}
                required={element.requerido}
              />
            </div>
          ))}
          <button className="pagos-btn">PSE</button>
          <button className="pagos-btn">FC</button>
        </form>
      </div>
    </div>
  );
}
