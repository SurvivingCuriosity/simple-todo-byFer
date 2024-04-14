import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import { TareasContextProvider } from "./context/TareasContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TareasContextProvider>
        <App />
      </TareasContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// Registra el Service Worker si el navegador lo soporta
serviceWorkerRegistration.register()