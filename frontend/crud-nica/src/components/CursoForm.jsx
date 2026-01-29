import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router-dom"; //Importar useNavigate para redirigir al usuario
import { getCurso, Updatecurso, Createcurso } from "../api/cursos";
import { getTutors } from "../api/tutors";
import { useNotify } from "../hook/useNotify";

export default function CursoForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams(); //Obtenemos los parámetros de la URL (aunque no se usan en este componente)

  const [curso, setCurso] = useState({
    codigo_curso: "",
    nombre_curso: "",
    year_curso: "",
    semestre_curso: "",
    creditos_curso: "",
    id_tutor: "",
  });

  //Crear un estado para el Listado de Tutores
  const [tutors, setTutors] = useState([]);

  //Cargar tutores con useEffect
  useEffect(() => {
    const loadTutors = async () => {
      try {
        const res = await getTutors();
        setTutors(res.data);
      } catch (error) {
        console.error("Error cargando tutores", error);
      }
    };
    loadTutors();
  }, []);

  //Cargar Cursos Para Edicion/Creacion
  useEffect(() => {
    // Aquí podríamos cargar los datos del estudiante si estuviéramos editando uno existente
    const loadCurso = async () => {
      if (params.id_curso) {
        //validar si es una creación o edición
        const response = await getCurso(params.id_curso);
        setCurso(response.data); //Actualizar el estado con los datos del estudiante a editar
      }
    };
    loadCurso(); //Llamar a la función para cargar los datos del estudiante
  }, [params.id_curso]);

  //Envio de Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Limpieza del ID por si trae los ":" de la URL
    const cleanId = params.id_curso
      ? params.id_curso.toString().replace(":", "")
      : null;

    // 2. Preparación de datos (Si el backend te envía campos de solo lectura como 'tutor_name',
    // extráelos aquí igual que hicimos con 'gender_display')
    const { tutor_display, ...dataToSend } = curso;

    try {
      if (cleanId) {
        // MODO EDICIÓN
        await Updatecurso(cleanId, dataToSend);
        notify.success("¡Curso actualizado con éxito!");
      } else {
        // MODO CREACIÓN
        await Createcurso(dataToSend);
        notify.success("¡Curso creado correctamente!");
      }

      // Redirigir a la lista de cursos
    } catch (error) {
      const serverErrors = error.response?.data;
      console.error("Error en Cursos:", serverErrors);

      // 3. Manejo de errores específicos usando tu hook de notificaciones
      if (serverErrors?.codigo_curso) {
        notify.error("El código del curso ya existe o no es válido.");
      } else if (serverErrors?.id_tutor) {
        notify.error("Hubo un problema con el tutor seleccionado.");
      } else if (serverErrors?.nombre_curso) {
        notify.warning("El nombre del curso es obligatorio.");
      } else {
        notify.error("No se pudo guardar el curso. Revisa los datos.");
      }
    }
  };

  return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Cursos</h1>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Course code:
          </label>
          <input
            value={curso.codigo_curso}
            type="text"
            onChange={(e) =>
              setCurso({ ...curso, codigo_curso: e.target.value })
            }
            id="codigo"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">
            Course Name:
          </label>
          <input
            value={curso.nombre_curso}
            type="text"
            onChange={(e) =>
              setCurso({ ...curso, nombre_curso: e.target.value })
            }
            id="name"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="year">
            Course Year:
          </label>
          <input
            value={curso.year_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, year_curso: e.target.value })}
            id="year"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="semester">
            Semester:
          </label>
          <input
            value={curso.semestre_curso}
            type="text"
            onChange={(e) =>
              setCurso({ ...curso, semestre_curso: e.target.value })
            }
            id="semester"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="creditos">
            Credits Courses:
          </label>
          <input
            value={curso.creditos_curso}
            type="text"
            onChange={(e) =>
              setCurso({ ...curso, creditos_curso: e.target.value })
            }
            id="creditos"
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Tutors</label>
          <select
            value={curso.tutors}
            onChange={(e) => setCurso({ ...curso, tutor: e.target.value })}
            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Seleccione un tutor
            </option>

            {tutors.map((tutor) => (
              <option key={tutor.id_tutor} value={tutor.id_tutor}>
                {tutor.first_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            onClick={() => navigate("/courses")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={() => navigate("/courses")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
