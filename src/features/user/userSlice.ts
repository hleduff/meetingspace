import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type IUserState = {
    id: string | null,
    name: string | null,
};

const initialState: IUserState = {
    id: null,
    name: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: { id: null, name: null } as IUserState,
    reducers: {
        logout: () => initialState,
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
});

export const { logout, setUser } = userSlice.actions;

export default userSlice.reducer;
