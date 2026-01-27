import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { createTutor, getTutor, updateTutor } from "../api/tutors"; //Importar la función para crear un nuevo estudiante
import { getUsers } from "../api/users";//Importamos APi de usuarios
import { useNotify } from "../hook/useNotify";

export default function TutorForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams(); //Obtenemos los parámetros de la URL (aunque no se usan en este componente)

  const [tutor, setTutor] = useState({
    //variable
    first_name: "",
    last_name: "",
    gender: "",
    correo_tutor: "",
    is_active: true,
    user: "",
  });

  //Crear un estado para el listado de usuarios
  const [users, setUsers] = useState([]);

  //Cargar usuarios con useEffect
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        //console.log("USERS:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    // Aquí podríamos cargar los datos del estudiante si estuviéramos editando uno existente
    const loadTutor = async () => {
      if (params.id_tutor) {
        //validar si es una creación o edición
        const response = await getTutor(params.id_tutor);
        setTutor(response.data); //Actualizar el estado con los datos del tutor a editar
      }
    };
    loadTutor(); //Llamar a la función para cargar los datos del tutor
  }, [params.id_tutor]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el envío tradicional

    // Validar campos vacíos
    if (!tutor.first_name || !tutor.last_name || !tutor.gender || !tutor.correo_tutor || !tutor.user) {
      notify.error("Todos los campos son obligatorios");
      return;
    }

    // Validar formato de correo
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(tutor.correo_tutor)) {
      notify.error("El correo electrónico no es válido");
      return;
    }

    // Si pasa las validaciones, decide si es edición o creación
    if (params.id_tutor) {
      await updateTutor(params.id_tutor, tutor);
      notify.success("Tutor actualizado correctamente");
    } else {
      await createTutor(tutor);
      notify.success("Tutor creado correctamente");
    }

    navigate("/"); // Redirigir al usuario
  };


  return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Tutor</h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            value={tutor.first_name}
            type="text"
            onChange={(e) =>
              setTutor({ ...tutor, first_name: e.target.value })
            }
            id="name"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">
            Last Name:
          </label>
          <input
            value={tutor.last_name}
            type="text"
            onChange={(e) =>
              setTutor({ ...tutor, last_name: e.target.value })
            }
            id="lastname"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="gender">
            Gender:
          </label>

          <select
            value={tutor.gender}
            onChange={(e) => setTutor({ ...tutor, gender: e.target.value })}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>

          <input
            value={tutor.correo_tutor}
            type="email"
            onChange={(e) =>
              setTutor({ ...tutor, correo_tutor: e.target.value })
            }
            id="email"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Usuario</label>
          <select
            value={tutor.user}
            onChange={(e) => setTutor ({ ...tutor, user: e.target.value })}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Seleccione un usuario
            </option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
          <input
            id="is_active"
            type="checkbox"
            checked={tutor.is_active} // Usamos checked en lugar de value
            onChange={(e) =>
              setTutor({ ...tutor, is_active: e.target.checked })
            }
            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
          />
          <label
            htmlFor="is_active"
            className="ml-3 text-sm font-bold text-gray-700 cursor-pointer"
          >
            ¿El tutor está activo?
          </label>
          <span
            className={`ml-auto text-xs font-bold px-2 py-1 rounded ${tutor.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {tutor.is_active ? "ACTIVO" : "INACTIVO"}
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
            onClick={() => navigate("/teachers")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
