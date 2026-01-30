import { getStudents } from "../api/students";
import { useState } from "react"; //Importamos useState para manejar el estado del componente
import { useEffect } from "react"; //Importar useEffect para manejar la obtención de datos
import { useNavigate, useParams } from "react-router"; //Importar useNavigate para redirigir al usuario
import { Link } from "react-router-dom";

export default function MainReport() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div className="mt-8 container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-base-content">
          Lista de Notas
        </h1>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-300">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                No
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                Full Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-bold text-base-content uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {students.map((student, index) => (
              <tr
                key={student.id_std}
                className="hover:bg-base-200 transition-colors"
              >
                <td className="px-4 py-4 text-sm text-base-content">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm text-base-content font-medium">
                  ST-{student.id_std}
                </td>
                <td className="px-4 py-4 text-sm text-base-content">
                  {student.first_name} {student.last_name}
                </td>

                {/* Estado */}
                <td className="px-4 py-4 text-sm">
                  {student.is_active ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-success-content border border-success">
                      Activo
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-error text-error-content border border-error">
                      Inactivo
                    </span>
                  )}
                </td>

                {/* Acciones */}
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/see-table/${student.id_std}`)}
                      className="bg-primary hover:bg-primary-focus text-primary-content p-2 rounded shadow-sm transition"
                    >
                      {/* Icono de ojo */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 
                            8.268 2.943 9.542 7-1.274 4.057-5.065 
                            7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
