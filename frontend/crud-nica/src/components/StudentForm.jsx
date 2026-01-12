import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos 
import { useNavigate, useParams } from "react-router";//Importar useNavigate para redirigir al usuario
import { createStudent,getStudent,updateStudent } from "../api/students";//Importar la función para crear un nuevo estudiante

export default function StudentForm() {

    const [student, setStudent] = useState({
        first_name: '',
        last_name: '',
        correo_std: '',
        fecha_nac: '',
        city_std: ''
    });

    const navigate = useNavigate();
    const params = useParams();//Obtenemos los parámetros de la URL (aunque no se usan en este componente) 

    useEffect(() => {
        // Aquí podríamos cargar los datos del estudiante si estuviéramos editando uno existente
        const loadStudent = async () => {
            if (params.id_std) {//validar si es una creación o edición
                const response = await getStudent(params.id_std);
                setStudent(response.data);//Actualizar el estado con los datos del estudiante a editar  
            }
        }
        loadStudent();//Llamar a la función para cargar los datos del estudiante
    }, [params.id_std]); 


    const handleSubmit = async (e) => { //funcion para manejar el envio del formulario
        e.preventDefault();//No envia el formulario de forma tradicional
        if (params.id_std) {
            //Seria una edicion de estudiante existente
            await updateStudent(params.id_std, student);//Llamar a la funcion updateStudent para actualizar el estudiante
        }else{
            //Seria la creacion de un nuevo estudiante
            await createStudent(student);//Llamar a la funcion createStudent para crear un nuevo estudiante
        }
        navigate('/');//Redirigir al usuario a la pagina principal
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        value={student.first_name}
                        type="text"
                        onChange={(e) => setStudent({ ...student, first_name: e.target.value })}//capturar el valor del input
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                        Last Name:
                    </label>
                    <input
                        value={student.last_name}
                        type="text"
                        onChange={(e) => setStudent({ ...student, last_name: e.target.value })}//capturar el valor del input
                        id="lastname"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        value={student.correo_std}
                        type="email"
                        onChange={(e) => setStudent({ ...student, correo_std: e.target.value })}//capturar el valor del input
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Birthdate">
                        Birthdate:
                    </label>
                    <input
                        value={student.fecha_nac}
                        type="date"
                        onChange={(e) => setStudent({ ...student, fecha_nac: e.target.value })}//capturar el valor del input
                        id="Birthdate"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                        City:
                    </label>
                    <input
                        value={student.city_std}
                        type="text"
                        onChange={(e) => setStudent({ ...student, city_std: e.target.value })}//capturar el valor del input
                        id="city"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >   
                        Submit
                    </button>

                    <button type="reset" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}