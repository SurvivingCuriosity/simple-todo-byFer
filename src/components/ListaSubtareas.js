import React from "react";
import { Subtarea } from "./Subtarea";
import {FormularioSubtareas} from './FormularioSubtareas'
export function ListaSubtareas(props){
    
    const nuevaSubTareaDesdeLista = (tituloSubtarea) =>{
        props.callbackNuevaSubtarea(tituloSubtarea, props.idPadre);
    }

    return(
        <ul className="lista-subtareas">
            {props.subtareas.map((tarea)=>{
                return(
                    <Subtarea 
                        idPadre={props.idPadre}
                        key={tarea.id}
                        tarea={tarea}
                        callbackCheck={props.callbackCheck}
                        callbackEliminarSubTarea={props.callbackEliminarSubTarea}
                    />
                )
            })}
            <FormularioSubtareas 
                idPadre={props.idPadre}
                callback={nuevaSubTareaDesdeLista}
            />
        </ul>
    )
}