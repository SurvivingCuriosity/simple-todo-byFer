import React from "react";
import icono_anadir_blanco from '../imgs/icono_anadir_blanco.svg'
import icono_anadir_negro from '../imgs/icono_anadir_negro.svg'
export function FormularioSubtareas(props){
    const [textSubtarea, setTextSubtarea] = React.useState('');
    const [mostrandoForm, setMostrandoForm] = React.useState(false);
    const handleChange = evt => {
        setTextSubtarea(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(textSubtarea==="") return;
        props.callback(textSubtarea)
        setTextSubtarea('')
    }
    const formSubTarea=(
        <form onSubmit={handleSubmit} style={{marginLeft:'2em', padding:'1em'}}>
            <div className="input-and-button">
                <input
                    onChange={handleChange}
                    value={textSubtarea}
                    type='text'
                    placeholder='Introduce subtarea'
                ></input>
                <input
                    type='image' 
                    src={textSubtarea==="" ? icono_anadir_negro : icono_anadir_blanco} 
                    disabled={textSubtarea==="" ? true : false}
                    alt='icono nueva tarea' 
                    style={{width:'2em'}}>
                </input>
            </div>
        </form>
    )
    return(
        <>
        {!mostrandoForm && <button
                onClick={()=>{setMostrandoForm(!mostrandoForm)}}
                className="btn-anadir-subtareas"
            >Añadir subtarea</button>}
            

            {mostrandoForm && formSubTarea}
        </>
    )
}