import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../app/store';

import type {
    IGenericResponse,
    IGetMeResponse,
    ILoginResponse,
    ILogoutResponse,
} from '../../types/types';

const URL_API = import.meta.env.VITE_URL_API;

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API,
        prepareHeaders: (headers, { getState, endpoint }) => {
            // skip Bearer Token setting for login endpoint
            if (endpoint === 'login') return;

            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        resetEnvironment: builder.query<IGenericResponse, void>({
            query: () => ({ url: '/reset', method: 'GET' }),
        }),
        login: builder.mutation<ILoginResponse, void>({
            query: () => ({ url: '/login', method: 'GET' }),
        }),
        logout: builder.mutation<ILogoutResponse, void>({
            query: () => ({ url: '/logout', method: 'GET' }),
        }),
        getMe: builder.mutation<IGetMeResponse, void>({
            query: () => ({ url: '/me', method: 'GET' }),
        }),
    }),
});

export const {
    useGetMeMutation,
    useLoginMutation,
    useLogoutMutation,
    useResetEnvironmentQuery,
} = apiSlice;
