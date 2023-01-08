import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';
import resourceReducer from '../features/resource/resourceSlice';
import userReducer from '../features/user/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [],
    whitelist: ['auth', 'user'],
};

const reducers = {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    resource: resourceReducer,
    user: userReducer,
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
