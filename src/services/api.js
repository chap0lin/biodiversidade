import axios from 'axios'

const api = axios.create({
    baseURL: 'https://adega.domqueshot.com:4000/'
})

export default api;