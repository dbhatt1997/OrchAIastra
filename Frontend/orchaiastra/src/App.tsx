import { useContext } from "react";

import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { AppContext } from "./context/AppContext";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { authToken } = useContext(AppContext);
  return (
    <Routes>
      <Route
        path="/login"
        element={authToken ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={authToken ? <Navigate to="/home" replace /> : <Signup />}
      />
      <Route
        path="/home"
        element={authToken ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={
          authToken ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
