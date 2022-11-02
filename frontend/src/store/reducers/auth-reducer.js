import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    isLoggedIn: false,
    userId: "",
    jwtAccessToken: "",
    jwtRefreshToken: document.cookie.replace(/(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/, "$1") || ""
}

export const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        setVals: (state, action) => {
            state.userId = action.payload.userId;
            state.jwtAccessToken = action.payload.jwtAccessToken;
            state.jwtRefreshToken = action.payload.jwtRefreshToken;
        },
        setIsLoggedIn: (state) => void(state.isLoggedIn = true),
        resetData: (state) => {
            state.isLoggedIn = false;
            state.jwtAccessToken = null;
            state.jwtRefreshToken = null;
            state.userId = null;
        }
    }
});

export const authActions = authSlice.actions;