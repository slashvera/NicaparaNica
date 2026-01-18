import axios from 'axios'

const userApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/register/"
})

export const getUser = () => userApi.get();