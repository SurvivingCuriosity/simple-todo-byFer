import React, { useEffect } from "react";
import Select from "react-select";
import { FormularioSubtareas } from "./FormularioSubtareas";
import { PreviewSubtareas } from "./PreviewSubtareas";
import { useTareasContext } from "../context/TareasContext";
import { crearTarea } from "../context/TareasActions";
import { toast } from "react-toastify";
export function FormularioNuevaTarea() {
  const { dispatch, state } = useTareasContext();
  const { idCategoriaActiva, categorias } = state;

  const [tituloTarea, setTituloTarea] = React.useState("");
  const [idCategoria, setIdCategoria] = React.useState(
    categorias.find((cat) => cat.id === idCategoriaActiva)?.id ?? ""
  );
  const [textoCategoria, setTextoCategoria] = React.useState("");
  const [subTareas, setSubTareas] = React.useState([]);

  useEffect(() => {
    setIdCategoria(
      categorias.find((cat) => cat.id === idCategoriaActiva)?.id ?? ""
    );
  }, [idCategoriaActiva]);

  const handleChangeCategoria = (evt, action) => {
    switch (action.action) {
      case "clear":
        setIdCategoria("");
        break;
      case "select-option":
        setIdCategoria(evt.value);
        break;
      default:
    }
  };

  const handleInputCategoria = (text) => {
    setTextoCategoria(text);
  };

  const handleSubmit = (evt) => {

    toast.success('Tarea agregada!');

    evt.preventDefault();
    if (tituloTarea === "") return;
    dispatch(
      crearTarea({
        titulo: tituloTarea,
        subtareas: subTareas || [],
        idCategoria,
      })
    );
    setTituloTarea("");
    setSubTareas([]);
  };

  const nuevaSubTarea = (subtarea) => {
    setSubTareas((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          text: subtarea,
          checked: false,
        },
      ];
    });
  };

  const limpiaCampos = () => {
    setTituloTarea("");
    setSubTareas([]);
  };

  const options = categorias.map((cat) => {
    return { value: cat.id, label: cat.nombre };
  });

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "100%",
    }),
    option: (provided) => ({
      ...provided,
      borderBottom: "1px solid white",
      color: "white",
      backgroundColor: "#333",
      overflowY: "hidden",
    }),
    control: (provided) => ({
      ...provided,
      color: "white",
      backgroundColor: "white",
      borderRadius: 8,
      minHeight: 35.5,
      height: 35.5,
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.7em",
      position: "initial",
      color: "white",
      backgroundColor: "#333",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: 35.5,
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      height: 35.5,
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: 35.5,
    }),
  };

  return (
    <div>
      <form onSubmit={(evt) => handleSubmit(evt)}>
        <div
          className={`flex w-full items-center gap-4 ${
            tituloTarea === "" ? "rounded-lg" : "rounded-t-lg"
          }  bg-neutral-200 dark:bg-neutral-800 p-2`}
        >
          <label htmlFor="input-crear-tarea" className="text-base font-bold">
            Tarea
          </label>
          <input
            id="input-crear-tarea"
            className="w-full rounded-lg bg-white p-2 text-neutral-800"
            autoFocus
            onChange={(evt) => {
              setTituloTarea(evt.target.value);
            }}
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                handleSubmit(evt);
              }
            }}
            value={tituloTarea}
            type="text"
            placeholder="¿Qué tienes que hacer?"
          ></input>
        </div>

        <div
          className={`${tituloTarea === "" ? "" : "is-open"}
           wrapper overflow-hidden`}
        >
          <div className="w-full">
            <div
              className={`rounded-b-lg bg-neutral-200  dark:bg-neutral-800 inner flex h-full flex-col justify-between`}
            >
              <div className="p-2">
                <div className="flex min-h-14 items-start py-2">
                  <label className="mr-4 mt-1 text-base font-bold">
                    Categoría
                  </label>
                  <Select
                    autoFocus={false}
                    isOptionSelected={true}
                    value={
                      idCategoria === ""
                        ? {
                            label: "Sin categoría",
                            value: "",
                          }
                        : {
                            label: categorias.find(
                              (cat) => cat.id === idCategoria
                            ).nombre,
                            value: categorias.find(
                              (cat) => cat.id === idCategoria
                            ).id,
                          }
                    }
                    defaultValue={
                      idCategoria === ""
                        ? {
                            label: "Sin categoría",
                            value: "",
                          }
                        : {
                            label: categorias.find(
                              (cat) => cat.id === idCategoria
                            ).nombre,
                            value: categorias.find(
                              (cat) => cat.id === idCategoria
                            ).id,
                          }
                    }
                    isClearable
                    onChange={handleChangeCategoria}
                    onInputChange={handleInputCategoria}
                    options={options}
                    styles={customStyles}
                    placeholder={"Sin categoría"}
                    noOptionsMessage={() => (
                      <p>
                        {textoCategoria === ""
                          ? "No hay categorías"
                          : `No existe '${textoCategoria.trim()}'`}
                      </p>
                    )}
                  />
                </div>

                <div className="flex min-h-14 flex-col justify-center py-2">
                  <div className="flex items-center gap-4">
                    <label className="text-base font-bold">Subtareas: </label>
                    <FormularioSubtareas
                      tareaMadre={tituloTarea}
                      callback={nuevaSubTarea}
                    />
                  </div>
                  {subTareas.length > 0 && (
                    <PreviewSubtareas
                      tareaMadre={tituloTarea}
                      tareas={subTareas}
                    />
                  )}
                </div>

                <div className="flex min-h-14 items-end justify-between">
                  <button
                    className="rounded-md border border-red-400 px-3 py-1 text-red-400"
                    onClick={limpiaCampos}
                  >
                    Cancelar
                  </button>
                  <input
                    type="submit"
                    disabled={tituloTarea === "" ? true : false}
                    className="rounded-md border border-neutral-800 px-3 py-1 dark:border-neutral-200"
                    value="Añadir tarea"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
