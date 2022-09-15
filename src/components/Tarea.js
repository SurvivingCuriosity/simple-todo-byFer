import React from "react";
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'
import icono_expandir_gris from '../imgs/icono_expandir_gris.svg'
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

                        <label htmlFor={props.tarea.id}>{props.tarea.titulo}</label><span>{`(${props.tarea.subtareas.length})`}</span>
                    </div>
                    <div className="iconos-tarea-container">

                    {mostrandoSubTareas===true ? <img 
                            style={{marginRight:'0.5em', transform:`rotate(180deg)`}}
                            onClick={()=>{setMostrandoSubTareas(!mostrandoSubTareas)}}
                            className='icono-expandir-subtareas animate-transform' 
                            src={icono_expandir_gris} 
                            alt='icono mostrar subtareas'
                        ></img>:
                        <img 
                        style={{marginRight:'0.5em', transform:`rotate(0deg)`}}
                        onClick={()=>{setMostrandoSubTareas(!mostrandoSubTareas)}}
                        className='icono-expandir-subtareas animate-transform' 
                        src={icono_expandir_gris} 
                        alt='icono mostrar subtareas'
                    ></img>}
                        

                        

                    {checked && 
                        <img 
                            style={{marginRight:'0.5em'}}
                            onClick={eliminarTarea}
                            className='icono-borrar-tarea fade-in' 
                            src={icono_borrar_rojo} 
                            alt='icono borrar tarea'
                        ></img>
                    }
                    </div>
                </div>
                <div className="delay-fade-in">
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
                </div>
        </li>

    )
}