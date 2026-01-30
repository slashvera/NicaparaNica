import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { createTutor, getTutor, updateTutor } from "../api/tutors"; //Importar la función para crear un nuevo estudiante
import { getUsers } from "../api/users";//Importamos APi de usuarios
import { useNotify } from "../hook/useNotify";

export default function TutorForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams();

  const [tutor, setTutor] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    correo_tutor: "",
    is_active: true,
    user: "",
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadTutor = async () => {
      if (params.id_tutor) {
        const response = await getTutor(params.id_tutor);
        setTutor(response.data);
      }
    };
    loadTutor();
  }, [params.id_tutor]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tutor.first_name || !tutor.last_name || !tutor.gender || !tutor.correo_tutor || !tutor.user) {
      notify.error("Todos los campos son obligatorios");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(tutor.correo_tutor)) {
      notify.error("El correo electrónico no es válido");
      return;
    }

    if (params.id_tutor) {
      await updateTutor(params.id_tutor, tutor);
      notify.success("Tutor actualizado correctamente");
    } else {
      await createTutor(tutor);
      notify.success("Tutor creado correctamente");
    }

    navigate("/");
  };

  return (
    <div className="bg-base-200 text-base-content flex justify-center items-center min-h-screen transition-colors duration-500">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Tutor</h1>
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input
            value={tutor.first_name}
            type="text"
            onChange={(e) => setTutor({ ...tutor, first_name: e.target.value })}
            id="name"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Apellido */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">Last Name:</label>
          <input
            value={tutor.last_name}
            type="text"
            onChange={(e) => setTutor({ ...tutor, last_name: e.target.value })}
            id="lastname"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Género */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
          <select
            value={tutor.gender}
            onChange={(e) => setTutor({ ...tutor, gender: e.target.value })}
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input
            value={tutor.correo_tutor}
            type="email"
            onChange={(e) => setTutor({ ...tutor, correo_tutor: e.target.value })}
            id="email"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Usuario</label>
          <select
            value={tutor.user}
            onChange={(e) => setTutor({ ...tutor, user: e.target.value })}
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Seleccione un usuario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div className="mb-6 flex items-center bg-base-200 p-3 rounded-lg border border-base-300">
          <input
            id="is_active"
            type="checkbox"
            checked={tutor.is_active}
            onChange={(e) => setTutor({ ...tutor, is_active: e.target.checked })}
            className="w-5 h-5 text-primary bg-base-100 border-base-300 rounded focus:ring-primary cursor-pointer"
          />
          <label htmlFor="is_active" className="ml-3 text-sm font-bold cursor-pointer">
            ¿El tutor está activo?
          </label>
          <span
            className={`ml-auto text-xs font-bold px-2 py-1 rounded ${
              tutor.is_active ? "bg-success text-success-content" : "bg-error text-error-content"
            }`}
          >
            {tutor.is_active ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary duration-200 cursor-pointer"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() => navigate("/teachers")}
            className="bg-error hover:bg-red-700 text-error-content font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-error duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

