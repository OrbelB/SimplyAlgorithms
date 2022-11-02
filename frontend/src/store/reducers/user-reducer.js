import { createSlice } from "@reduxjs/toolkit";
import noUserImageTemplate from "../../assets/noPictureTemplate.png"
const initialState =  {
    email: "",
    username: "",
    profilePicture: noUserImageTemplate
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers: {
        setState : (state, action) => {
            state.email = action.payload.email;
            state.profilePicture = action.payload?.profilePicture;
            state.username = action.payload.username;
        },
        onUserLogout : (state) => {
            state.email = null;
            state.profilePicture = noUserImageTemplate;
            state.username = null;
        }
    }
});

export const userActions = userSlice.actions;