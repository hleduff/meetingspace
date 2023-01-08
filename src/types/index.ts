export interface IGeneric {
    success: boolean;
    data: string | object;
}

export interface IToken {
    token: string;
    expirationDate: string;
}

export interface ILogin extends IGeneric {
    data: IToken;
}

export interface ILogout {
    success: boolean;
    message: string;
}

export interface IUser {
    id: string;
    name: string;
}

export interface IGetUser extends IGeneric {
    data: IUser;
}

export interface IResource {
    id: string;
    name: string;
    minimumBookingDuration: number;
    maximumBookingDuration: number;
    bookingDurationStep: number;
}

export interface IResource extends IGeneric {
    data: IResource;
}
export interface IBooking {
    id: string;
    start: string;
    end: string;
    name: string;
    userId: string;
}

export interface IBookings extends IGeneric {
    data: IBooking[];
}

export interface IBookingRequest {
    name: string;
    duration: number;
}
