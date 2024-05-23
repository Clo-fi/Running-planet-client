import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import TanstackProvider from "./libs/tanstack/TanstackProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import RootErrorBoundary from "./components/RootErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootErrorBoundary>
        <TanstackProvider>
          <App />
        </TanstackProvider>
      </RootErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
