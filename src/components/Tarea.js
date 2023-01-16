import React from "react";
import icono_editar from '../imgs/icono_editar.svg'
import icono_guardar from '../imgs/icono_guardar.svg'
import icono_borrar_rojo from '../imgs/icono_borrar_rojo.svg'
import icono_expandir_gris from '../imgs/icono_expandir_gris.svg'
import { ListaSubtareas } from "./ListaSubtareas";

export function Tarea(props) {
    const [checked, setChecked] = React.useState(props.tarea.checked);
    const [editandoTarea, setEditandoTarea] = React.useState(false);
    const [mostrandoSubTareas, setMostrandoSubTareas] = React.useState(false);
    const [nuevoNombre, setNuevoNombre] = React.useState(props.tarea.titulo);


    const handleChange = (evt) => {
        setChecked(!checked)
    }
    const guardarTarea = () => {
        setEditandoTarea(false);
        props.callbackGuardarTarea(props.tarea.id, nuevoNombre);
    }
    const changeNuevoNombre = (e) => {
        setNuevoNombre(e.target.value)
    }
    const eliminarTarea = () => {
        props.callbackBorrarTarea(props.tarea.id);
    }

    React.useEffect(() => {
        props.callbackCheck(checked, props.tarea.id);
    }, [checked])


    const subtareaCompletada = (checked, idTarea, idPadre) => {
        props.callbackSubtareaCheck(checked, idTarea, idPadre);
    }
    return (
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
                    {editandoTarea === false
                        ? <><label htmlFor={props.tarea.id}>{props.tarea.titulo}</label><span>{`(${props.tarea.subtareas.length})`}</span></>
                        : <input type='text' onChange={changeNuevoNombre} value={nuevoNombre}></input>
                    }

                </div>
                <div className="iconos-tarea-container">

                    {mostrandoSubTareas === true ? <img
                        style={{transform: `rotate(180deg)` }}
                        onClick={() => { setMostrandoSubTareas(!mostrandoSubTareas) }}
                        className='icono-expandir-subtareas animate-transform'
                        src={icono_expandir_gris}
                        alt='icono mostrar subtareas'
                    ></img> :
                        <img
                            style={{transform: `rotate(0deg)` }}
                            onClick={() => { setMostrandoSubTareas(!mostrandoSubTareas) }}
                            className='icono-expandir-subtareas animate-transform'
                            src={icono_expandir_gris}
                            alt='icono mostrar subtareas'
                        ></img>}




                    
                    {editandoTarea === true
                        ?
                        <img
                            onClick={guardarTarea}
                            className='icono-borrar-tarea fade-in'
                            src={icono_guardar}
                            alt='icono borrar tarea'
                        ></img>
                        :
                        <img
                            onClick={() => { setEditandoTarea(true) }}
                            className='icono-borrar-tarea fade-in'
                            src={icono_editar}
                            alt='icono borrar tarea'
                        ></img>

                    }
                    {checked &&
                        <img
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