/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import noUserImageTemplate from '../../assets/person-fill.png';
import {
  fetchUser,
  updatePassword,
  updateUserData,
  deleteUser,
  updatePreferences,
  fetchUserDashboardInfo,
  removeSingleNotification,
  checkAvailability,
  requestRoleChange,
  updateUserRole,
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
  userPreferences: {},
  dashboardInfo: {},
  nameAvailable: undefined,
  emailAvailable: undefined,
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
      state.userPreferences = '';
      state.dashboardInfo = {};
      state.userPreferences = {};
      state.nameAvailable = undefined;
      state.emailAvailable = undefined;
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
        state.userPreferences = action?.payload?.userPreferencesDTO;
        if (action?.payload?.userPreferencesDTO === null)
          state.userPreferences = '';
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
      })
      .addCase(updatePreferences.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.status = 'success';
        state.userPreferences = action.payload;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(removeSingleNotification.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(removeSingleNotification.fulfilled, (state, action) => {
        const { notifications } = state.dashboardInfo;
        state.dashboardInfo.notifications = notifications.filter(
          (notification) => notification.notificationId !== action.payload
        );
        state.status = 'success';
      })
      .addCase(removeSingleNotification.rejected, (state, action) => {
        state.error = action.payload.message;
        state.status = 'failed';
      })
      .addCase(fetchUserDashboardInfo.pending, (state) => {
        state.status = 'pendingDashboard';
      })
      .addCase(fetchUserDashboardInfo.fulfilled, (state, action) => {
        state.dashboardInfo = action.payload;
        state.status = 'success';
      })
      .addCase(fetchUserDashboardInfo.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(checkAvailability.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.status = 'success';
        const { username, email } = action.payload;
        if (username !== undefined || username !== undefined)
          state.nameAvailable = username;
        if (email !== undefined || email !== null) state.emailAvailable = email;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(requestRoleChange.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(requestRoleChange.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(requestRoleChange.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUserRole.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const userActions = userSlice.actions;
