import React from "react";


export function Subtarea(props){
    const {tarea, callbackCheck, idPadre}=props;
    const [checked, setChecked] = React.useState(tarea.checked);
    
    const handleChange = (evt) =>{
        setChecked(!checked)
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
            
        </li>
        
    )
}