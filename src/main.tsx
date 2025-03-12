import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { App } from "./App.tsx";
import { listenToAuthChanges } from "./services/authService";

listenToAuthChanges();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
