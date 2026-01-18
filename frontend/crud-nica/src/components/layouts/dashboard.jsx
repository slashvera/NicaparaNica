import Header from "../Header.jsx";
import Sidebar from "../Sidebar.jsx";
import StudentList from "../StudentList.jsx";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    // "flex" pone al Sidebar y al Contenido lado a lado
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* LADO IZQUIERDO: Tu Sidebar */}
      <Sidebar />

      {/* LADO DERECHO: Header + Contenido */}
      {/* flex-1 le dice: "estírate y ocupa todo lo que sobre de ancho" */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Tu Header arriba */}
        <Header />

        {/* El área de contenido con scroll independiente */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet /> {/* Aquí se renderizan páginas */}
        </main>
      </div>
    </div>
  );
}
