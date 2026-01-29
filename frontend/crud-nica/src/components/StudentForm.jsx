import { use, useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { createStudent, getStudent, updateStudent } from "../api/students"; //Importar la función para crear un nuevo estudiante
import { getUsers } from "../api/users";//Importamos APi de usuarios
import { useNotify } from "../hook/useNotify";

export default function StudentForm() {

  const notify  = useNotify();
  const navigate = useNavigate();
  const params = useParams(); //Obtenemos los parámetros de la URL (aunque no se usan en este componente)

  const [student, setStudent] = useState({
    //variable
    first_name: "",
    last_name: "",
    gender: "",
    correo_std: "",
    fecha_nac: "",
    city_std: "",
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
    const loadStudent = async () => {
      if (params.id_std) {
        //validar si es una creación o edición
        const response = await getStudent(params.id_std);
        setStudent(response.data); //Actualizar el estado con los datos del estudiante a editar
      }
    };
    loadStudent(); //Llamar a la función para cargar los datos del estudiante
  }, [params.id_std]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // IMPORTANTE: Extraemos solo los campos que el backend permite EDITAR.
    // Sacamos gender_display e id_std porque el servidor dará Error 400 si se los envías.
    const { gender_display, id_std, ...dataToSend } = student;

    try {

      // 1. Limpiamos el ID de posibles ":" que vengan de la URL
      const cleanId = params.id_std ? params.id_std.toString().replace(":", "") : null;
      if (cleanId) {
        // Modo Edición
        console.log("Enviando actualización para ID:", cleanId, dataToSend);
        await updateStudent(cleanId, dataToSend);
        notify.success("Succesfully Updated Student...")
      } else {
        // Modo Creación
        await createStudent(student);
        notify.success("Succesfully Created Student...");
      }
      //navigate("/"); 
    } catch (error) {
      const serverErrors = error.response?.data;

        // Manejo de los errores 
        if (serverErrors?.user) {
            notify.error("This user have assigned a student.");
        } else if (serverErrors?.gender) {
            notify.warning("Please choose a valid gender!.");
        } else {
            notify.error("opps.... An Unexpected Error happened!");
        }
    }

  };

  return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Estudiante</h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            value={student.first_name}
            type="text"
            onChange={(e) =>
              setStudent({ ...student, first_name: e.target.value })
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
            value={student.last_name}
            type="text"
            onChange={(e) =>
              setStudent({ ...student, last_name: e.target.value })
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
            value={student.gender}
            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
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
            value={student.correo_std}
            type="email"
            onChange={(e) =>
              setStudent({ ...student, correo_std: e.target.value })
            }
            id="email"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="Birthdate">
            Birthdate:
          </label>
          <input
            value={student.fecha_nac}
            type="date"
            onChange={(e) =>
              setStudent({ ...student, fecha_nac: e.target.value })
            }
            id="Birthdate"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="city">
            City:
          </label>
          <select
            value={student.city_std}
            onChange={(e) =>
              setStudent({ ...student, city_std: e.target.value })
            }
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="Managua">Managua</option>
            <option value="Masaya">Masaya</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Usuario</label>
          <select
            value={student.user}
            onChange={(e) => setStudent({ ...student, user: e.target.value })}
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
            checked={student.is_active} // Usamos checked en lugar de value
            onChange={(e) =>
              setStudent({ ...student, is_active: e.target.checked })
            }
            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
          />
          <label
            htmlFor="is_active"
            className="ml-3 text-sm font-bold text-gray-700 cursor-pointer"
          >
            ¿El estudiante está activo?
          </label>
          <span
            className={`ml-auto text-xs font-bold px-2 py-1 rounded ${student.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {student.is_active ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            onClick={() => navigate("/students")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() => navigate("/students")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
