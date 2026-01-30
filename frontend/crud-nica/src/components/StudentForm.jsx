import { use, useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { createStudent, getStudent, updateStudent } from "../api/students"; //Importar la función para crear un nuevo estudiante
import { getUsers } from "../api/users";//Importamos APi de usuarios
import { useNotify } from "../hook/useNotify";

export default function StudentForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams();

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    correo_std: "",
    fecha_nac: "",
    city_std: "",
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
    const loadStudent = async () => {
      if (params.id_std) {
        const response = await getStudent(params.id_std);
        setStudent(response.data);
      }
    };
    loadStudent();
  }, [params.id_std]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { gender_display, id_std, ...dataToSend } = student;

    try {
      const cleanId = params.id_std ? params.id_std.toString().replace(":", "") : null;
      if (cleanId) {
        await updateStudent(cleanId, dataToSend);
        notify.success("Succesfully Updated Student...");
      } else {
        await createStudent(student);
        notify.success("Succesfully Created Student...");
      }
    } catch (error) {
      const serverErrors = error.response?.data;
      if (serverErrors?.user) {
        notify.error("This user has an assigned student.");
      } else if (serverErrors?.gender) {
        notify.warning("Please choose a valid gender!");
      } else {
        notify.error("Oops... An unexpected error happened!");
      }
    }
  };

  return (
    <div className="bg-base-200 text-base-content flex justify-center items-center min-h-screen transition-colors duration-500">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Estudiante</h1>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input
            value={student.first_name}
            type="text"
            onChange={(e) => setStudent({ ...student, first_name: e.target.value })}
            id="name"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">Last Name:</label>
          <input
            value={student.last_name}
            type="text"
            onChange={(e) => setStudent({ ...student, last_name: e.target.value })}
            id="lastname"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="gender">Gender:</label>
          <select
            value={student.gender}
            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
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
            value={student.correo_std}
            type="email"
            onChange={(e) => setStudent({ ...student, correo_std: e.target.value })}
            id="email"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Birthdate */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="Birthdate">Birthdate:</label>
          <input
            value={student.fecha_nac}
            type="date"
            onChange={(e) => setStudent({ ...student, fecha_nac: e.target.value })}
            id="Birthdate"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="city">City:</label>
          <select
            value={student.city_std}
            onChange={(e) => setStudent({ ...student, city_std: e.target.value })}
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Managua">Managua</option>
            <option value="Masaya">Masaya</option>
          </select>
        </div>

        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Usuario</label>
          <select
            value={student.user}
            onChange={(e) => setStudent({ ...student, user: e.target.value })}
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
            checked={student.is_active}
            onChange={(e) => setStudent({ ...student, is_active: e.target.checked })}
            className="w-5 h-5 text-primary bg-base-100 border-base-300 rounded focus:ring-primary cursor-pointer"
          />
          <label htmlFor="is_active" className="ml-3 text-sm font-bold cursor-pointer">
            ¿El estudiante está activo?
          </label>
          <span
            className={`ml-auto text-xs font-bold px-2 py-1 rounded ${
              student.is_active ? "bg-success text-success-content" : "bg-error text-error-content"
            }`}
          >
            {student.is_active ? "ACTIVO" : "INACTIVO"}
          </span>
        </div>

        {/* Botones */}
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            onClick={() => navigate("/students")}
            className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary duration-200 cursor-pointer"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() => navigate("/students")}
            className="bg-error hover:bg-red-700 text-error-content font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-error duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
