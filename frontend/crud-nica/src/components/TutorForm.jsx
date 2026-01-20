import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos 
import { useNavigate, useParams } from "react-router";//Importar useNavigate para redirigir al usuario
import { createTutor,getTutor,updateTutor } from "../api/tutors";//Importar la función para crear un nuevo docente


export default function TutorsForm() {

    const [tutor, setTutor] = useState({
        first_name: '',
        last_name: '',
        gender:'',
        email:'',
        status:''
    });

    const navigate = useNavigate();
    const params = useParams();//Obtenemos los parámetros de la URL (aunque no se usan en este componente)

    useEffect(() => {
        // Aquí podríamos cargar los datos del docente si estuviéramos editando uno existente
        const loadTutor = async () => {
            if (params.id_tutor) {//validar si es una creación o edición
                const response = await getTutor(params.id_tutor);
                setTutor(response.data);//Actualizar el estado con los datos del docente a editar  
            }
        }
        loadTutor();//Llamar a la función para cargar los datos del docente
    }, [params.id_tutor]); 


    const handleSubmit = async (e) => { //funcion para manejar el envio del formulario
        e.preventDefault();//No envia el formulario de forma tradicional
        if (params.id_tutor) {
            //Seria una edicion de docente existente
            await updateTutor(params.id_tutor, tutor);//Llamar a la funcion updateTutor para actualizar al docente
        }else{
            //Seria la creacion de un nuevo docente
            await createTutor(tutor);//Llamar a la funcion createTutor para crear un nuevo estudiante
        }
        navigate('/');//Redirigir al usuario a la pagina principal
    }

    return (
    <div className="bg-white text-black flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">

            <div className="mb-6 text-2xl font-bold text-center">
                <h1>Formulario de Docente</h1>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name:
                </label>
                <input
                value={tutor.first_name}
                type="text"
                onChange={(e) =>
                    setTutor({ ...tutor, first_name: e.target.value })
                }
                id="name"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="lastname">
                Last Name:
                </label>
                <input
                value={tutor.last_name}
                type="text"
                onChange={(e) =>
                    setTutor({ ...tutor, last_name: e.target.value })
                }
                id="lastname"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
            </div>


            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="gender">
                Gender:
                </label>

                <select
                value={tutor.gender}
                onChange={(e) =>
                    setTutor({ ...tutor, gender: e.target.value })
                }
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email:
                </label>
                <input
                value={tutor.email}
                type="email"
                onChange={(e) =>
                    setTutor({ ...tutor, email: e.target.value })
                }
                id="email"
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Status:</label>
            
                <div className="flex space-x-6">
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="activo"
                            name="status" 
                            value="activo"
                            checked={tutor.status === "activo"}
                            onChange={() => setTutor({ ...tutor, status: "activo" })}
                            className="mr-2"
                        />
                        <label htmlFor="activo" className="text-gray-700">Activo</label>
                        </div>

                        <div className="flex items-center">
                        <input
                            type="radio"
                            id="inactivo"
                            name="status"  
                            value="inactivo"
                            checked={tutor.status === "inactivo"}
                            onChange={() => setTutor({ ...tutor, status: "inactivo" })}
                            className="mr-2"
                        />
                        <label htmlFor="inactivo" className="text-gray-700">Inactivo</label>
                        </div>
                    </div>
                </div>

            
                <div className="mt-4 flex gap-2">
                    <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
                    >
                    Submit
                    </button>

                    <button
                    type="reset"
                    onClick={() => navigate('/teachers')}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline duration-200 cursor-pointer"
                    >
                    Cancel
                    </button>
                </div>

        </form>
    </div>
    );
    
}