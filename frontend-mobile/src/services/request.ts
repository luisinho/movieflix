import { Method } from 'axios';
import queryString from 'query-string';
import { encode } from 'base-64';

import { Api } from './api';
import { DELETE, GET, POST } from '../utils/ApiMethod';
import { URL_LOGIN } from '../utils/ApiUrl';
import { CLIENT_ID, CLIENT_SECRET, getSessionData } from './auth';

type RequestParams = {
    method?: Method,
    url: string,
    data?: object | string,
    params?: { genreId?: number, movieId?: number, page?: number, linesPerPage?: number },
    header?: { auth?: string, content?: string },
}

type LoginData = {
    username: string;
    password: string;
}

export const makePrivateRequest = async ({ method = GET, url, data, params }: RequestParams) => {

    const sessionData = await getSessionData();

    const header = {
        auth: `Bearer ${sessionData.access_token}`
    }

    return makeRequest({ method, url, data, params, header: header });
}

export const makeLogin = async (loginData: LoginData) => {

    const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

    const header = {

        auth: `Basic ${encode(token)}`,
        content: 'application/x-www-form-urlencoded'
    }

    const payload = queryString.stringify({ ...loginData, grant_type: 'password' });

    return makeRequestLogin({ url: URL_LOGIN, data: payload, header: header });
}

export const makeRequestLogin = async ({ url, data, params, header }: RequestParams) => {

    return await Api.post(url, data, {
        headers: {
            'Authorization': Object(header?.auth),
            'Content-Type': Object(header?.content)
        }
    });
}

export const makeRequest = async ({ method = GET, url, data, params, header }: RequestParams) => {

    if (method === DELETE) {

        return await Api.delete('');

    } else if (method === GET) {

        return await Api.get(url, {
            headers: {
                'Authorization': Object(header?.auth)
            },
            params: {
                genreId: params?.genreId,
                movieId: params?.movieId,
                page: params?.page,
                linesPerPage: params?.linesPerPage
            }
        });

    } else if (method === POST) {

        return await Api.post(url, data, {
            headers: {
                'Authorization': Object(header?.auth)
            }
        });

    } else {

        return await Api.put('');
    }
}