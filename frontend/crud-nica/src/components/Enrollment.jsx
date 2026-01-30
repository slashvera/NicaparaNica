import { useState, useEffect } from "react";
import { getMatriculas, createMatricula } from "../api/matriculas";

export default function Registration() {
  const [matriculas, setMatriculas] = useState([]);
  const [formData, setFormData] = useState({
    id_std: "",
    id_curso: "",
    semestre: "",
    estado: "ACTIVA",
  });

  const loadMatriculas = async () => {
    const response = await getMatriculas();
    setMatriculas(response.data);
  };

  useEffect(() => {
    loadMatriculas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMatricula(formData);
    loadMatriculas();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-base-content">
        Gestión de Matriculación
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 shadow-md rounded p-4 mb-6 border border-base-300"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ID Estudiante"
            value={formData.id_std}
            onChange={(e) => setFormData({ ...formData, id_std: e.target.value })}
            className="border border-base-300 p-2 rounded bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="ID Curso"
            value={formData.id_curso}
            onChange={(e) => setFormData({ ...formData, id_curso: e.target.value })}
            className="border border-base-300 p-2 rounded bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="number"
            placeholder="Semestre"
            value={formData.semestre}
            onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
            className="border border-base-300 p-2 rounded bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="border border-base-300 p-2 rounded bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ACTIVA">ACTIVA</option>
            <option value="INACTIVA">INACTIVA</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-primary hover:bg-primary-focus text-primary-content px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          Registrar Matrícula
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-300">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="px-4 py-2 text-base-content">ID Matrícula</th>
              <th className="px-4 py-2 text-base-content">Estudiante</th>
              <th className="px-4 py-2 text-base-content">Curso</th>
              <th className="px-4 py-2 text-base-content">Semestre</th>
              <th className="px-4 py-2 text-base-content">Estado</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((m) => (
              <tr key={m.id_matricula} className="hover:bg-base-200 transition-colors">
                <td className="px-4 py-2 text-base-content">{m.id_matricula}</td>
                <td className="px-4 py-2 text-base-content">
                  {m.estudiante_nombre} {m.estudiante_apellido}
                </td>
                <td className="px-4 py-2 text-base-content">{m.nombre_curso}</td>
                <td className="px-4 py-2 text-base-content">{m.semestre}</td>
                <td className="px-4 py-2">
                  {m.estado === "ACTIVA" ? (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success text-success-content border border-success">
                      Activa
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-error text-error-content border border-error">
                      Inactiva
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}