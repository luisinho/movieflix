import axios, { Method } from 'axios';

type RequestParams = {
    method?: Method,
    url: string,
    data?: object | string,
    params?: object,
    headers?: object
}

const BASE_URL = 'http://localhost:8080';

export const makeRequest = ({ method = 'GET', url, data, params, headers }: RequestParams) => {
    return axios({
        method: method,
        url: `${BASE_URL}${url}`,
        data: data,
        params: params,
        headers: headers
    });
}