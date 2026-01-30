import { PiUserLight, PiStudentLight } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { getUsers } from "../api/users";
import { getCursos } from "../api/cursos";
import { getStudents } from "../api/students"
import { useEffect, useState } from "react";


export default function Maincomponent() {
  {/*Aqui se solicita la cantidad de usuarios ingresados*/}
  const [users, setUsers] = useState(0);

  useEffect(() => {
    getUsers()
      .then(res => {
        setUsers(res.data.length);
      })
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);

  {/*Aqui se solicita la cantidad de cursos disponibles*/}
  const [cursos, setCursos] = useState(0);

  useEffect(() => {
    getCursos()
      .then(res => {
        setCursos(res.data.length);
      })
      .catch(err => console.error("Error cargando cursos:", err));
  }, []);

  {/*Aqui se solicita la cantidad de estudiantes registrados*/}

  const [students, setStudents] = useState(0);

  useEffect(() => {
    getStudents()
      .then(res => {
        setStudents(res.data.length);
      })
      .catch(err => console.error("Error cargando estudiantes:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
      {/* Usuarios */}
      <div className="card w-full max-w-xs bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:scale-105 transition-transform duration-300">
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
      <div className="card w-full max-w-xs bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:scale-105 transition-transform duration-300">
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
      <div className="card w-full max-w-xs bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:scale-105 transition-transform duration-300">
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

      <div className="card w-full max-w-xs bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:scale-105 transition-transform duration-300">
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
  );
}