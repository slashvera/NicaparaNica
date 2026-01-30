import { useState } from "react";
import { getUser } from "../api/users";
import { useNavigate, useParams } from "react-router";
import MainLayout from "./layouts/dashboard";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username:"",
    password: "",
    role: "student", // valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí llamas a tu API con axios y mandas también el rol
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>

        {/* 🔹 Radios para elegir rol */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Selecciona tu rol:</p>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
                className="mr-2"
              />
              Estudiante
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleChange}
                className="mr-2"
              />
              Docente
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleChange}
                className="mr-2"
              />
              Admin
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
