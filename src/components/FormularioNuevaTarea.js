import React, { useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { crearTarea } from "../context/TareasActions";
import { useTareasContext } from "../context/TareasContext";

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
  }, [idCategoriaActiva, categorias]);

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

  const limpiaCampos = (e) => {
    e.preventDefault()
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
      border: '1px solid rgb(115,115,115)',
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
      
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      
    }),
  };

  return (
    <div>
      <form onSubmit={(evt) => handleSubmit(evt)}>
        <div
          className={`flex w-full items-center gap-4 p-2 bg-neutral-200 dark:bg-neutral-800 ${
            tituloTarea === "" ? "rounded-lg" : "rounded-t-lg"
          }`}
        >
          <input
            id="input-crear-tarea"
            className="h-[38px] w-full rounded-lg border border-neutral-500 bg-white p-2 text-neutral-800"
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
              <div className="p-2 pt-0">
                <div className="flex items-start py-2">
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
                            )?.nombre || "Sin categoría",
                            value: categorias.find(
                              (cat) => cat.id === idCategoria
                            )?.id || "",
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
                            )?.nombre || "Sin categoría",
                            value: categorias.find(
                              (cat) => cat.id === idCategoria
                            )?.id || "",
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

                <div className="flex items-end justify-between">
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
