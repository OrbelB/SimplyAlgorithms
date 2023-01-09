/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import noUserImageTemplate from '../../assets/noPictureTemplate.png';
import {
  fetchUser,
  updatePassword,
  updateUserData,
  deleteUser,
} from '../../services/user';

const initialState = {
  dob: '',
  email: '',
  username: '',
  userId: '',
  profilePicture: noUserImageTemplate,
  firstName: '',
  lastName: '',
  biography: '',
  phoneNumber: '',
  role: '',
  createdDate: '',
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState: (state, action) => {
      state.email = action.payload?.email;
      state.profilePicture = action.payload?.profilePicture;
      state.username = action.payload?.username;
    },
    onUserLogout: (state) => {
      state.status = 'idle';
      state.error = '';
      state.email = '';
      state.profilePicture = noUserImageTemplate;
      state.firstName = '';
      state.lastName = '';
      state.username = '';
      state.biography = '';
      state.firstName = '';
      state.lastName = '';
      state.phoneNumber = '';
      state.role = '';
      state.createdDate = '';
      state.dob = '';
      state.userId = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.status = 'succeeded';
        state.userId = action?.payload?.userId;
        state.email = action?.payload?.email;
        state.username = action?.payload?.username;
        state.profilePicture = action?.payload?.profilePicture;
        state.biography = action?.payload?.biography;
        if (action?.payload?.biography === null) state.biography = '';

        state.firstName = action?.payload?.firstName;
        state.lastName = action?.payload?.lastName;
        state.phoneNumber = action?.payload?.phoneNumber;
        if (action?.payload?.phoneNumber === null) state.phoneNumber = '';

        state.role = action?.payload?.role;
        state.createdDate = '';
        if (action.payload.createdDate !== undefined)
          state.createdDate = new Date(
            action?.payload?.createdDate
          ).toISOString();
        state.dob = action?.payload?.dob;
        if (action?.payload?.dob === null) state.dob = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.status = 'succeeded';
        state.error = '';
        state.email = '';
        state.profilePicture = noUserImageTemplate;
        state.firstName = '';
        state.lastName = '';
        state.username = '';
        state.biography = '';
        state.firstName = '';
        state.lastName = '';
        state.phoneNumber = '';
        state.role = '';
        state.createdDate = '';
        state.dob = '';
        state.userId = '';
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updatePassword.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        if (!action.payload) return;
        if (action.payload === state.userId) {
          state.status = 'idle';
          state.error = '';
          state.email = '';
          state.profilePicture = noUserImageTemplate;
          state.firstName = '';
          state.lastName = '';
          state.username = '';
          state.biography = '';
          state.firstName = '';
          state.lastName = '';
          state.phoneNumber = '';
          state.role = '';
          state.createdDate = '';
          state.dob = '';
        }
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        if (!action.payload) return;
        if (action.payload.userId === state.userId) {
          state.status = 'succeeded';
          state.userId = action?.payload?.userId;
          state.email = action?.payload?.email;
          state.username = action?.payload?.username;
          state.profilePicture = action?.payload?.profilePicture;
          if (action?.payload?.biography === null) state.biography = '';
          state.biography = action?.payload?.biography;
          state.firstName = action?.payload?.firstName;
          state.lastName = action?.payload?.lastName;
          if (action?.payload?.phoneNumber === null) state.phoneNumber = '';
          state.phoneNumber = action?.payload?.phoneNumber;
          state.role = action?.payload?.role;
          state.createdDate = new Date(
            action?.payload?.createdDate
          ).toISOString();
          state.dob = action?.payload?.dob;
        }
      })
      .addCase(updateUserData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const userActions = userSlice.actions;
