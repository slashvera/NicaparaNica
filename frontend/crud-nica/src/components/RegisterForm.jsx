import { useEffect } from "react";//Importar useEffect para manejar la obtención de datos
import { useState } from "react";//Importamos useState para manejar el estado del componente
import { useNavigate,useParams } from "react-router";//Importar useNavigate para redirigir al usuario

export default function RegisterForm(){

  return (
  <div className="bg-white text-black flex justify-center items-center min-h-screen">
    <form className="w-full max-w-md">

      <div>
        <label className="block text-sm font-bold mb-3 mt-3">
          UserName:
        </label>
        <input
          type="text"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 mt-3">
          Email:
        </label>
        <input
          type="email"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 mt-3">
          Password:
        </label>
        <input
          type="password"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label className="block text-sm font-bold mb-2 mt-3">
          Confirm Password:
        </label>
        <input
          type="password"
          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>

        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>

    </form>
  </div>
);

}