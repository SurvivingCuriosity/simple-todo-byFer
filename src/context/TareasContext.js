// TareasContext.js
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { tareasReducer } from "./TareasReducer";
import useLocalStorage from "use-local-storage";

const TareasContext = createContext();

export const TareasContextProvider = ({ children }) => {
  const [tareasLS, setTareasLS] = useLocalStorage("todobyfer_tareas", []);
  const [categoriasLS, setCategoriasLS] = useLocalStorage(
    "todobyfer_categorias",
    []
  );
  const [idCategoriaActivaLS, setIdCategoriaActivaLS] = useLocalStorage(
    "todobyfer_idCategoriaActiva",
    ""
  );

  const initialState = {
    tareas: tareasLS,
    categorias: categoriasLS,
    idCategoriaActiva: idCategoriaActivaLS,
  };

  const [state, dispatch] = useReducer(tareasReducer, initialState);

  useEffect(() => {
    setTareasLS(state.tareas)
  }, [state.tareas]);
  
  useEffect(() => {
    setCategoriasLS(state.categorias)
  }, [state.categorias]);

  useEffect(() => {
    setIdCategoriaActivaLS(state.idCategoriaActiva)
  }, [state.idCategoriaActiva]);

  return (
    <TareasContext.Provider value={{ state, dispatch }}>
      {children}
    </TareasContext.Provider>
  );
};

export const useTareasContext = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error(
      "useTareasContext must be used within an TareasContextProvider"
    );
  }
  return context;
};
