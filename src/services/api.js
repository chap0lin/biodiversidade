import axios from 'axios'

const api = axios.create({
    baseURL: 'https://biodiversidade-server.herokuapp.com/'
})

export default api;