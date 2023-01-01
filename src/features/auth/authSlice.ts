import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type IAuthState = {
    token: string | null;
    expirationDate: string | null;
};

const initialState: IAuthState = {
    token: null,
    expirationDate: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, expirationDate: null } as IAuthState,
    reducers: {
        resetAuth: () => initialState,
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

export const { resetAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
