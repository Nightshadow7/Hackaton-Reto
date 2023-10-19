import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet} from 'react-router-dom';
import axios from 'axios';
import './Formulario.css';

function Formulario() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7000/api/formulario')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del formulario', error);
      });
      console.log(Outlet);
  }, []);

  return (
    <div>
      
      <button
            className="qr-volver-btn"
            onClick={() => navigate("/codigos-qr")}
          >
            Volver
          </button>
      {data.map((documento, index) => (
        <div key={index} className="formulario">
          {console.log(documento)}
          <Link to={`/formulario/${index + 1}`} state={{documento}}>
            <h2>{documento.nombre}</h2>
          </Link>
        </div>
      ))}
      <div> 
        <button> Previsualizacion QR code </ button>
        </ div>
    <Outlet xd="[wasaapppp]" />

    </div>
      
  );
}

export default Formulario;


/*

 extra coloca un boton el la previsualizacion de qr para poder crear qrs


1. al hacer click al formulario entrar para editar 
2. elegir los datos que quiere mostrar y cambiar en la base de datos
3. mostrar el qr generado y para poder descargar solo la parte grafica la otra parte la hace antoni 
*/
