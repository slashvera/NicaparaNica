import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos
import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useNavigate,useParams } from "react-router";//Importar useNavigate para redirigir al usuario
import { createUser } from "../api/users";//Importar la función para crear un usuario
import {useNotify} from "../hook/useNotify";//Importar el hook personalizado para notificaciones



export default function RegisterForm(){

  const {success, error} = useNotify(); // Desestructurar las funciones de notificación desde el hook personalizado
  const [userdata, setUserdata] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  //Funcion para manejar cambios en los campos del formulario
  const handleChange = (e) =>{
    setUserdata({
      ...userdata,
      [e.target.name]: e.target.value
    }); 
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    //Validacion Basica
    if(userdata.password !== userdata.confirmPassword){
      error('Passwords do not match');
      return;
    }
    try {
      //Enviamos solo username y password al backend
      const response = await createUser({
        username: userdata.username,
        password: userdata.password
      });

      success('User registered successfully');
      //Si onFinish existe, (Viene del componente padre), le pasamos el ID del usuario creado
      if(onFinish){
        onFinish(response.data.id);
      } 
    } catch (err) {
      error('Error registering user');
    }

  };

  return (
        <div className="bg-white text-black flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md border p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Paso 1: Cuenta de Usuario</h2>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username:</label>
                    <input
                        name="username"
                        type="text"
                        required
                        value={userdata.username}
                        onChange={handleChange}
                        className="w-full shadow-sm border rounded py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Ej: jerez_2024"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password:</label>
                    <input
                        name="password"
                        type="password"
                        required
                        value={userdata.password}
                        onChange={handleChange}
                        className="w-full shadow-sm border rounded py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Confirm Password:</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={userdata.confirmPassword}
                        onChange={handleChange}
                        className="w-full shadow-sm border rounded py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Siguiente: Datos Personales
                    </button>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-red-500 text-sm font-semibold"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
  );
}