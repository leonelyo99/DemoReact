import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Gastos';
import ControlPresupuesto from './components/ControlPresupuestos';

function App() {

  const [presupuesto, guardarPresupuesto] = useState(0);
  const [ restante, guardarRestante] = useState(0)
  const [preguntaPresupuesto, guardarpreguntaPresupuesto] = useState(true);
  const [crearGasto, guardarCrearGasto] = useState(false);
  const [gasto, guardarGasto] = useState({});
  const [gastos, guardarGastos] = useState([]);

  useEffect(()=>{
    if(crearGasto){
      const listadoGastos = [...gastos, gasto];
      guardarGastos(listadoGastos);

      const presupuestoRestante = restante - gasto.cantidadGasto;
      guardarRestante(presupuestoRestante);

      guardarCrearGasto(false)
    }
  },[crearGasto])

  return (
    <div className="App container">
      <h1>Gasto semanal</h1>
      <div className="contenido-principal contenido">
        {
          (preguntaPresupuesto)
            ?
            <Pregunta guardarPresupuesto={guardarPresupuesto} 
                      guardarpreguntaPresupuesto={guardarpreguntaPresupuesto} 
                      guardarRestante={guardarRestante}/>
            :
            (
              <div className="row">
                <div className="one-half column">
                  <Formulario guardarGasto={guardarGasto}
                              guardarCrearGasto={guardarCrearGasto}/>
                </div>
                <div className="one-half column">
                  <Listado gastos = {gastos}/>
                  <ControlPresupuesto presupuesto={presupuesto}
                                      restante={restante}/>
                </div>
              </div>
            )
        }
      </div>
    </div>
  );
}

export default App;
