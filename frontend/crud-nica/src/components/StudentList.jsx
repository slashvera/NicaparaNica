import { getStudents } from "../api/students";
import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos 
import {useNavigate, useParams} from 'react-router';//Importar useNavigate para redirigir al usuario

export default function StudentList() {
    const navigate = useNavigate();


    //Haremos uso de los Hooks - usestate, useEffect
    const [students, setStudents] = useState([])//Se inicializa el estado como un arreglo vacío

    const loadStudents  = async () => {
        const response = await getStudents();
        setStudents(response.data);//Actualizamos el estado con los datos obtenidos de la API
    }

    //usaremos useEffect para llamar a la función loadStudents cuando el componente se monte
    useEffect(() => {
        loadStudents();
    }, []); 
    //El arreglo vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente
   

    //el retorno del componente mostrar la lista de estudiantes
    return(
        //mt =.. margin top, ml=.. margin left
        <div className="mt-8">
            <h1 className="text-2xl font-bold text-sky-700 ml-5">Listado de Estudiantes</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5 ml-5">
                { students.map((student) => (
                    <div key={student.id} className="bg-blue-300 shadow-md rounded-md p-4 mt-4">
                        <p className=" font-normal text-gray-800"><span className="font-bold">Nombre: </span>{student.first_name}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Apellido: </span>{student.last_name}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Correo: </span>{student.correo_std}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Ciudad: </span>{student.city_std}</p>
                        <div className="mt-3">
                            <button className="bg-green-700 text-white px-2 py-1 rounded-lg hover:bg-green-500"
                                onClick={() => navigate(`/edit-student/${student.id_std}`)}

                            >Editar</button>

                            <button className="bg-red-700 text-white px-2 py-1 rounded-lg ml-2 hover:bg-red-500"
                                onClick={() => navigate(`/delete-student/${student.id_std}`)}
                            >Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}