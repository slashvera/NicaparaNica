import { getStudents } from "../api/students";
import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos 
import {useNavigate, useParams} from 'react-router';//Importar useNavigate para redirigir al usuario
import { getUser } from "../api/users";

export default function UserList() {

    const navigate = useNavigate();//Crear una instancia de useNavigate para redirigir al usuario

    //Haremos uso de los hooks - usestate, useEffect
    const [users, setUsers] = useState([]);//Se inicializa el estado como un arreglo vacío

    const loadUsers  = async () => {
        const response = await getUser();
        setUsers(response.data);//Actualizamos el estado con los datos obtenidos de la API
    }

    useEffect(() => {
        loadUsers();
    }, []);


    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold text-sky-700 ml-5">Listado de Usuarios</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5 ml-5">
                { users.map((user) => (
                    <div key={user.id} className="bg-blue-300 shadow-md rounded-md p-4 mt-4">
                        <p className="font-normal  text-gray-800"><span className="font-bold">ID: </span>{user.id}</p>
                        <p className=" font-normal text-gray-800"><span className="font-bold">Username: </span>{user.username}</p>
                        <p className="font-normal text-gray-800">
                            <span className="font-bold">Email: </span>
                                {user.email ? user.email : 'N/A'}
                        </p>
                        <p className="font-normal text-gray-800">
                            <span className="font-bold">Status: </span>
                             {user.is_active ? 'Active' : 'Inactive'}
                        </p>
                        <div className="mt-3">
                            <button className="bg-green-700 text-white px-2 py-1 rounded-lg hover:bg-green-500"
                                onClick={() => navigate(`/edit-user/${user.id}`)}
                            >Editar</button>

                            <button className="bg-red-700 text-white px-2 py-1 rounded-lg ml-2 hover:bg-red-500"
                                onClick={() => navigate(`/delete-student/${user.id}`)}
                            >Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}