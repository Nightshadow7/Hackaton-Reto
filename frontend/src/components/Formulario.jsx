import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/formulario')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del formulario', error);
      });
  }, []);

  return (
    <div>
      {data.map((documento, index) => (
        <div key={index} className="formulario">
          <Link to={`/editar-formulario/${index + 1}`}>
            <h2>Formulario {index + 1}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Formulario;


{/*

extra coloca un boton el la previsualizacion de qr para poder crear qrs


1. al hacer click al formulario entrar para editar 
2. elegir los datos que quiere mostrar y cambiar en la base de datos
3. mostrar el qr generado y para poder descargar solo la parte grafica la otra parte la hace antoni 
*/}

