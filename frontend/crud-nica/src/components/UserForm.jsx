import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { createUser, updateUser } from "../api/users"; //Importar la función para crear un nuevo estudiante
import { getUser } from "../api/users";//Importamos APi de usuarios
import { useNotify } from "../hook/useNotify";

export default function UserForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams(); //Obtenemos los parámetros de la URL (aunque no se usan en este componente)

  const [user, setUser] = useState({
    //variable
    username: '',
    password: '',
    confirmPassword: '',
    email: "",
    is_active: false,
  });

  //Cargar usuarios con useEffect
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUser(params.id);
        //console.log("USERS:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de contraseña
    if (user.password !== user.confirmPassword) {
        notify.error("Las contraseñas no coinciden");
        return;
    }

    if (user.password.length < 8) {
        notify.error("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    const regexMayuscula = /[A-Z]/;
    const regexMinuscula = /[a-z]/;
    const regexNumero = /[0-9]/;
    const regexEspecial = /[!@#$%^&*]/;

    if (!regexMayuscula.test(user.password)) {
        notify.error("La contraseña debe incluir al menos una letra mayúscula");
        return;
    }
    if (!regexMinuscula.test(user.password)) {
        notify.error("La contraseña debe incluir al menos una letra minúscula");
        return;
    }
    if (!regexNumero.test(user.password)) {
        notify.error("La contraseña debe incluir al menos un número");
        return;
    }
    if (!regexEspecial.test(user.password)) {
        notify.error("La contraseña debe incluir al menos un carácter especial (!@#$%^&*)");
        return;
    }

    // Si pasa todas las validaciones, se envía al backend
    if (user.id) {
        await updateUser(user.id, user);
    } else {
        await createUser(user);
    }
    navigate("/");
    };

  return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Usuario</h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Username:
          </label>
          <input
            value={user.username}
            type="text"
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
            id="username"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">
            Password:
          </label>
          <input
            value={user.password}
            type="password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
            id="password"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">
            Confirm Password:
          </label>
          <input
            value={user.confirmPassword}
            type="password"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            id="confirmPassword"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>

          <input
            value={user.email}
            type="email"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            id="email"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
          <input
            id="is_active"
            type="checkbox"
            checked={user.is_active} // Usamos checked en lugar de value
            onChange={(e) =>
              setUser({ ...user, is_active: e.target.checked })
            }
            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
          />
          <label
            htmlFor="is_active"
            className="ml-3 text-sm font-bold text-gray-700 cursor-pointer"
          >
            ¿El usuario está activo?
          </label>
          <span
            className={`ml-auto text-xs font-bold px-2 py-1 rounded ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {user.is_active ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() => navigate("/users")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
