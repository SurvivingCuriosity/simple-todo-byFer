import { saveAs } from "file-saver";

export const handleDescargarDatos = (tareas, categorias, idCategoriaActiva) => {
  const contenido = JSON.stringify({
    categorias,
    tareas,
    idCategoriaActiva,
  });
  const fecha = new Date();
  const fechaString = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`; 
  const nombreArchivo = `tareas-${fechaString}.json`;	

  // Crear un nuevo Blob con el contenido de texto
  const blob = new Blob([contenido], { type: "text/json;charset=utf-8" });

  // Utilizar la función saveAs para iniciar la descarga del archivo
  saveAs(blob, nombreArchivo);
};

export const handleDescargarCategoria = (categoria) => {   
    const contenido = JSON.stringify({
      categoria,
    });
    const fecha = new Date();
    const fechaString = fecha.getDay() + "/" + fecha.getMonth() + 1 + "/" + fecha.getFullYear();
    const nombreArchivo = `cat-${categoria.nombre}-${fechaString}.json`;
  
    // Crear un nuevo Blob con el contenido de texto
    const blob = new Blob([contenido], { type: "text/json;charset=utf-8" });
  
    // Utilizar la función saveAs para iniciar la descarga del archivo
    saveAs(blob, nombreArchivo);
  };
