import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
// const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'https://luis-movieflix.herokuapp.com';

export const Api = axios.create({
    baseURL: BASE_URL
});