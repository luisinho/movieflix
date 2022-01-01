import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'movieflix';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'movieflix9091';
export type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

type LoginResponse = {
    access_token: string;
    token_type: string;
    userId: number;
    expires_in: number;
    scope: string;
    jti: string;
}

type AccessToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = async (loginResponse: LoginResponse) => {
    await AsyncStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = async () => {

    const sessionData = await AsyncStorage.getItem('authData') ?? '{}';

    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = async () => {

    const sessionData = await getSessionData();

    try {
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccessToken;
    } catch (error) {
        return {} as AccessToken;
    }
}

export const getLoggedUser = async () => {

    const sessionData = await getSessionData();

    const userId = sessionData.userId;

    return userId;
}

export const isTokenValid = async () => {

    const { exp } = await getAccessTokenDecoded();

    return Date.now() <= exp * 1000;
}

export const isAuthenticated = async () => {

    const sessionData = await getSessionData();

    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {

    return routeRoles.some(role => role === 'ROLE_MEMBER');
}

export const logoutItem = () => {

    AsyncStorage.removeItem('authData');
}