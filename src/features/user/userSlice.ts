import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';

const origState: {
    id: string | null,
    name: string | null,
} = {
    id: null,
    name: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: origState,
    reducers: {
        resetUser: () => origState,
        setUser: (
            state,
            {
                payload: { id, name, },
            }: PayloadAction<{ id: string; name: string; }>
        ) => {
            state.id = id;
            state.name = name;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.logout.matchFulfilled,
                () => origState,
        )
    },
});

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
