import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router-dom"; //Importar useNavigate para redirigir al usuario
import { getCurso, Updatecurso, Createcurso } from "../api/cursos";
import { getTutors } from "../api/tutors";
import { useNotify } from "../hook/useNotify";

export default function CursoForm() {
  const notify = useNotify();
  const navigate = useNavigate();
  const params = useParams();

  const [curso, setCurso] = useState({
    codigo_curso: "",
    nombre_curso: "",
    year_curso: "",
    semestre_curso: "",
    creditos_curso: "",
    id_tutor: "",
  });

  const [tutors, setTutors] = useState([]);

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

  useEffect(() => {
    const loadCurso = async () => {
      if (params.id_curso) {
        const response = await getCurso(params.id_curso);
        setCurso(response.data);
      }
    };
    loadCurso();
  }, [params.id_curso]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanId = params.id_curso ? params.id_curso.toString().replace(":", "") : null;
    const { tutor_display, ...dataToSend } = curso;

    try {
      if (cleanId) {
        await Updatecurso(cleanId, dataToSend);
        notify.success("¡Curso actualizado con éxito!");
      } else {
        await Createcurso(dataToSend);
        notify.success("¡Curso creado correctamente!");
      }
      navigate("/courses");
    } catch (error) {
      const serverErrors = error.response?.data;
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
    <div className="bg-base-200 text-base-content flex justify-center items-center min-h-screen transition-colors duration-500">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-100 p-6 rounded-lg shadow-md">
        <div className="mb-6 text-2xl font-bold text-center">
          <h1>Formulario de Cursos</h1>
        </div>

        {/* Código */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="codigo">Course code:</label>
          <input
            value={curso.codigo_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, codigo_curso: e.target.value })}
            id="codigo"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="name">Course Name:</label>
          <input
            value={curso.nombre_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, nombre_curso: e.target.value })}
            id="name"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Año */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="year">Course Year:</label>
          <input
            value={curso.year_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, year_curso: e.target.value })}
            id="year"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Semestre */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="semester">Semester:</label>
          <input
            value={curso.semestre_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, semestre_curso: e.target.value })}
            id="semester"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Créditos */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="creditos">Credits Courses:</label>
          <input
            value={curso.creditos_curso}
            type="text"
            onChange={(e) => setCurso({ ...curso, creditos_curso: e.target.value })}
            id="creditos"
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Tutor */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Tutors</label>
          <select
            value={curso.id_tutor}
            onChange={(e) => setCurso({ ...curso, id_tutor: e.target.value })}
            className="w-full shadow border rounded py-2 px-3 bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="" disabled>Seleccione un tutor</option>
            {tutors.map((tutor) => (
              <option key={tutor.id_tutor} value={tutor.id_tutor}>
                {tutor.first_name}
              </option>
            ))}
          </select>
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
            onClick={() => navigate("/courses")}
            className="bg-error hover:bg-red-700 text-error-content font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-error duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
