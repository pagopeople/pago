export enum LoadState {
    INIT,
    LOADING,
    LOADED,
    ERROR,
};

export enum AuthState {
    INIT,
    AUTHENTICATED,
    UNAUTHENTICATED,
};

export interface Config {
    userPoolId?: string,
    userPoolClientId?: string,
};

export interface User {
    name?: string,
    accessToken?: string,
    idToken?: string,
    familyName?: string,
    givenName?: string,
    username?: string,
};

export interface ExchangeCodeRequest {
    code: string,
    clientId: string,
    redirectUrl: string,
}
