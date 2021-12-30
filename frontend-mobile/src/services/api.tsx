import axios, { Method } from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

export const Api = axios.create({
    baseURL: BASE_URL
});