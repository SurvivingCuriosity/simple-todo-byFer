import useLocalStorage from 'use-local-storage';
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export const TEMAS = {
  dark: "dark",
  light: "light",
};

export const ThemeContextProvider = ({ children }) => {

  const [temaLS, setTemaLS] = useLocalStorage("tema", TEMAS.dark);

  const [tema, setTema] = useState(temaLS);

  const activarTema = (tema) => {
    setTema(tema);
  };

  useEffect(() => {
    setTemaLS(tema);
  }, [tema]);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html !== null) {
        if (tema === TEMAS.dark) {
            html.classList.add('dark');
            html.setAttribute('data-theme', 'dark'); // Utiliza setAttribute para establecer el valor del atributo
        } else {
            html.classList.remove('dark');
            html.setAttribute('data-theme', 'light'); // Utiliza setAttribute para establecer el valor del atributo
        }
    }
}, [tema]);


  return (
    <ThemeContext.Provider value={{ tema, activarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within an ThemeContextProvider");
  }
  return context;
};
