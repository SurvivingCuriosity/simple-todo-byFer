import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export const handleDescargarDatos = (tareas, categorias, idCategoriaActiva) => {
  const contenido = JSON.stringify({
    categorias,
    tareas,
    idCategoriaActiva,
  });
  const fecha = new Date();
  const fechaString = `${fecha.getDate()}-${ fecha.getMonth() + 1 }-${fecha.getFullYear()}-${fecha.getHours()}:${fecha.getMinutes()}`;
  const nombreArchivo = `tareas-${fechaString}.json`;
  
  // Crear un nuevo Blob con el contenido de texto
  const blob = new Blob([contenido], { type: "text/json;charset=utf-8" });
  
  // Utilizar la función saveAs para iniciar la descarga del archivo
  saveAs(blob, nombreArchivo);
  toast.success("Datos exportados!");
};

export const handleDescargarCategoria = (categoria) => {
  const contenido = JSON.stringify({
    categoria,
  });
  const fecha = new Date();
  const fechaString = `${fecha.getDate()}-${ fecha.getMonth() + 1 }-${fecha.getFullYear()}-${fecha.getHours()}:${fecha.getMinutes()}`;
  const nombreArchivo = `tareas-${categoria.nombre}-${fechaString}.json`;

  // Crear un nuevo Blob con el contenido de texto
  const blob = new Blob([contenido], { type: "text/json;charset=utf-8" });

  // Utilizar la función saveAs para iniciar la descarga del archivo
  saveAs(blob, nombreArchivo);
  toast.success("Categoría exportada!");
};
