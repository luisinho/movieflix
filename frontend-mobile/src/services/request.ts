import axios, { Method } from 'axios';
import queryString from 'query-string';
import { encode } from 'base-64';

import { Api } from './api';
import { URL_LOGIN } from '../utils/ApiUrl';
import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';

type RequestParams = {
    method?: Method,
    url: string,
    data?: object | string,
    params?: object,
    header?: { aut?: string, content?: string },
}

type LoginData = {
    username: string;
    password: string;
}

export const makePrivateRequest = async ({ method = 'GET', url, data, params }: RequestParams) => {

    const sessionData = await getSessionData();

    const headers = {
        aut: `Bearer ${sessionData.access_token}`
    }

    return makeRequest({ method, url, data, params, header: headers });
}

export const makeLogin = async (loginData: LoginData) => {

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    console.log('token', encode(token));

    const headers = {

        aut: `Basic ${encode(token)}`,
        content: 'application/x-www-form-urlencoded'
    }

    const payload = queryString.stringify({ ...loginData, grant_type: 'password' });

    console.log('headers', headers);

    return makeRequest({ method: 'POST', url: URL_LOGIN, data: payload, header: headers });
}

export const makeRequest = async ({ method = 'GET', url, data, params, header }: RequestParams) => {

    if (method === 'DELETE') {

        return await Api.delete('');

    } else if (method === 'GET') {

        return await Api.get(url, params);

    } else if (method === 'POST') {

        return await Api.post(url, data, {
            headers: {
                'Authorization': Object(header?.aut),
                'Content-Type': Object(header?.content)
            }
        });

    } else {

        return await Api.put('');
    }
}