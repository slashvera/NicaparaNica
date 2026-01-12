import axios from 'axios';

const studentApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/students/"
})

export const getStudents = () => studentApi.get();
export const getStudent = (id_std) => studentApi.get(`${id_std}`);
export const createStudent = (student) => studentApi.post('', student);
export const updateStudent = (id_std, student) => studentApi.put(`/${id_std}/`, student); 
export const deleteStudent = (id_std) => studentApi.delete(`/${id_std}/`);