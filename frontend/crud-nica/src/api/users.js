import axios from 'axios'

const userApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/register/"
})

export const getUsers = () => userApi.get();
export const getUser = (id) => userApi.get(`${id}`);
export const createUser = (user) => userApi.post('', user);
export const updateUser = (id, user) => userApi.put(`/${id}/`, user);
