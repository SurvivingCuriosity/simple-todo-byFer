import React from "react";
import icono_anadir_blanco from '../imgs/icono_anadir_blanco.svg'
export function FormularioNuevaTarea(props){

    const [text, setText] = React.useState('');
    const handleChange = evt => {
        setText(evt.target.value)
    }
    const handleSubmit = () => {
        if(text==="") return;
        props.callback(text)
        setText('')
    }
    return(
        <div className="caja" style={{width:'100%', borderBottom: '1px solid white'}}>
            <div className="input-and-button">
                <input
                    onChange={handleChange}
                    value={text}
                    type='text'
                    placeholder='¿Qué tienes que hacer?'
                ></input>
                <img 
                    onClick={handleSubmit} 
                    src={icono_anadir_blanco} 
                    alt='icono nueva tarea' 
                    style={{width:'2em'}}>
                </img>
            </div>
        </div>
    )
}