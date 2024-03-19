import React from "react";
import { useTareasContext } from "../context/TareasContext";
import { setCategoriaActiva } from "../context/TareasActions";

export function NavCategorias() {

  const {state, dispatch} = useTareasContext()
  const {categorias, idCategoriaActiva} = state

  console.log(categorias);

  const userClicksCategoria = (idCategoria) => {
    console.log('pONIENDO CAT ACTIVA: ',idCategoria);
    dispatch(setCategoriaActiva(idCategoria))
  };
  const userClicksSinCategoria = () => {
    dispatch(setCategoriaActiva(''))
  };

  return (
    <div className="">
      <ul className="my-2 flex gap-2 overflow-x-auto">
        <li
          className={`border border-neutral-800 whitespace-nowrap max-w-32 cursor-pointer p-1 rounded-md ${
            idCategoriaActiva === ''
              ? `dark:border-neutral-500 bg-neutral-400 dark:bg-neutral-700`
              : ``
          } `}
          onClick={()=>{userClicksSinCategoria()}}
        >
          Sin categoría
        </li>
        {categorias.map((cat) => {
          return (
            <li
              key={cat.id}
              className={`border border-neutral-800 whitespace-nowrap max-w-32 cursor-pointer p-1 rounded-md
              ${
                idCategoriaActiva === cat.id
                  ? `  dark:border-neutral-500 bg-neutral-400 dark:bg-neutral-700`
                  : ``
              }
              `}
              onClick={()=>userClicksCategoria(cat.id)}
            >
              {cat.nombre}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
