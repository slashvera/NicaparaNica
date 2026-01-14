import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'

function App() {

  return(
    <BrowserRouter>
      <div className='container mx-auto'>

        <Header />

        <Routes>
          <Route path='/' element={<RegisterForm/>}/>
          <Route path='/new-student' element={<StudentForm/>}/>
          <Route path='/edit-student/:id_std' element={<StudentForm/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
