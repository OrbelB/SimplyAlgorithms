import { stepLabelClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import noUserImageTemplate from "../../assets/noPictureTemplate.png";
import {
  fetchUser,
  updatePassword,
  updateUserData,
  deleteUser,
} from "../../services/user";
const initialState = {
  dob: "",
  email: "",
  username: "",
  userId: "",
  profilePicture: noUserImageTemplate,
  firstName: "",
  lastName: "",
  biography: "",
  phoneNumber: "",
  role: "",
  createdDate: "",
  status: "idle",
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.email = action.payload?.email;
      state.profilePicture = action.payload?.profilePicture;
      state.username = action.payload?.username;
    },
    onUserLogout: (state) => {
      state.status = "idle";
      state.error = "";
      state.email = "";
      state.profilePicture = noUserImageTemplate;
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.biography = "";
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.role = "";
      state.createdDate = "";
      state.dob = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if(!action.payload) return;
        state.status = "succeeded";
        state.userId = action?.payload?.userId;
        state.email = action?.payload?.email;
        state.username = action?.payload?.username;
        state.profilePicture = action?.payload?.profilePicture;
        state.biography = action?.payload?.biography;
        if (action?.payload?.biography === null) state.biography = "";

        state.firstName = action?.payload?.firstName;
        state.lastName = action?.payload?.lastName;
        state.phoneNumber = action?.payload?.phoneNumber;
        if (action?.payload?.phoneNumber === null) state.phoneNumber = "";

        state.role = action?.payload?.role;
        console.log(action?.payload?.createdDate);
        state.createdDate = "";
        if (action.payload.createdDate !== undefined)
          state.createdDate = new Date(
            action?.payload?.createdDate
          ).toISOString();
        state.dob = action?.payload?.dob;
        if (action?.payload?.dob === null) state.dob = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.status = "succeeded";
        state.error = "";
        state.email = "";
        state.profilePicture = noUserImageTemplate;
        state.firstName = "";
        state.lastName = "";
        state.username = "";
        state.biography = "";
        state.firstName = "";
        state.lastName = "";
        state.phoneNumber = "";
        state.role = "";
        state.createdDate = "";
        state.dob = "";
      })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        if (!action.payload) return;
        if (action.payload === state.userId) {
          console.log("check");
          state.status = "idle";
          state.error = "";
          state.email = "";
          state.profilePicture = noUserImageTemplate;
          state.firstName = "";
          state.lastName = "";
          state.username = "";
          state.biography = "";
          state.firstName = "";
          state.lastName = "";
          state.phoneNumber = "";
          state.role = "";
          state.createdDate = "";
          state.dob = "";
        }
      })
      .addCase(updateUserData.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        if (!action.payload) return;
        if (action.payload.userId === state.userId) {
          state.status = "succeeded";
          state.userId = action?.payload?.userId;
          state.email = action?.payload?.email;
          state.username = action?.payload?.username;
          state.profilePicture = action?.payload?.profilePicture;
          if (action?.payload?.biography === null) state.biography = "";
          state.biography = action?.payload?.biography;
          state.firstName = action?.payload?.firstName;
          state.lastName = action?.payload?.lastName;
          if (action?.payload?.phoneNumber === null) state.phoneNumber = "";
          state.phoneNumber = action?.payload?.phoneNumber;
          state.role = action?.payload?.role;
          state.createdDate = new Date(
            action?.payload?.createdDate
          ).toISOString();
          state.dob = action?.payload?.dob;
        }
      })
      .addCase(updateUserData.rejected, (state, action) => {
        console.log(action.error);
        state.status = "failed";
      });
  },
});

export const userActions = userSlice.actions;
