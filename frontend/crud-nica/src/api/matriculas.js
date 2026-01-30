import axios from "axios";

const matriculaApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/matriculas/",
});

export const getMatriculas = () => matriculaApi.get();
export const createMatricula = (matricula) => matriculaApi.post('', matricula);
