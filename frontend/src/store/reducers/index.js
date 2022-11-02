import { authSlice } from "./auth-reducer"
import { combineReducers } from "@reduxjs/toolkit"
import { httpSlice } from "./httpStatus-reducer";
import { userSlice } from "./user-reducer";
export const rootReducer = combineReducers( {
    auth: authSlice.reducer,
    http: httpSlice.reducer,
    user: userSlice.reducer
});