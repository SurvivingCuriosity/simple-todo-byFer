import React, { useEffect, useState } from "react";
import icono_anadir_disabled from "../imgs/icono_anadir_disabled.svg";
import icono_anadir_enabled from "../imgs/icono_anadir_enabled.svg";
import icono_borrar_rojo from "../imgs/icono_borrar_rojo.svg";
import { BotonClaroOscuro } from "./BotonClaroOscuro";
import { useTareasContext } from "../context/TareasContext";
import { crearCategoria, eliminarCategoria } from "../context/TareasActions";

export function PantallaAjustes({handleCloseCallback}) {

  const {state, dispatch} = useTareasContext()
  const categorias = state.categorias


  console.log(categorias);

  const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] = useState(false);
  const [tituloNuevaCategoria, setTituloNuevaCategoria] = useState('');

  useEffect(() => {
    window.addEventListener("mousedown", handleClickScreen);
    function handleClickScreen(evt) {
      if (
        evt.target.nodeName === "DIV" ||
        !evt.target.className === "input-crear-cat"
      ) {
        handleCloseCallback();
      }
    }
    return () => window.removeEventListener("mousedown", handleClickScreen);
  }, []);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(tituloNuevaCategoria === "") return
    dispatch(crearCategoria(tituloNuevaCategoria))
    setTituloNuevaCategoria("");
    setMostrandoFormNuevaCategoria(false);
  };

  const borrarCategoria = (categoria) => {
    console.log('Se va a eliminar:',categoria);
    dispatch(eliminarCategoria(categoria.id))
  };

  return (
    <div className="mx-auto flex h-3/4 w-full flex-col justify-between p-2 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12">
      <div className="flex flex-col gap-2 rounded-lg bg-zinc-200 p-3 dark:bg-zinc-900">
        <h2 className="text-center text-3xl">CATEGORÍAS</h2>

        {mostrandoFormNuevaCategoria === true ? (
          <>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                className="w-full rounded-lg p-2 text-zinc-700"
                onChange={(evt) => {setTituloNuevaCategoria(evt.target.value);}}
                value={tituloNuevaCategoria}
                type="text"
                placeholder="Titulo de la categoría"
                autoFocus
              ></input>
              <input
                onClick={tituloNuevaCategoria === "" ? ()=>{setMostrandoFormNuevaCategoria(false)} : handleSubmit}
                className={`${tituloNuevaCategoria === "" ? 'rotate-45' : 'rotate-0'} transition-all duration-200`}
                type="image"
                src={
                  tituloNuevaCategoria === ""
                    ? icono_anadir_disabled
                    : icono_anadir_enabled
                }
                alt="icono nueva categoría"
                style={{ width: "2em" }}
              ></input>
            </form>
          </>
        ) : (
          <button
            className="mx-auto w-fit rounded-lg bg-zinc-300 p-1 px-2 text-lg dark:bg-zinc-800"
            onClick={() => {
              setMostrandoFormNuevaCategoria(true);
            }}
          >
            Crear nueva categoría
          </button>
        )}

        <ul className="flex w-full flex-col gap-2 p-2">
          {categorias.length > 0 ? (
            categorias.map((cat) => {
              return (
                cat.nombre !== "Todas" && (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between rounded-lg bg-zinc-300 p-2 dark:bg-zinc-800"
                  >
                    <p>{cat.nombre}</p>
                    <img
                      className="cursor-pointer"
                      src={icono_borrar_rojo}
                      onClick={()=>borrarCategoria(cat)}
                      name={cat.nombre}
                      alt="Icono borrar categoria"
                    ></img>
                  </li>
                )
              );
            })
          ) : (
            <p className="text-center text-neutral-500">No has creado ninguna categoría</p>
          )}
        </ul>
      </div>

      <p className="text-center">Click en cualquier sitio para volver</p>
    </div>
  );
}
