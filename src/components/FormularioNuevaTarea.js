import React from "react";
import {FormularioSubtareas} from './FormularioSubtareas'
import { PreviewSubtareas } from "./PreviewSubtareas";
import icono_anadir_blanco from '../imgs/icono_anadir_blanco.svg'
import icono_anadir_negro from '../imgs/icono_anadir_negro.svg'
export function FormularioNuevaTarea(props){

    const [tituloTarea, setTituloTarea] = React.useState('');
    const [subTareas, setSubTareas] = React.useState([]);

    const handleChange = evt => {
        setTituloTarea(evt.target.value)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(tituloTarea==="") return;
        props.callback(tituloTarea, subTareas)
        setTituloTarea('')
        setSubTareas([])
    }
    const nuevaSubTarea = (subtarea) => {
        setSubTareas(prev=>{
            return[
              ...prev,
              {
                id:Date.now(),
                text:subtarea,
                checked:false
              }
            ]
          })
    }
    return(
        <div className="caja" style={{width:'100%', borderBottom: '1px solid white'}}>
            
                <form onSubmit={handleSubmit}>
                    <div className="input-and-button">
                        <input
                            onChange={handleChange}
                            value={tituloTarea}
                            type='text'
                            placeholder='¿Qué tienes que hacer?'
                        ></input>
                        <input
                            type='image' 
                            src={tituloTarea==="" ? icono_anadir_negro : icono_anadir_blanco} 
                            disabled={tituloTarea==="" ? true : false}
                            alt='icono nueva tarea' 
                            style={{width:'2em'}}>
                        </input>
                    </div>
                </form>
                {
                    subTareas.length>0 && 
                    <PreviewSubtareas 
                        tareas={subTareas}
                    />
                }
                {tituloTarea!=='' && 
                    <FormularioSubtareas 
                        callback={nuevaSubTarea}
                    />
                }
        </div>
    )
}