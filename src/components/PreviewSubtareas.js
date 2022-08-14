import React from "react";

export function PreviewSubtareas(props){
    const {tareas}=props;
   console.log(tareas);
    return(
        <ul className="preview-subtareas">
            {tareas.map((tarea)=>{
                return(
                    <li key={tarea.id}>{tarea.text}</li>
                )
            })}
        </ul>
    )
}