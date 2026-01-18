import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'
import Sidebar from './components/Sidebar'  
import NewComponent from './components/NewComponent'
import UserList from './components/UserList'
import MainLayout from './components/layouts/dashboard'
import Maincomponent from './components/Maincomponent'
import { Toaster } from 'react-hot-toast'
function App() {

  return(
    <BrowserRouter>
      <div className="App"> 
        <Toaster position="top-right"/>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<Maincomponent/>}/>
            <Route path='/new-student' element={<StudentForm/>}/>
            <Route path='/edit-student/:id_std' element={<StudentForm/>}/>
            <Route path='/edit-user/:id_user' element={<RegisterForm/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
