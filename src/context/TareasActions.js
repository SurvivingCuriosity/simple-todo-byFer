import { ACTIONS } from "./TareasReducer";

// TAREAS

export const importarDatos = ({ tareas, categorias, idCategoriaActiva }) => {
  return {
    type: ACTIONS.IMPORTAR_DATOS,
    payload: { tareas, categorias, idCategoriaActiva },
  };
};
export const importarCategoria = (categoria) => {
  return { type: ACTIONS.IMPORTAR_DATOS, payload: categoria };
};

export const crearTarea = ({ titulo, subtareas, idCategoria }) => {
  return {
    type: ACTIONS.CREAR_TAREA,
    payload: { titulo, subtareas, idCategoria },
  };
};

export const eliminarTarea = (idTarea) => {
  return { type: ACTIONS.ELIMINAR_TAREA, payload: idTarea };
};

export const eliminarTareasCompletadas = () => {
  return { type: ACTIONS.ELIMINAR_TAREAS_COMPLETADAS };
};

export const checkTarea = (idTarea) => {
  return { type: ACTIONS.CHECK_TAREA, payload: idTarea };
};

export const toggleExpandTarea = (idTarea) => {
  return { type: ACTIONS.TOGGLE_EXPAND_TAREA, payload: idTarea };
};

// SUBTAREAS

export const updateTarea = (nuevoTitulo, idTarea) => {
  return { type: ACTIONS.UPDATE_TAREA, payload: { nuevoTitulo, idTarea } };
};

export const addSubtarea = (subtarea, idTarea) => {
  return { type: ACTIONS.ADD_SUBTAREA, payload: { subtarea, idTarea } };
};

export const checkSubtarea = (idTareaPadre, idSubtarea) => {
  return {
    type: ACTIONS.CHECK_SUBTAREA,
    payload: { idTareaPadre, idSubtarea },
  };
};

export const eliminarSubtarea = (idTareaPadre, idSubtarea) => {
  return {
    type: ACTIONS.ELIMINAR_SUBTAREA,
    payload: { idTareaPadre, idSubtarea },
  };
};

// CATEGORIAS

export const crearCategoria = (nombreCategoria) => {
  return { type: ACTIONS.CREAR_CATEGORIA, payload: nombreCategoria };
};

export const eliminarCategoria = (idCategoria) => {
  return { type: ACTIONS.ELIMINAR_CATEGORIA, payload: idCategoria };
};

export const setCategoriaActiva = (idCategoria) => {
  return { type: ACTIONS.SET_CATEGORIA_ACTIVA, payload: idCategoria };
};
