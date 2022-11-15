import { createSlice } from "@reduxjs/toolkit";
import noUserImageTemplate from "../../assets/noPictureTemplate.png";
import { fetchUser } from "../../services/user";
const initialState = {
  email: "",
  username: "",
  userId: "",
  profilePicture: noUserImageTemplate,
  firstName: "",
  lastName: "",
  biography: "",
  phoneNumber: "",
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
      state.email = "";
      state.profilePicture = noUserImageTemplate;
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.status = "idle";
      state.error = "";
      state.biography = "";
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.userId = action?.payload?.userId;
        state.email = action?.payload?.email;
        state.username = action?.payload?.username;
        state.profilePicture = action?.payload?.profilePicture;
        state.biography = action?.payload?.biography;
        state.firstName = action?.payload?.firstName;
        state.lastName = action?.payload?.lastName;
        state.phoneNumber = action?.payload?.phoneNumber;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.httpStatus = action.error.code;
        state.error = action.error?.message;
      });
  },
});

export const userActions = userSlice.actions;
