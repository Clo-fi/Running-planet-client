import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import TanstackProvider from "./libs/tanstack/TanstackProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>에러</div>}>
      <BrowserRouter>
        <TanstackProvider>
          <App />
        </TanstackProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
