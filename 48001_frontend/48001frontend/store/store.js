import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
const storage = require('redux-persist/lib/storage').default;

const persistConfig = {
    key: 'auth',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store);

export { store, persistor };
