import React, { useState } from "react";
import icono_borrar_rojo from "../imgs/icono_borrar_rojo.svg";
import { useTareasContext } from "../context/TareasContext";
import { checkSubtarea, eliminarSubtarea } from "../context/TareasActions";

export function Subtarea(props) {
  const { tarea, idTareaPadre } = props;

    const {dispatch} = useTareasContext()

  const handleChange = (evt) => {
    dispatch(checkSubtarea(idTareaPadre, tarea.id))
  };

  const handleEliminarSubtarea = () => {
    console.log('Se quiere eliminar');
    dispatch(eliminarSubtarea(idTareaPadre, tarea.id))
  };


  return (
    <li className="flex items-center gap-2 rounded-md bg-neutral-300 p-1 dark:bg-neutral-700">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={tarea.checked}
        id={tarea.id}
      ></input>
      <label htmlFor={tarea.id}>{tarea.titulo}</label>
      {tarea.checked && (
        <img
          onClick={handleEliminarSubtarea}
          className="size-5"
          src={icono_borrar_rojo}
          alt="icono borrar tarea"
        ></img>
      )}
    </li>
  );
}
