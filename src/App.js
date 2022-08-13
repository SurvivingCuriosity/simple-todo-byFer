import logo from './imgs/logo.svg';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import './styles/reset.css';
import './styles/style.css';
import { FormularioNuevaTarea } from './components/FormularioNuevaTarea';
import { Tarea } from './components/Tarea';
function App() {
  const [tareasLS, setTareasLS] = useLocalStorage("tareas",[]);
  
  const [tareas, setTareas] = React.useState(tareasLS);

  const userClicksAdd = (userText) => {
    setTareas(prev=>{
      return[
        ...prev,
        {
          id:Date.now(),
          text:userText,
          checked:false
        }
      ]
    })
    
  }
  React.useEffect(()=>{
    setTareasLS(tareas);
  },[tareas])

  const borrarTareas = () => {
    setTareas([]);
  }
  function checkTarea(isChecked, idTarea){
    const newState = tareas.map(tarea => {
      if (tarea.id === idTarea) {
        return {...tarea, checked: isChecked};
      }

      return tarea;
    });

    setTareas(newState);
  }
  const eliminarTarea = (idTarea) => {
    setTareas(current =>
      current.filter(element => {
        return element.id !== idTarea;
      }),
    );
  }

  return (
    <div className="horizontal-centered full-screen-height pad-2">
        <h1>Tareas</h1>
        <p style={{padding:'0.75em'}}>Un texto motivador...</p>
        <FormularioNuevaTarea 
          callback={userClicksAdd}
        />
        <>
            {tareas.length<=0 
            ?
              <p>No hay tareas pendientes...</p>
            :
              tareas.map((tarea)=>{
                return(
                  <Tarea 
                    key={tarea.id}
                    id={tarea.id}
                    text={tarea.text}
                    isChecked={tarea.checked}
                    callbackCheck={checkTarea}
                    callbackBorrarTarea={eliminarTarea}
                  />
                )
              })
            }
        </>
        {tareas.length>0 && <button onClick={borrarTareas} className='btn btn-borrar-tareas'>Borrar todas</button> }
    </div>
  );
}

export default App;
