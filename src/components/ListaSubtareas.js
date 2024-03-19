import React from "react";
import { Subtarea } from "./Subtarea";
import { FormularioSubtareas } from "./FormularioSubtareas";

export function ListaSubtareas({ tarea, subtareas }) {
  console.log("La lista subtareas renderiza: ", subtareas);

  return (
    <>
      <FormularioSubtareas idTareaPadre={tarea.id} />
      <ul className="flex flex-col gap-1">
        {subtareas?.map((subtarea) => {
          return (
            <Subtarea
              key={subtarea.id}
              idTareaPadre={tarea.id}
              tarea={subtarea}
            />
          );
        })}
      </ul>
    </>
  );
}
