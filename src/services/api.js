import axios from 'axios'

const api = axios.create({
    baseURL: 'http://189.6.57.68:3333'
})

export default api;