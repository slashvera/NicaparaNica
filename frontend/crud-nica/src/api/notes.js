import axios, { Axios } from 'axios';

const notasApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/nota/"
})

export const getNotas = () => notasApi.get();
export const getNota  = (id_nota) => notasApi.get(`${id_nota}`);
export const UpdateNota = (id_nota, nota) => notasApi.put(`/${id_nota}/`, nota);