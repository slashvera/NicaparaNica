import axios from 'axios';

const studentApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/students/"
})

export const getStudents = () => studentApi.get('/');