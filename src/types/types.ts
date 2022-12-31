export interface IGenericResponse {
    success: boolean;
    data: string;
};

export interface IToken {
    token: string;
    expirationDate: string;
};

export interface ILoginResponse {
    success: boolean;
    data: IToken;
};

export interface ILogoutResponse {
    success: boolean;
    message: string;
};

export interface IUser {
    id: string;
    name: string;
};

export interface IGetMeResponse {
    success: boolean;
    data: IUser;
};
