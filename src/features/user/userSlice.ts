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

export const userSlice = createSlice({
    name: 'user',
    initialState: { id: null, name: null } as IUserState,
    reducers: {
        resetUser: () => initialState,
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

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
