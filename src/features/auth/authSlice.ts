import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

const origState: {
    token: string | null;
    expirationDate: string | null;
} = {
    token: null,
    expirationDate: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: origState,
    reducers: {
        loggedOut: () => origState,
        setAuth: (
            state,
            {
                payload: { token, expirationDate },
            }: PayloadAction<{ token: string; expirationDate: string }>,
        ) => {
            state.token = token;
            state.expirationDate = expirationDate;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.logout.matchFulfilled,
            () => origState,
        );
    },
});

export const { loggedOut, setAuth } = authSlice.actions;

export default authSlice.reducer;
