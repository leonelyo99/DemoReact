import React, { Fragment, useState } from 'react'
import Error from './Error';

function Pregunta(props) {

    const {guardarPresupuesto, guardarpreguntaPresupuesto,guardarRestante} = props

    //definir el satate
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //validar presupuesto
    const agregarPresupuesto = e =>{
        e.preventDefault();

        //validamos que no sea vacio y que sea mayor a cero
        if(cantidad < 1 || isNaN(cantidad)){
            guardarError(true);
            return;
        }

        //si se pasa la validacion
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        guardarpreguntaPresupuesto(false);
    }

    return (
        <Fragment>
            <h2>Coloca tu Presupuesto</h2>
            {error ? <Error mensaje="Presupuesto incorrecto" /> : null}
            <form
                onSubmit={agregarPresupuesto}
            >
                <input type="number"
                       className="u-full-width"
                       placeholder="Agrega tu presupuesto"
                       onChange={e => guardarCantidad(parseInt(parseInt(e.target.value,10)))}
                />
                <input type="submit" className="button-primary u-full-width" value="Definir Presupuesto" />
            </form>
        </Fragment>
    )
}

export default Pregunta;