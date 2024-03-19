import React, { useState } from "react";
import icono_editar from "../imgs/icono_editar.svg";
import icono_guardar from "../imgs/icono_guardar.svg";
import icono_borrar_rojo from "../imgs/icono_borrar_rojo.svg";
import icono_expandir_gris from "../imgs/icono_expandir_gris.svg";
import { ListaSubtareas } from "./ListaSubtareas";
import { useTareasContext } from "../context/TareasContext";
import {
  checkTarea,
  eliminarTarea,
  toggleExpandTarea,
  updateTarea,
} from "../context/TareasActions";

export function Tarea({ tarea }) {
  const { dispatch } = useTareasContext();

  const [editandoTarea, setEditandoTarea] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(tarea.titulo);

  const handleCheckTarea = () => {
    dispatch(checkTarea(tarea.id));
  };

  const guardarTarea = () => {
    setEditandoTarea(false);
    dispatch(updateTarea(nuevoNombre, tarea.id));
  };

  const handleEliminarTarea = () => {
    dispatch(eliminarTarea(tarea.id));
  };

  const handleExpandTarea = () => {
    dispatch(toggleExpandTarea(tarea.id));
  };

  return (
    <li className="relative flex flex-col justify-center rounded-md border border-neutral-500 bg-zinc-300 px-3 dark:bg-zinc-800">
      <div className="flex flex-row justify-between">
        <div
          className="flex w-full cursor-pointer flex-row items-center gap-2 py-1"
        >
          <input
            type="checkbox"
            className="scale-125 cursor-pointer"
            onChange={handleCheckTarea}
            checked={tarea.checked}
            id={tarea.titulo}
            onClick={(e) => e.stopPropagation()}
          ></input>
          {editandoTarea === false ? (
            <label
              htmlFor={tarea.titulo}
              className="w-full cursor-pointer p-1"
            >
              {tarea.titulo} {`(${tarea.subtareas.length})`}
            </label>
          ) : (
            <input
              autoFocus
              type="text"
              className="rounded-md p-1 text-neutral-800"
              onChange={(evt) => {
                setNuevoNombre(evt.target.value);
              }}
              value={nuevoNombre}
            ></input>
          )}
        </div>

        <div className="flex flex-row items-center justify-end gap-2">
          <button className="size-7 rounded-full bg-neutral-400 p-1 dark:bg-neutral-600">
            <img
              onClick={handleExpandTarea}
              className={`${
                tarea.expanded ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
              src={icono_expandir_gris}
              alt="icono mostrar subtareas"
            ></img>
          </button>
          {editandoTarea === true ? (
            <button className="size-7 rounded-full bg-neutral-400 p-1 dark:bg-neutral-600">
              <img
                onClick={guardarTarea}
                src={icono_guardar}
                className="" alt="icono borrar tarea"
              ></img>
            </button>
          ) : (
            <button className="size-7 rounded-full bg-neutral-400 p-1 dark:bg-neutral-600">
              <img
                onClick={() => {
                  setEditandoTarea(true);
                }}
                src={icono_editar}
                className="" alt="icono borrar tarea"
              ></img>
            </button>
          )}
          {tarea.checked && (
            <button className="size-7 rounded-full bg-neutral-400 p-1 dark:bg-neutral-600">
              <img
                onClick={handleEliminarTarea}
                src={icono_borrar_rojo}
                className="" alt="icono borrar tarea"
              ></img>
            </button>
          )}
        </div>
      </div>

      {tarea.expanded && (
        <div className="ml-5 flex flex-col gap-2 py-4">
          <ListaSubtareas tarea={tarea} subtareas={tarea.subtareas} />
        </div>
      )}
    </li>
  );
}
