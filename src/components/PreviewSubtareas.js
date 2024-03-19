import React from "react";

export function PreviewSubtareas(props){
    const {tareas}=props;

    return(
        <ul className="ml-4 list-inside list-disc">
            {tareas.map((tarea)=>{
                return(
                    <li key={tarea.id}>{tarea.text}</li>
                )
            })}
        </ul>
    )
}