import { importarCategoria, importarDatos } from "../context/TareasActions";
import { useTareasContext } from "../context/TareasContext";
import { toast } from "react-toastify";

export const useImportar = () => {
  const { dispatch } = useTareasContext();

  const handleImportarDatos = (contenido) => {
    const file = contenido;
    console.log("Archivo seleccionado:", file);

    if (!file) {
      toast.error("No se seleccionó ningún archivo.");
      console.error("No se seleccionó ningún archivo.");
      return;
    }

    // Verificar que el archivo sea de tipo JSON
    if (!file.name.endsWith(".json")) {
      toast.error("El archivo seleccionado no es un archivo JSON.");
      console.error("El archivo seleccionado no es un archivo JSON.");
      return;
    }

    // Leer el contenido del archivo
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        console.log("Contenido del archivo JSON:", jsonContent);

        // Verificar si el objeto JSON contiene las propiedades necesarias
        if (
          Array.isArray(jsonContent.tareas) &&
          Array.isArray(jsonContent.categorias) &&
          typeof jsonContent.idCategoriaActiva === "string"
        ) {
          dispatch(importarDatos(jsonContent));
        } else {
          // Mostrar un toast indicando que el archivo JSON no contiene los datos necesarios
          toast.error("El archivo JSON no contiene los datos necesarios.");
        }
      } catch (error) {
        // Capturar errores de análisis JSON
        toast.error("Error al analizar el contenido del archivo JSON.");
        console.error(
          "Error al analizar el contenido del archivo JSON:",
          error
        );
      }
    };
    reader.readAsText(file);
  };

  const handleImportarCategoria = (contenido) => {
    const file = contenido;
    console.log("Archivo seleccionado:", file);

    if (!file) {
      toast.error("No se seleccionó ningún archivo.");
      console.error("No se seleccionó ningún archivo.");
      return;
    }

    // Verificar que el archivo sea de tipo JSON
    if (!file.name.endsWith(".json")) {
      toast.error("El archivo seleccionado no es un archivo JSON.");
      console.error("El archivo seleccionado no es un archivo JSON.");
      return;
    }

    // Leer el contenido del archivo
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        console.log("Contenido del archivo JSON:", jsonContent);

        // Verificar si el objeto JSON contiene las propiedades necesarias
        if (
          Array.isArray(jsonContent.categorias)
        ) {
          dispatch(importarCategoria(jsonContent));
        } else {
          // Mostrar un toast indicando que el archivo JSON no contiene los datos necesarios
          toast.error("El archivo JSON no contiene los datos necesarios.");
        }
      } catch (error) {
        // Capturar errores de análisis JSON
        toast.error("Error al analizar el contenido del archivo JSON.");
        console.error(
          "Error al analizar el contenido del archivo JSON:",
          error
        );
      }
    };
    reader.readAsText(file);
  };

  return {
    handleImportarDatos,
  };
};
