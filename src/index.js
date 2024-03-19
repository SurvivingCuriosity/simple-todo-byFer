import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import { TareasContextProvider } from "./context/TareasContext";

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
