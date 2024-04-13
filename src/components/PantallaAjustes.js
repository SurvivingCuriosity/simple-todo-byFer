import React, { useState } from "react";
import icono_anadir_disabled from "../imgs/icono_anadir_disabled.svg";
import icono_anadir_enabled from "../imgs/icono_anadir_enabled.svg";
import icono_borrar_rojo from "../imgs/icono_borrar_rojo.svg";
import icono_exportar from "../imgs/export_icon.svg";
import icono_importar from "../imgs/import_icon.svg";
import { useTareasContext } from "../context/TareasContext";
import {
  crearCategoria,
  eliminarCategoria,
} from "../context/TareasActions";
import { handleDescargarCategoria, handleDescargarDatos } from "../helpers/exportar";
import { useImportar } from "../helpers/useImportar";
export function PantallaAjustes() {
  const { state, dispatch } = useTareasContext();
  const {handleImportarDatos} = useImportar()
  const { categorias, idCategoriaActiva, tareas } = state;

  const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] =
    useState(false);
  const [tituloNuevaCategoria, setTituloNuevaCategoria] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (tituloNuevaCategoria === "") return;
    dispatch(crearCategoria(tituloNuevaCategoria));
    setTituloNuevaCategoria("");
    setMostrandoFormNuevaCategoria(false);
  };

  const borrarCategoria = (categoria) => {
    console.log("Se va a eliminar:", categoria);
    dispatch(eliminarCategoria(categoria.id));
  };


  const handleInputClick = () => {
    // Simula el clic en el input file cuando se hace clic en el botón
    document.getElementById("input-file").click();
  };

  const handleClickDescargarDatos = () => {
    handleDescargarDatos(tareas, categorias, idCategoriaActiva);
  }
  const handleClickDescargarCategoria = (idCategoria) => {
    handleDescargarCategoria(categorias.find(c => c.id === idCategoria)); 
  }

  const handleFileChange = (e) => {
    console.log('HANDLING FILE CHANGE');
    handleImportarDatos(e.target.files[0]);
  };

  const handleImportarCategoria = (e) => {
    console.log('HANDLING FILE CHANGE');
    handleImportarCategoria(e.target.files[0]);
  };

  return (
    <div className="mx-auto flex h-full w-full flex-col justify-between p-4 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12">
      <div className="flex flex-col gap-2 rounded-lg bg-zinc-200 p-3 dark:bg-zinc-900">
        <h2 className="text-center text-3xl">CATEGORÍAS</h2>

        {mostrandoFormNuevaCategoria === true ? (
          <>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                className="w-full rounded-lg p-2 text-zinc-700"
                onChange={(evt) => {
                  setTituloNuevaCategoria(evt.target.value);
                }}
                value={tituloNuevaCategoria}
                type="text"
                placeholder="Titulo de la categoría"
                autoFocus
              ></input>
              <input
                onClick={
                  tituloNuevaCategoria === ""
                    ? () => {
                        setMostrandoFormNuevaCategoria(false);
                      }
                    : handleSubmit
                }
                className={`${
                  tituloNuevaCategoria === "" ? "rotate-45" : "rotate-0"
                } transition-all duration-200`}
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

        <input
          accept=".json"
          id="input-file"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="input-file" className="cursor-pointer">
          <button
            className="mx-auto flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-zinc-300 p-1 px-2 text-xs dark:bg-zinc-800"
            onClick={handleImportarCategoria}
          >
            <img
              src={icono_importar}
              className="size-5 cursor-pointer"
              alt="Icono borrar categoria"
            ></img>
            Importar categoria
          </button>
        </label>
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
                    <button
                      onClick={() => {
                        handleClickDescargarCategoria(cat.id);
                      }}
                      className="flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-zinc-300 p-1 px-2 text-xs dark:bg-zinc-800"
                    >
                      <img
                        src={icono_exportar}
                        className="size-5 cursor-pointer"
                        alt="Icono borrar categoria"
                      ></img>
                    </button>
                    <img
                      className="cursor-pointer"
                      src={icono_borrar_rojo}
                      onClick={() => borrarCategoria(cat)}
                      name={cat.nombre}
                      alt="Icono borrar categoria"
                    ></img>
                  </li>
                )
              );
            })
          ) : (
            <p className="text-center text-neutral-500">
              No has creado ninguna categoría
            </p>
          )}
        </ul>
      </div>

      <div className="flex flex-row justify-between gap-2 text-neutral-500 dark:text-neutral-400">
        <button
          onClick={() => {
            handleClickDescargarDatos();
          }}
          className="flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-zinc-300 p-1 px-2 text-xs dark:bg-zinc-800"
        >
          <img
            src={icono_exportar}
            className="size-5 cursor-pointer"
            alt="Icono borrar categoria"
          ></img>
          Descargar datos
        </button>
        <input
          accept=".json"
          id="input-file"
          className="hidden"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="input-file" className="cursor-pointer">
          <button
            className="mx-auto flex w-fit items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-zinc-300 p-1 px-2 text-xs dark:bg-zinc-800"
            onClick={handleInputClick}
          >
            <img
              src={icono_importar}
              className="size-5 cursor-pointer"
              alt="Icono borrar categoria"
            ></img>
            Importar datos
          </button>
        </label>
      </div>
    </div>
  );
}
