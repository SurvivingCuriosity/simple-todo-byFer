import React from "react";

import { FormularioNuevaTarea } from "./components/FormularioNuevaTarea";
import { Tarea } from "./components/Tarea";
import { NavCategorias } from "./components/NavCategorias";
import { PantallaAjustes } from "./components/PantallaAjustes";
import { TEMAS } from "./context/ThemeContext";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useTareasContext } from "./context/TareasContext";
import 'react-toastify/dist/ReactToastify.css';
import {
  eliminarTareasCompletadas,
} from "./context/TareasActions";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const { state, dispatch } = useTareasContext();
  const { tareas, categorias, idCategoriaActiva } = state;

  const [mostrandoAjustes, setMostrandoAjustes] = React.useState(false);

  //Son las tareas de la categoria activa	(inicialmente son todas)
  const [tareasCategoria, setTareasCategoria] = React.useState(tareas.filter((tarea) => tarea.idCategoria === idCategoriaActiva));

  //Establece el tema por defecto
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", TEMAS.dark);
  }, []);

  //Cuando cambian las tareas o categorias, las anado al localstorage
  React.useEffect(() => {
    // setCategoriasLS(categorias);
  }, [categorias]);
  React.useEffect(() => {
    // setTareasLS(tareas);
  }, [tareas]);

  //Cuando se añade una tarea o cambia categoriaActiva, hay que actualizar tareasCategorias para que se renderice en pantalla
  React.useEffect(() => {
    // setCategoriaActivaLS(categoriaActiva);
    setTareasCategoria(
      tareas.filter((tarea) => tarea.idCategoria === idCategoriaActiva)
    );
  }, [idCategoriaActiva, tareas]);


  const hayTareasCompletadas = () => {
    return tareas.some((tarea) => tarea.checked === true);
  };

  const handleEliminarTareasCompletadas = () => {
    dispatch(eliminarTareasCompletadas());
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full flex-col bg-neutral-50 p-2 text-neutral-900 md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12 dark:bg-neutral-900 dark:text-neutral-200">
      <div
        className={`flex flex-col justify-between fixed top-0 z-10 h-dvh w-full dark:bg-black/90 bg-neutral-100/90 backdrop-blur-[2px] ${
          mostrandoAjustes ? "left-0" : "left-full"
        } transition-all duration-200 pt-20 pb-4`}
      >
        <PantallaAjustes
          handleCloseCallback={() => {
            setMostrandoAjustes(false);
          }}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <button
          aria-label="Botón abrir menú lateral"
          onClick={() => {
            setMostrandoAjustes(!mostrandoAjustes);
          }}
          className="z-20 flex size-6 flex-col justify-center gap-2"
        >
          <span
            className={`${
              mostrandoAjustes ? "rotate-[45deg] scale-[120%]" : "rotate-0"
            } h-0.5 w-full rounded-lg dark:bg-neutral-200 transition-all duration-200 origin-top-left bg-neutral-900`}
          ></span>
          <span
            className={`${
              mostrandoAjustes ? "opacity-0" : "opacity-1"
            } h-0.5 w-full rounded-lg dark:bg-neutral-200 transition-all duration-200 origin-bottom-left bg-neutral-900`}
          ></span>
          <span
            className={`${
              mostrandoAjustes ? "-rotate-[45deg] scale-[120%]" : "rotate-0"
            } h-0.5 w-full rounded-lg dark:bg-neutral-200 transition-all duration-200 origin-bottom-left bg-neutral-900`}
          ></span>
        </button>

        <h1 className="text-3xl">Tareas</h1>

        <ThemeSwitcher />
      </div>

      <p className="p-2 text-center">Un texto motivador...</p>

      <FormularioNuevaTarea />

      <NavCategorias />

        <>
          <ul className="flex flex-col gap-2">
            {tareasCategoria.length <= 0 ? (
              <p className="p-4">
                No hay tareas pendientes...
              </p>
            ) : (
              tareasCategoria.map((tarea) => {
                return (
                  <Tarea
                    key={tarea.id}
                    tarea={tarea}
                  />
                );
              })
            )}
          </ul>
        </>


      {hayTareasCompletadas() && (
        <>
        <button
          className="mt-2 text-red-400"
          onClick={handleEliminarTareasCompletadas}
          >
          Eliminar tareas completadas
        </button>
          </>
      )}
      <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          toastClassName={`rounded-md border border-neutral-500 m-2 w-10/12 mx-auto bg-neutral-800`} 
        />
    </div>
  );
}

export default App;
