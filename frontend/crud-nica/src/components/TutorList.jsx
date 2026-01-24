import { getTutors } from "../api/tutors";
import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos 
import {useNavigate, useParams} from 'react-router';//Importar useNavigate para redirigir al usuario
import { Link } from 'react-router-dom';

export default function TutorList() {
    const navigate = useNavigate();


    //Haremos uso de los Hooks - usestate, useEffect
    const [tutors, setTutors] = useState([])//Se inicializa el estado como un arreglo vacío

    const loadTutors  = async () => {
        const response = await getTutors();
        setTutors(response.data);//Actualizamos el estado con los datos obtenidos de la API
    }

    //usaremos useEffect para llamar a la función loadStudents cuando el componente se monte
    useEffect(() => {
        loadTutors();
    }, []); 
    //El arreglo vacío como segundo argumento asegura que el efecto se ejecute solo una vez al montar el componente
   

    //el retorno del componente mostrar la lista de estudiantes
    return(
        //mt =.. margin top, ml=.. margin left
        <div className="mt-8">

            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-700 ml-5">Listado de Docentes</h1>
                <Link to="/new-tutor" className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded duration-300">
                            Add New Tutor
                </Link> 
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5 ml-5">
                { tutors.map((tutor) => (
                    <div key={tutor.id_tutor} className="bg-blue-300 shadow-md rounded-md p-4 mt-4">
                        <p className="font-normal  text-gray-800"><span className="font-bold">ID: </span>{tutor.id_tutor}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Nombre: </span>{tutor.first_name}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Apellido: </span>{tutor.last_name}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Correo: </span>{tutor.correo_tutor}</p>
                        <p className="font-normal text-gray-800"><span className="font-bold">Genero: </span>{tutor.gender_display}</p>
                        <p className="font-normal text-gray-800">
                            <span className="font-bold">Status: </span>
                             {tutor.is_active ? 'Active' : 'Inactive'}
                        </p>
                        <div className="mt-3">
                            <button className="bg-green-700 text-white px-2 py-1 rounded-lg hover:bg-green-500"
                                onClick={() => navigate(`/edit-tutor/${tutor.id_tutor}`)}

                            >Editar</button>

                            <button className="bg-red-700 text-white px-2 py-1 rounded-lg ml-2 hover:bg-red-500"
                                onClick={() => navigate(`/delete-tutor/${tutor.id_tutor}`)}
                            >Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}