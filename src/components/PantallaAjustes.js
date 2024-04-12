import React, { useEffect, useState } from "react";
import icono_anadir_disabled from "../imgs/icono_anadir_disabled.svg";
import icono_anadir_enabled from "../imgs/icono_anadir_enabled.svg";
import icono_borrar_rojo from "../imgs/icono_borrar_rojo.svg";
import icono_exportar from "../imgs/export_icon.svg";
import icono_importar from "../imgs/import_icon.svg";
import { useTareasContext } from "../context/TareasContext";
import { crearCategoria, eliminarCategoria, importarDatos } from "../context/TareasActions";
import { saveAs } from "file-saver";
export function PantallaAjustes() {
  const { state, dispatch } = useTareasContext();
  const {categorias, idCategoriaActiva, tareas } = state;

  const [mostrandoFormNuevaCategoria, setMostrandoFormNuevaCategoria] =
    useState(false);
  const [mostrandoSubirArchivo, setMostrandoSubirArchivo] = useState(false);
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

  const handleDescargarDatos = () => {
    console.log("Se ha descargado los datos");
    const contenido = JSON.stringify({
      categorias,
      tareas,
      idCategoriaActiva
    });
    const fecha = new Date()
    const fechaString = fecha.getDay() + "/" + fecha.getMonth()+1 + "/" + fecha.getFullYear();
    const nombreArchivo = "tareas-" + fechaString + ".json";

    // Crear un nuevo Blob con el contenido de texto
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });

    // Utilizar la función saveAs para iniciar la descarga del archivo
    saveAs(blob, nombreArchivo);
  };

  const handleInputClick = () => {
    // Simula el clic en el input file cuando se hace clic en el botón
    document.getElementById("input-file").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);

    if (!file) {
      console.error("No se seleccionó ningún archivo.");
      return;
    }

    // Verificar que el archivo sea de tipo JSON
    if (!file.name.endsWith(".json")) {
      console.error("El archivo seleccionado no es un archivo JSON.");
      return;
    }

    // Leer el contenido del archivo
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        dispatch(importarDatos(jsonContent));
        console.log("Contenido del archivo JSON:", jsonContent);
      } catch (error) {
        console.error(
          "Error al analizar el contenido del archivo JSON:",
          error
        );
      }
    };
    reader.readAsText(file);
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
            onClick={handleInputClick}
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
                        handleDescargarDatos();
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
            handleDescargarDatos();
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
