import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // Asegúrate que sea react-router-dom
import UserList from './components/UserList'
import TutorList from './components/TutorList'
import StudentList from './components/StudentList'
import TutorForm from './components/TutorForm'
import StudentForm from './components/StudentForm'
import UserForm from './components/UserForm'
import CursoList from './components/CursoList'
import MainLayout from './components/layouts/dashboard'
import Maincomponent from './components/Maincomponent'
import Notfound from './components/Notfound'
import { Toaster } from 'react-hot-toast'
import { PiUserList } from 'react-icons/pi'
import CursoForm from './components/CursoForm'


function App() {
  return (
    <BrowserRouter>
      <div className="App"> 
        <Toaster position="top-right"/>
        <Routes>
          {/* MainLayout es el contenedor principal */}
          <Route path='/' element={<MainLayout/>}>
            {/* Las rutas hijas NO deben llevar "/" al inicio del path */}

            <Route index element={<Maincomponent/>}/>

            <Route path="new-user" element={<UserForm/>}/>

            <Route path="new-student" element={<StudentForm/>}/>

            <Route path="new-tutor" element={<TutorForm/>}/>

            <Route path='new-course' element={<CursoForm/>}></Route>
            
            {/* Verifica que el parámetro (id_std) sea el mismo que usas en useParams en el formulario */}
            <Route path="edit-student/:id_std" element={<StudentForm/>}/>

            {/* Verifica que el parámetro (id_tutor) sea el mismo que usas en useParams en el formulario */}
            <Route path="edit-tutor/:id_tutor" element={<TutorForm/>}/>
            
            {/* Si en StudentList navegas a /edit-user/, aquí debe decir edit-user */}
            <Route path="edit-user/:id" element={<UserForm/>}/>

            <Route path='edit-course/:id_curso' element={<CursoForm/>}/>
            
            <Route path="students" element={<StudentList/>}/>

            <Route path="teachers" element={<TutorList/>}/>

            <Route path="users" element={<UserList/>}/>

            <Route path='courses' element={<CursoList/>}></Route>

            <Route path="*" element={<Notfound/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App