import React from "react";
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'

export function Subtarea(props){
    const {tarea, callbackCheck, idPadre}=props;
    const [checked, setChecked] = React.useState(tarea.checked);
    
    const handleChange = (evt) =>{
        setChecked(!checked)
    }
    const handleEliminarSubtarea = () =>{
        props.callbackEliminarSubTarea(tarea.id, idPadre);
    }

    React.useEffect(()=>{
        callbackCheck(checked, tarea.id, idPadre);
    },[checked])

    return(
        <li className="subtarea-li-container">
            <input 
                type='checkbox' 
                onChange={handleChange}
                checked={checked}
                id={tarea.id}
                >
            </input>
            <label htmlFor={tarea.id}>{tarea.text}</label>
            {checked && 
                    <img 
                        onClick={handleEliminarSubtarea}
                        className='icono-borrar-tarea' 
                        src={icono_borrar_rojo} 
                        alt='icono borrar tarea'
                    ></img>}
            
        </li>
        
    )
}