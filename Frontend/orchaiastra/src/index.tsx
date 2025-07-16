import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { NotificationProvider } from "./shared/components/Snackbar/Snackbar";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      return;
    }
    originalError(...args);
  };
}

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
