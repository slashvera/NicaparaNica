import axios from 'axios';

const tutorApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/tutors/"
})

export const getTutors = () => tutorApi.get();
export const getTutor = (id_tutor) => tutorApi.get(`${id_tutor}`);
export const createTutor = (tutor) => tutorApi.post('', tutor);
export const updateTutor = (id_tutor, tutor) => tutorApi.put(`/${id_tutor}/`, tutor); 
