import {Link} from "react-router-dom";
import { useNavigate,useParams } from "react-router";//Importar useNavigate para redirigir al usuario
import React, {useState} from 'react';//Importamos useState para manejar el estado del componente
import logo from '../assets/logo-side.svg';

//Icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { PiStudentLight } from "react-icons/pi";
import { PiChalkboardTeacher } from "react-icons/pi";
import { MdOutlineClass } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";

const menuItems = [
{
    icons:<IoHomeOutline size={22} />,
    label:'Home',
},
{
    icons:<PiStudentLight size={22} />,
    label:'Students',
},
{
    icons:<PiChalkboardTeacher size={22} />,
    label:'Teachers',
},
{
    icons:<MdOutlineClass size={22} />,
    label:'Classes',
},
{
    icons:<TbReportSearch size={22} />,
    label:'Reports',
},


];

export default function Sidebar() { 

    const [open, setOpen] = useState(true);//Estado para manejar si la barra lateral está abierta o cerrada

    return(
        /*========== Header ============*/ 
        <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-16'}`}>
            <div className=" px-3 py-2 h-20 flex justify-between items-center">
                <img src={logo} alt="Logo" className={`${open ? 'w-10' : 'w-0'}  bg-white rounded-md`} />
                <div><MdMenuOpen size={34} className={` duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} /></div>
            </div>


            <ul className="flex-1">
                {
                    menuItems.map((item,index) => {
                        return(

                            <li key={index} className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                                <div>{item.icons}</div>
                                <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                                <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md
                                w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                                `}>{item.label}</p>
                             </li>
                        )
                    }) 
                }
            </ul>

            <div className="px-2 py-2 mb-4 hover:bg-blue-500 rounded-md hover:text-white flex items-center gap-2 cursor-pointer duration-300 ">
                <MdOutlineSettings size={22} />
                <p className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden font-bold text-xs`}>Settings</p>
            </div>
            <div className="px-2 py-2 mb-4 hover:bg-blue-500 rounded-md hover:text-white flex items-center gap-2 cursor-pointer duration-300">
                <MdOutlineLogout size={22}/>
                <p className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden font-bold text-xs`}>Logout</p>
            </div>

        </nav>
    );
}