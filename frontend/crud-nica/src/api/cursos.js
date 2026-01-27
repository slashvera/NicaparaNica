import axios, { Axios } from 'axios';

const cursosApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/cursos/"
})

export const getCursos = () => cursosApi.get();
export const getCurso  = (id_curso) => cursosApi.get(`${id_curso}`);
export const Createcurso = (curso) => cursosApi.post('', curso);
export const Updatecurso = (id_curso, curso) => cursosApi.put(`/${id_curso}/`, curso);