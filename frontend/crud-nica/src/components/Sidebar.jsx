import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import logo from "../assets/logo-side.svg";

// Icons
import { MdMenuOpen, MdOutlineSettings, MdOutlineLogout, MdOutlineClass, MdOutlineAppRegistration } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { PiChalkboardTeacher, PiStudentBold, PiUserBold } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

const menuItems = [
  { icons: <IoHomeOutline size={22} />, label: "Home", path: "/" },
  { icons: <PiUserBold size={22} />, label: "Users", path: "/users" },
  { icons: <PiStudentBold size={22} />, label: "Students", path: "/students" },
  { icons: <PiChalkboardTeacher size={22} />, label: "Teachers", path: "/teachers" },
  { icons: <MdOutlineClass size={22} />, label: "Courses", path: "/courses" },
  { icons: <MdOutlineAppRegistration size={22} />, label: "Enrollment", path: "/enrollment" },
  { icons: <TbReportSearch size={22} />, label: "Reports", path: "/reports" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-primary text-primary-content hover:bg-primary-focus ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Logo y Botón de Toggle */}
    <div
        className={`px-3 py-2 h-20 flex items-center duration-300 ${
            open ? "justify-between" : "justify-center"
        }`}
        >
        {/* Logo con fondo fijo */}
        <img
        src={logo}
        alt="Logo"
        className={`duration-500 p-1 rounded-md bg-white ${open ? "w-10 opacity-100" : "w-0 opacity-0"}`}
        />

        {/* Botón de menú */}
        <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <MdMenuOpen
            size={34}
            className={`duration-500 ${!open && "rotate-180"}`}
            />
        </div>
    </div>

      {/* Menú Principal */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
            <li key={index} className="my-2">
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `hover-3d px-3 py-2 rounded-md duration-300 flex items-center relative group transition-colors
                    ${
                    isActive
                        ? "bg-primary-focus text-primary-content shadow-lg hover:bg-primary hover:text-primary-content"
                        : "hover:bg-primary-focus hover:text-primary-content"
                    }`
                }
                >
                {/* Ícono siempre visible */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {item.icons}
                </div>

                {/* Texto que se oculta cuando el sidebar está cerrado */}
                <p
                    className={`ml-2 ${
                    !open && "w-0 opacity-0"
                    } duration-500 overflow-hidden whitespace-nowrap`}
                >
                    {item.label}
                </p>

                {!open && (
                    <p className="absolute left-16 shadow-md rounded-md w-0 p-0 bg-base-100 text-base-content duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 z-50">
                    {item.label}
                    </p>
                )}
            </NavLink>
            </li>
        ))}
    </ul>

      {/* Footer del Sidebar */}
      <div className="border-t border-base-300 pt-4">
        {/* Settings */}
        <div className="hover-3d px-2 py-2 mb-2 hover:bg-primary-focus rounded-md flex items-center gap-2 cursor-pointer duration-300 transition-colors relative group">
            <MdOutlineSettings size={22} />
            <p
            className={`leading-5 ${
                !open && "w-0 opacity-0"
            } duration-500 overflow-hidden font-bold text-xs`}
            >
            Settings
            </p>

            {/* Tooltip cuando está cerrado */}
            {!open && (
            <p className="absolute left-16 shadow-md rounded-md w-0 p-0 bg-base-100 text-base-content duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 z-50">
                Settings
            </p>
            )}
        </div>

        {/* Logout */}
        <div className="hover-3d px-2 py-2 mb-4 hover:bg-error rounded-md flex items-center gap-2 cursor-pointer duration-300 transition-colors text-error-content relative group">
            <MdOutlineLogout size={22} />
            <p
            className={`leading-5 ${
                !open && "w-0 opacity-0"
            } duration-500 overflow-hidden font-bold text-xs`}
            >
            Logout
            </p>

            {/* Tooltip cuando está cerrado */}
            {!open && (
            <p className="absolute left-16 shadow-md rounded-md w-0 p-0 bg-base-100 text-base-content duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 z-50">
                Logout
            </p>
            )}
        </div>
      </div>
    </nav>
  );
}