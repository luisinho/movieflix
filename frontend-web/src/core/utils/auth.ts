export const CLIENT_ID = 'movieflix';
export const CLIENT_SECRET = 'movieflix9091';
export const URL_LOGIN = '/oauth/token';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    jti: string;
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}