import React from "react";
import icono_borrar_blanco from '../imgs/icono_borrar_blanco.svg'

export function Tarea(props){
    const [checked, setChecked] = React.useState(props.isChecked);
    
    const handleChange = (evt) =>{
        setChecked(!checked)
    }
    const eliminarTarea = () =>{
        props.callbackBorrarTarea(props.id);
    }

    React.useEffect(()=>{
        props.callbackCheck(checked, props.id);
    },[checked])

    return(
        <div className='tarea'>
            <input 
                type='checkbox' 
                onChange={handleChange}
                checked={checked}
                >
            </input>

            <p>{props.text}</p>
            
            {checked && 
                <img 
                    onClick={eliminarTarea}
                    className='icono-borrar-tarea' 
                    src={icono_borrar_blanco} 
                    alt='icono borrar tarea'
                ></img>}
        </div>
    )
}