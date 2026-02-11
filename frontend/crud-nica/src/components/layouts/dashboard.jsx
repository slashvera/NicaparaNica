import Header from "../Header.jsx";
import Sidebar from "../Sidebar.jsx";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-base-200 overflow-hidden transition-colors duration-500">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 transition-colors duration-500">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
