import {createSlice} from "@reduxjs/toolkit";

const initialState = { address: null, isAuthenticated: false, user: null, loading: false };


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserAddress: (state, action) => {
            state.address = action.payload
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = initialState.isAuthenticated;
            state.user = initialState.user;
        },
        setAuthLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setUserAddress, login, logout, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;