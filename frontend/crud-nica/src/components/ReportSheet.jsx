import { getNotas } from "../api/notes";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function ReportSheet() {
  const { id_std } = useParams();
  const [notas, setNotas] = useState([]);

  const loadNotas = async () => {
    const response = await getNotas();
    const notasFiltradas = response.data.filter(
      (nota) => nota.id_matricula.id_std === parseInt(id_std)
    );
    setNotas(notasFiltradas);
  };

  useEffect(() => {
    loadNotas();
  }, [id_std]);

  return (
    <div className="mt-8 container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-base-content mb-6">
        Notas del Estudiante ST-{id_std}
      </h1>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg border border-base-300">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-base-200 border-b border-base-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">#</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">Parcial 1</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">Parcial 2</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-base-content uppercase">Examen Final</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {notas.map((nota, index) => (
              <tr key={nota.id_nota} className="hover:bg-base-200 transition-colors">
                <td className="px-4 py-4 text-sm text-base-content">{index + 1}</td>
                <td className="px-4 py-4 text-sm text-base-content">{nota.parcial_1}</td>
                <td className="px-4 py-4 text-sm text-base-content">{nota.parcial_2}</td>
                <td className="px-4 py-4 text-sm text-base-content">{nota.examen_final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}