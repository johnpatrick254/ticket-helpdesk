import AuthReducer from "@/app/_services/api/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: AuthReducer,
            [apiSlice.reducerPath]: apiSlice.reducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

