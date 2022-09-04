import React from "react";
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'
import icono_expandir_blanco from '../imgs/icono_expandir_blanco.svg'
import icono_cruz_blanco from '../imgs/icono_cruz_blanco.svg'
import { ListaSubtareas } from "./ListaSubtareas";

export function Tarea(props){
    const [checked, setChecked] = React.useState(props.tarea.checked);
    const [mostrandoSubTareas, setMostrandoSubTareas] = React.useState(false);
    
    const handleChange = (evt) =>{
        setChecked(!checked)
    }
    const eliminarTarea = () =>{
        props.callbackBorrarTarea(props.tarea.id);
    }

    React.useEffect(()=>{
        props.callbackCheck(checked, props.tarea.id);
    },[checked])

    const subtareaCompletada = (checked, idTarea, idPadre) => {
        props.callbackSubtareaCheck(checked, idTarea, idPadre);
    }
    return(
        <li className='tarea-container'>
            <p className="fecha-tarea">{props.tarea.fecha}</p>
                <div className='tarea-checkbox-container'>
                    <div className="input-and-button">
                        <input 
                            type='checkbox' 
                            onChange={handleChange}
                            checked={checked}
                            id={props.tarea.id}
                            >
                        </input>

                        <label htmlFor={props.tarea.id}>{props.tarea.titulo}</label>
                    </div>
                    <div className="iconos-tarea-container">
                        <img 
                            style={{marginRight:'0.5em'}}
                            onClick={()=>{setMostrandoSubTareas(!mostrandoSubTareas)}}
                            className='icono-expandir-subtareas' 
                            src={icono_expandir_blanco} 
                            alt='icono mostrar subtareas'
                        ></img>

                    {checked && 
                        <img 
                            style={{marginRight:'0.5em'}}
                            onClick={eliminarTarea}
                            className='icono-borrar-tarea' 
                            src={icono_borrar_rojo} 
                            alt='icono borrar tarea'
                        ></img>
                    }
                    </div>
                </div>
                
                {
                mostrandoSubTareas && 
                    <ListaSubtareas 
                        idPadre={props.tarea.id} 
                        subtareas={props.tarea.subtareas} 
                        callbackCheck={subtareaCompletada} 
                        callbackEliminarSubTarea={props.callbackEliminarSubTarea}
                        callbackNuevaSubtarea={props.callbackNuevaSubtarea}
                    />
                }
        </li>

    )
}