import axios, { CreateAxiosDefaults } from "axios";


const options: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
}
export default axios.create(options);