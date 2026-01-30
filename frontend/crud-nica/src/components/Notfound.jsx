import { Link } from "react-router";

export default function Notfound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 text-base-content">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Página no encontrada</p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-focus text-primary-content font-bold py-2 px-4 rounded duration-200"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}