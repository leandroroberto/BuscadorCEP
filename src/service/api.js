import axios from 'axios'


//  /04844310/json

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

export default api