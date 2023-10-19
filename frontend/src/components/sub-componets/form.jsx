import React, { useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import './form.css'
const Form = () => {    
    let {state} = useLocation();
    const [datos, setDatos] = useState({});

    // datos que vamos a traer por defecto para que las cosas no se bugueen
    useEffect(()=> {
        const defaultData = state.documento.campos.map((e)=>{ return [[e.titulo], '']});
    // transforma la array en un objeto
        const objData = Object.fromEntries(defaultData);
        setDatos(objData);
        console.log(objData);
        console.log(datos);
    }, [state]); 
    

    const inputsHanlder = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        const key = e.target.id;
        setDatos((prevValues)=> {
            return {...prevValues, [key]: value};
        });
    };

    const createQR = (e) => {
        console.log(e);
    };

    return (
        <>
        <div className="formQR">
            <label className="titleForm">{state.documento.nombre}</label>
            {state.documento.campos.map((e)=> {
               return( <>
                <label>{e.titulo}</label>
                <input onChange={inputsHanlder} id={e.titulo} value={datos[[e.titulo]]} type={e.tipo} />
                </>
                );
                })

            }
            <button className="button-qr-code"> Crear QR Code </button>
        </div>
        </>
    );
};

export default Form;