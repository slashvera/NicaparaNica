import { PiUserLight, PiStudentLight } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { getUsers } from "../api/users";
import { getCursos } from "../api/cursos";
import { getStudents } from "../api/students";
import { getActivities } from "../api/activities";
import { useEffect, useState } from "react";
import GenderChart from "./GenderChart";

export default function Maincomponent() {
  const [users, setUsers] = useState(0);
  const [cursos, setCursos] = useState(0);
  const [students, setStudents] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(Array.isArray(res.data) ? res.data.length : 0))
      .catch(err => console.error("Error cargando usuarios:", err));

    getCursos()
      .then(res => setCursos(Array.isArray(res.data) ? res.data.length : 0))
      .catch(err => console.error("Error cargando cursos:", err));

    getStudents()
      .then(res => setStudents(Array.isArray(res.data) ? res.data.length : 0))
      .catch(err => console.error("Error cargando estudiantes:", err));

    getActivities()
      .then(res => {
        if (Array.isArray(res.data)) {
          setActivities(res.data);
        } else {
          setActivities([]);
        }
      })
      .catch(err => {
        console.error("Error cargando actividades:", err);
        setActivities([]);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico */}
        <div className="flex justify-center">
          <GenderChart />
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Usuarios */}
          <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white text-indigo-600">
                  <PiUserLight size={22} />
                </span>
                <h2 className="card-title">Usuarios</h2>
              </div>
              <p className="text-4xl font-bold mt-2">{users}</p>
              <p className="text-sm opacity-80">Registrados este mes</p>
            </div>
          </div>

          {/* Cursos */}
          <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white text-indigo-600">
                  <MdOutlineClass size={22} />
                </span>
                <h2 className="card-title">Cursos</h2>
              </div>
              <p className="text-4xl font-bold mt-2">{cursos}</p>
              <p className="text-sm opacity-80">Activos actualmente</p>
            </div>
          </div>

          {/* Reportes */}
          <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white text-indigo-600">
                  <TbReportSearch size={22} />
                </span>
                <h2 className="card-title">Reportes</h2>
              </div>
              <p className="text-4xl font-bold mt-2">12</p>
              <p className="text-sm opacity-80">Generados esta semana</p>
            </div>
          </div>

          {/* Estudiantes */}
          <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-full bg-white text-indigo-600">
                  <PiStudentLight size={22} />
                </span>
                <h2 className="card-title">Estudiantes</h2>
              </div>
              <p className="text-4xl font-bold mt-2">{students}</p>
              <p className="text-sm opacity-80">Inscritos actualmente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actividades recientes con mismo fondo */}
      <div className="card w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">📌 Actividades recientes</h2>
          <ul className="space-y-2">
            {Array.isArray(activities) && activities.length > 0 ? (
              activities.map((act, idx) => (
                <li key={idx} className="border-b border-white/30 pb-2">
                  <span className="font-semibold">{act.title}</span> — {act.description}
                  <div className="text-xs opacity-80">
                    {act.created_at ? new Date(act.created_at).toLocaleString() : ""}
                  </div>
                </li>
              ))
            ) : (
              <li>No hay actividades recientes</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}