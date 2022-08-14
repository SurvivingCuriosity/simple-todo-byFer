import React from "react";
import { Subtarea } from "./Subtarea";
export function ListaSubtareas(props){

    return(
        <ul className="lista-subtareas">
            {props.subtareas.map((tarea)=>{
                return(
                    <Subtarea 
                        idPadre={props.idPadre}
                        key={tarea.id}
                        tarea={tarea}
                        callbackCheck={props.callbackCheck}
                    />
                )
            })}
        </ul>
    )
}