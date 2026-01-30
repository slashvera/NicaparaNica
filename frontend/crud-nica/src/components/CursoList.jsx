import { getCursos } from "../api/cursos";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function CursoList() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);

  const loadCursos = async () => {
    const response = await getCursos();
    setCursos(response.data);
  };

  useEffect(() => {
    loadCursos();
  }, []);

  return (
    <div className="mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-base-content ml-5">
          Available Courses List
        </h1>
        <Link
          to="/new-course"
          className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-4 mr-5 rounded duration-300"
        >
          Add New Course +
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5 ml-5">
        {cursos.map((curso) => (
          <div
            key={curso.id_curso}
            className="bg-primary/20 shadow-md rounded-md p-4 mt-4 border border-primary/40"
          >
            <p className="font-normal text-base-content">
              <span className="font-bold">ID: </span>
              {curso.id_curso}
            </p>
            <p className="font-normal text-base-content">
              <span className="font-bold">Course Code: </span>
              {curso.codigo_curso}
            </p>
            <p className="font-normal text-base-content">
              <span className="font-bold">Course Name: </span>
              {curso.nombre_curso}
            </p>
            <p className="font-normal text-base-content">
              <span className="font-bold">Course Year: </span>
              {curso.year_curso}
            </p>
            <p className="font-normal text-base-content">
              <span className="font-bold">Semester: </span>
              {curso.semestre_curso}
            </p>
            <div className="mt-3">
              <button
                className="bg-primary hover:bg-primary-focus text-primary-content px-2 py-1 rounded-lg transition"
                onClick={() => navigate(`/edit-course/${curso.id_curso}`)}
              >
                Editar
              </button>

              <button
                className="bg-error hover:bg-red-700 text-error-content px-2 py-1 rounded-lg ml-2 transition"
                onClick={() => navigate(`/delete-course/${curso.id_curso}`)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
