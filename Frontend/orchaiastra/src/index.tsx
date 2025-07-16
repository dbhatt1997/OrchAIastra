import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { NotificationProvider } from "./shared/components/Snackbar/Snackbar";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as any);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
