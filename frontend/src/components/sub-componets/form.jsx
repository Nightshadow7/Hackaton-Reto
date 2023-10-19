import React from "react";
import { useLocation } from 'react-router-dom';
const Form = () => {    
    let {state} = useLocation();
    console.log(state);
    return (
        <>
        <form>
            <label>{state.documento.nombre}</label>
            {state.documento.campos.map((e)=> (
                <>
                <label>{e.titulo}</label>
                <input type={e.tipo} />
                </>
            ))

            }
        </form>
        </>
    );
};

export default Form;