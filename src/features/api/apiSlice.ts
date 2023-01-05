import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';

import { RootState } from '../../app/store';

import type {
    IGenericResponse,
    IGetMeResponse,
    ILoginResponse,
    ILogoutResponse,
} from '../../types/types';
import { loggedOut } from '../auth/authSlice';
import { resetUser } from '../user/userSlice';

const URL_API = import.meta.env.VITE_URL_API;

/** once there is a token in the state, use it for every subsequent request
 * https://redux-toolkit.js.org/rtk-query/usage/examples#dispatching-an-action-to-set-the-user-state
 */
const baseQuery = fetchBaseQuery({
    baseUrl: URL_API,
    prepareHeaders: (headers, { getState, endpoint }) => {
        // skip Bearer Token setting for login endpoint
        if (endpoint === 'login') return;

        const { auth: { token } } = getState() as RootState;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

/** Intercepts queries if a request fails because the token expired.
 * Normally we would just call a "refresh token" endpoint then,
 * but here we just empty the state to force the user to log in again.
 * (Based on https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery)
 * Note: maybe we should check the token' expirationDate instead to avoid an unnecessary API call?
 */
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(resetUser());
        api.dispatch(loggedOut());
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
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
