import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import StudentForm from '../components/StudentForm';

export default function CreateStudentWizard() {

    const [step, setStep] = useState(1);
    const [userId, setUserId] = useState(null);

    //Esta funcion se le da al Registerform
    const handleUserCreated = (id) => {
        setUserId(id);
        setStep(2);//Aqui pasamos al siguinte Formulario
    }
  return(
    <div className='p-6'>
        <div className='flex justify-center mb-8'>
            <div className={`h-2 w-24 rounded ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-2 w-24 rounded ml-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>

        {step === 1 ? (
            <RegisterForm onFinish={handleUserCreated} />
        ) : (
            <StudentForm userId={userId} />
        )}


    </div>
  )
}