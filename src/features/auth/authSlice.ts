import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
    expirationDate: string | null;
};

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, expirationDate: null } as AuthState,
    reducers: {
        setAuth: (
            state,
            {
                payload: { token, expirationDate },
            }: PayloadAction<{ token: string; expirationDate: string }>
        ) => {
            state.token = token;
            state.expirationDate = expirationDate;
        },
    },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
