import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'API_KEY',
        language: 'es-MX'
    }
})

export default movieDB;