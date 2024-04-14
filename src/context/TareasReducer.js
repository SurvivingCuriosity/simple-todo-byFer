import { produce } from "immer";
import { obtenFecha } from "../helpers/fechas";
import { toast } from "react-toastify";

// TareasReducer.js
export const ACTIONS = {
  IMPORTAR_DATOS: "IMPORTAR_DATOS",
  IMPORTAR_CATEGORIA: "IMPORTAR_CATEGORIA",
  CREAR_TAREA: "CREAR_TAREA",
  ELIMINAR_TAREA: "ELIMINAR_TAREA",
  ELIMINAR_TAREAS_COMPLETADAS: "ELIMINAR_TAREAS_COMPLETADAS",
  CHECK_TAREA: "CHECK_TAREA",
  TOGGLE_EXPAND_TAREA: "TOGGLE_EXPAND_TAREA",
  UPDATE_TAREA: "UPDATE_TAREA",
  ADD_SUBTAREA: "ADD_SUBTAREA",
  CHECK_SUBTAREA: "CHECK_SUBTAREA",
  ELIMINAR_SUBTAREA: "ELIMINAR_SUBTAREA",
  CREAR_CATEGORIA: "CREAR_CATEGORIA",
  ELIMINAR_CATEGORIA: "ELIMINAR_CATEGORIA",
  SET_CATEGORIA_ACTIVA: "SET_CATEGORIA_ACTIVA",
};

export const tareasReducer = produce((draft, action) => {
  let tareas = draft.tareas;
  let categorias = draft.categorias;

  if (action.type === ACTIONS.CREAR_TAREA) {
    const { titulo, subtareas, idCategoria } = action.payload;
    tareas.unshift({
      id: Date.now(),
      fecha: obtenFecha(Date.now()),
      titulo: titulo,
      subtareas: subtareas || [],
      idCategoria: idCategoria,
      checked: false,
      expanded: false,
    });
  }

  if (action.type === ACTIONS.ELIMINAR_TAREA) {
    const index = tareas.findIndex((tarea) => tarea.id === action.payload);
    if (index !== -1) {
      tareas.splice(index, 1);
      toast.success('Tarea eliminada!');
    }
  }

  if (action.type === ACTIONS.CHECK_TAREA) {
    const tarea = tareas.find((t) => t.id === action.payload);
    tarea.checked = !tarea.checked;
  }

  if (action.type === ACTIONS.TOGGLE_EXPAND_TAREA) {
    const tarea = tareas.find((t) => t.id === action.payload);
    tarea.expanded = !tarea.expanded;
  }

  if (action.type === ACTIONS.UPDATE_TAREA) {
    const tarea = tareas.find((t) => t.id === action.payload.idTarea);
    tarea.titulo = action.payload.nuevoTitulo;
  }

  if (action.type === ACTIONS.ADD_SUBTAREA) {
    const tarea = tareas.find((t) => t.id === action.payload.idTarea);
    tarea.subtareas.push({
      id: Date.now(),
      titulo: action.payload.subtarea,
      checked: false,
    });
  }

  if (action.type === ACTIONS.CHECK_SUBTAREA) {
    const tareaPadre = tareas.find((t) => t.id === action.payload.idTareaPadre);
    const subtarea = tareaPadre.subtareas.find(
      (t) => t.id === action.payload.idSubtarea
    );
    subtarea.checked = !subtarea.checked;
  }

  if (action.type === ACTIONS.ELIMINAR_SUBTAREA) {
    const tareaPadre = tareas.find((t) => t.id === action.payload.idTareaPadre);
    const index = tareaPadre.subtareas.findIndex(
      (tarea) => tarea.id === action.payload.idSubtarea
    );
    if (index !== -1) {
      tareaPadre.subtareas.splice(index, 1);
    }
  }

  if (action.type === ACTIONS.ELIMINAR_TAREAS_COMPLETADAS) {
    tareas = tareas.filter((t) => t.checked === false);
    draft.tareas = tareas;
  }

  if (action.type === ACTIONS.CREAR_CATEGORIA) {
    console.log("Se quiere crear: ", action.payload);
    categorias.unshift({
      id: Date.now(),
      nombre: action.payload,
    });
  }

  if (action.type === ACTIONS.ELIMINAR_CATEGORIA) {
    const index = categorias.findIndex((cat) => cat.id === action.payload);
    if (index !== -1) {
      categorias.splice(index, 1);
    }
  }

  if (action.type === ACTIONS.SET_CATEGORIA_ACTIVA) {
    const categoriaActiva = categorias.find((cat) => cat.id === action.payload);
    if (categoriaActiva) {
      // Remover la categoría activa de su posición actual
      const index = categorias.findIndex((cat) => cat.id === action.payload);
      if (index !== -1) {
        categorias.splice(index, 1);
      }
      // Mover la categoría activa al principio del array
      categorias.unshift(categoriaActiva);
    }
    draft.idCategoriaActiva = action.payload;
  }

  if (action.type === ACTIONS.IMPORTAR_DATOS) {
    const datos = action.payload;
    console.log("Datos importados: ", datos);
    tareas.push(...datos.tareas)
    categorias.push(...datos.categorias);
    draft.idCategoriaActiva = datos.idCategoriaActiva;
  }

  if (action.type === ACTIONS.IMPORTAR_CATEGORIA) {
    const categoria = action.payload;
    categorias.push(categoria);
  }
});
