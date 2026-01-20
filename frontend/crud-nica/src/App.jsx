import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom' // Asegúrate que sea react-router-dom
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import RegisterForm from './components/RegisterForm'
import MainLayout from './components/layouts/dashboard'
import Maincomponent from './components/Maincomponent'
import Notfound from './components/Notfound'
import CreateStudentWizard from './pages/CreateStudentWizard'
import { Toaster } from 'react-hot-toast'

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
            <Route path="new-student" element={<StudentForm/>}/>
            
            {/* Verifica que el parámetro (id_std) sea el mismo que usas en useParams en el formulario */}
            <Route path="edit-student/:id_std" element={<StudentForm/>}/>
            
            {/* Si en StudentList navegas a /edit-user/, aquí debe decir edit-user */}
            <Route path="edit-user/:id_user" element={<RegisterForm/>}/>
            
            <Route path="students" element={<StudentList/>}/>

            <Route path="*" element={<Notfound/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App