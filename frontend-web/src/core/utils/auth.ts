import jwtDecode from 'jwt-decode';
import { URL_HOME_LOGIN } from './ApiUrl';
import history from './history';

export const CLIENT_ID = 'movieflix';
export const CLIENT_SECRET = 'movieflix9091';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    jti: string;
}

export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {

    const sessionData = localStorage.getItem('authData') ?? '{}';

    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {

    const sessionData = getSessionData();

    try {
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccessToken;
    } catch (error) {
        return {} as AccessToken;
    }
}

export const isTokenValid = () => {

    const { exp } = getAccessTokenDecoded();

    return Date.now() <= exp * 1000;
}

export const isAuthenticated = () => {

    const sessionData = getSessionData();

    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {

}

export const logout = () => {
    localStorage.removeItem('authData');
    history.replace(URL_HOME_LOGIN);
}