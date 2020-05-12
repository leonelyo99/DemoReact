import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';

function Formulario(props){

    const {guardarGasto,guardarCrearGasto} = props

    //state
    const [nombreGasto, guardarNombreGasto] = useState('');
    const [cantidadGasto, guardarCantidadGasto] = useState(0);
    const [error, guardarError] = useState(false);

    //Cuando se agrega el gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validamos que no sea vacio y que sea mayor a cero
        if(cantidadGasto < 1 || isNaN(cantidadGasto || nombreGasto === '')){
            e.preventDefault();
            return;
        }

        //construir objeto gasto
        const gasto = {
            nombreGasto,
            cantidadGasto,
            id: shortid.generate()
        }
        
        //pasar gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //eliminar alerta
        guardarError(false)

        //resetear el form
        guardarNombreGasto('')
        guardarCantidadGasto('');
    }


    return(
        <form onSubmit={agregarGasto}>
            <h2>Agrega tus Gastos Aqui</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input type="text"
                       className="u-full-width"
                       placeholder="Ej. transporte"
                       value={nombreGasto}
                       onChange={e=>guardarNombreGasto(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input type="text"
                       className="u-full-width"
                       placeholder="Ej. 300"
                       value={cantidadGasto}
                       onChange={e=>guardarCantidadGasto(parseInt(e.target.value))}
                />
            </div>
            <input type="submit" className="button-primary u-full-width" value="Agregar Gasto"/>
        </form>
    )
}

export default Formulario;