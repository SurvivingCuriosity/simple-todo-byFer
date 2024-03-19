import React, { useRef } from "react";
import icono_anadir_enabled from "../imgs/icono_anadir_enabled.svg";
import icono_anadir_disabled from "../imgs/icono_anadir_disabled.svg";
import { useTareasContext } from "../context/TareasContext";
import { addSubtarea } from "../context/TareasActions";
export function FormularioSubtareas({ idTareaPadre }) {
  const inputRef = useRef();
  const [textSubtarea, setTextSubtarea] = React.useState("");

  const [mostrandoForm, setMostrandoForm] = React.useState(false);

  const handleChange = (evt) => {
    setTextSubtarea(evt.target.value);
  };
  const { dispatch } = useTareasContext();

  const handleSubmit = (evt) => {
    console.log("HANDLING SUBMIT", textSubtarea);
    evt.preventDefault();
    if (textSubtarea === "") {
      console.log("Esta vacio, me salgo");
      return;
    }
    dispatch(addSubtarea(textSubtarea, idTareaPadre));
    setTextSubtarea("");
    inputRef.current.focus();
  };

  return (
    <>
      {mostrandoForm ? (
        <form className="flex w-full items-center gap-2">
          <input
            ref={inputRef}
            onChange={handleChange}
            value={textSubtarea}
            type="text"
            className="w-full rounded-md p-1 text-neutral-800"
            placeholder={`Introduce subtareas`}
          ></input>
          <input
            onClick={
              textSubtarea === "" ? () => setMostrandoForm(false) : handleSubmit
            }
            className={`${
              textSubtarea === "" ? "rotate-45" : "rotate-0"
            } transition-all duration-200`}
            type="image"
            src={
              textSubtarea === "" ? icono_anadir_disabled : icono_anadir_enabled
            }
            alt="icono nueva tarea"
          ></input>
        </form>
      ) : (
        <div
          onClick={() => {
            setMostrandoForm(!mostrandoForm);
          }}
          className="underline"
        >
          Añadir subtarea
        </div>
      )}
    </>
  );
}
