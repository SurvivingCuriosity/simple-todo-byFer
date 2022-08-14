import logo from './imgs/logo.svg';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import './styles/reset.css';
import './styles/style.css';
import { FormularioNuevaTarea } from './components/FormularioNuevaTarea';
import { Tarea } from './components/Tarea';
function App() {

  const [tareasLS, setTareasLS] = useLocalStorage("tareas", []);
  const [tareas, setTareas] = React.useState(tareasLS);
  
  React.useEffect(()=>{
    setTareasLS(tareas);
  },[tareas])

  const userCreatesTarea = (tituloTarea, subtareas) => {
    setTareas(prev=>{
      return[
        ...prev,
        {
          id:Date.now(),
          titulo:tituloTarea,
          checked:false,
          subtareas: subtareas || ''
        }
      ]
    })
    
  } 

  const borrarTareas = () => {
    setTareas([]);
  }

  const checkTarea = (isChecked, idTarea) =>{
    const newState = tareas.map(tarea => {
      if (tarea.id === idTarea) {
        return {...tarea, checked: isChecked};
      }

      return tarea;
    });

    setTareas(newState);
  }

  const checkSubTarea = (isChecked, idTarea, idTareaPadre) =>{
    let substate;
    tareas.map(tarea => {
      if (tarea.id === idTareaPadre) {
        substate=tarea.subtareas.map(subtarea=>{
          if(subtarea.id===idTarea){
            return {...subtarea, checked: isChecked}
          }
          return subtarea;
        })
      }
      return tarea;
    });

    let newState = tareas.map(tarea => {
      if (tarea.id === idTareaPadre) {
        return {...tarea, subtareas: substate}
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
          callback={userCreatesTarea}
        />
        
          {tareas.length<=0 
          ?
            <p>No hay tareas pendientes...</p>
          :
            <ul className='lista-tareas'>
              {tareas.map((tarea)=>{
              return(
                  <Tarea 
                    key={tarea.id}
                    id={tarea.id}
                    tarea={tarea}
                    callbackCheck={checkTarea}
                    callbackSubtareaCheck={checkSubTarea}
                    callbackBorrarTarea={eliminarTarea}
                  />
              )
            })}
            </ul>
          }
        
        {tareas.length>0 && <button onClick={borrarTareas} className='btn btn-borrar-tareas'>Borrar todas</button> }
    </div>
  );
}

export default App;
