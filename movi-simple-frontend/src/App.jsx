import { Routes, Route, Navigate } from "react-router-dom";
import TripPage from "./pages/TripPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/trip" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/trip"
        element={
          <PrivateRoute>
            <TripPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
