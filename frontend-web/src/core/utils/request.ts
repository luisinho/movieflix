import axios, { AxiosError, Method } from 'axios';
import qs from 'qs';

import { URL_LOGIN } from './ApiUrl';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type RequestParams = {
    method?: Method,
    url: string,
    data?: object | string,
    params?: object,
    headers?: object
}

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

axios.interceptors.response.use(function (response) {

    return response;

}, function (error: AxiosError) {

    if (error.response?.status === 401) {
        logout();
    }

    return Promise.reject(error);
});

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
    return axios({
        method: method,
        url: `${BASE_URL}${url}`,
        data: data,
        params: params,
        headers: headers
    });
}

export const makePrivateRequest = ({ method = 'GET', url, data, params }: RequestParams) => {

    const sessionData = getSessionData();

    const headers = {
        'Authorization': `Bearer ${sessionData.access_token}`
    }

    return makeRequest({ method, url, data, params, headers: headers });
}

export const makeLogin = (loginData: LoginData) => {

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const headers = {
        Authorization: `Basic ${window.btoa(token)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    const payload = qs.stringify({ ...loginData, grant_type: 'password' });

    return makeRequest({ method: 'POST', url: URL_LOGIN, data: payload, headers: headers });
}