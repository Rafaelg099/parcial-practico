import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password,
      });
      alert("✅ Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("Error al registrar. Intenta con otro correo.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
