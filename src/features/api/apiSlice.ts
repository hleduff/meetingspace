import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth } from './config';
import type {
    IBookingRequest,
    IBookings,
    IGeneric,
    IGetMe,
    ILogin,
    ILogout,
    IResource,
} from '../../types';

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Bookings'],
    endpoints: (builder) => ({
        createBooking: builder.mutation<IGeneric, IBookingRequest>({
            query: (booking) => ({
                url: '/bookings',
                method: 'POST',
                body: booking,
            }),
            invalidatesTags: ['Bookings'],
        }),
        getBookings: builder.query<IBookings, void>({
            query: () => ({ url: '/bookings', method: 'GET' }),
            providesTags: ['Bookings'],
        }),
        getMe: builder.mutation<IGetMe, void>({
            query: () => ({ url: '/me', method: 'GET' }),
        }),
        getResource: builder.query<IResource, void>({
            query: () => ({ url: '/resource', method: 'GET' }),
        }),
        getUser: builder.query<IGetMe, string>({
            query: (id) => ({ url: `/users/${id}`, method: 'GET' }),
        }),
        login: builder.mutation<ILogin, void>({
            query: () => ({ url: '/login', method: 'GET' }),
        }),
        logout: builder.mutation<ILogout, void>({
            query: () => ({ url: '/logout', method: 'GET' }),
        }),
        resetEnvironment: builder.mutation<IGeneric, void>({
            query: () => ({ url: '/reset', method: 'GET' }),
            invalidatesTags: ['Bookings'],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useGetMeMutation,
    useGetResourceQuery,
    useGetUserQuery,
    useLoginMutation,
    useLogoutMutation,
    useResetEnvironmentMutation,
} = apiSlice;
