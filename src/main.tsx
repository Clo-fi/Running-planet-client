import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import TanstackProvider from "./libs/tanstack/TanstackProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TanstackProvider>
      <App />
    </TanstackProvider>
  </React.StrictMode>,
);
