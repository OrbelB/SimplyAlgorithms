import { createAsyncThunk } from '@reduxjs/toolkit';
import { userEndpoints } from './Api/user';

export const fetchUser = createAsyncThunk(
  'user/getUsers',
  async (credentials) => {
    try {
      const { userId, jwtAccessToken } = credentials;
      const response = await userEndpoints.singleById(userId, jwtAccessToken);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'user/delete',
  async (passedParams) => {
    const { userId, jwtAccessToken } = passedParams;
    const response = await userEndpoints.delete(userId, jwtAccessToken);

    return response.data;
  }
);
export const updateUserData = createAsyncThunk(
  'user/update',
  async (passedParams) => {
    const { updatedUserData, accessToken } = passedParams;
    const response = await userEndpoints.update(updatedUserData, accessToken);
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  'user/update-password',
  async (passedParams) => {
    const { updatedPassword, accessToken } = passedParams;
    const response = await userEndpoints
      .updatePassword(updatedPassword, accessToken)
      .catch((error) => {
        return error;
      });

    return response.data;
  }
);

export const updatePreferences = createAsyncThunk(
  'user/update-preferences',
  async (passedParams) => {
    const { updatedPreferences, accessToken } = passedParams;
    const response = await userEndpoints.updatePreferences(
      updatedPreferences,
      accessToken
    );
    return response.data;
  }
);

export const fetchUserDayStreak = createAsyncThunk(
  'user/day-streak',
  async (passedParams) => {
    const { userId, jwtAccessToken } = passedParams;
    const response = await userEndpoints.fetchDayStreak(userId, jwtAccessToken);
    return response.data;
  }
);

export const fetchUserNotifications = createAsyncThunk(
  'user/notifications',
  async (passedParams) => {
    const { userId, page, size, sortBy, title, jwtAccessToken } = passedParams;

    const response = await userEndpoints.fetchNotifications(
      userId,
      page,
      size,
      sortBy,
      title,
      jwtAccessToken
    );
    return response.data;
  }
);

export const removeSingleNotification = createAsyncThunk(
  'user/delete-notification',
  async (passedParams) => {
    const { notificationId, userId, jwtAccessToken } = passedParams;

    const response = await userEndpoints.deleteNotification(
      notificationId,
      userId,
      jwtAccessToken
    );
    return response.data;
  }
);

export const checkAvailability = createAsyncThunk(
  'user/availability',
  async (passedParams) => {
    const { username, email } = passedParams;
    const response = await userEndpoints.available(username, email);
    return response.data;
  }
);

export const requestRoleChange = createAsyncThunk(
  'user/request-role-change',
  async (passedParams) => {
    const { roleRequestForm, jwtAccessToken } = passedParams;
    const response = await userEndpoints.requestRoleChange(
      roleRequestForm,
      jwtAccessToken
    );
    return response.data;
  }
);

export const updateUserRole = createAsyncThunk(
  'user/update-role',
  async (passedParams) => {
    const { usernameOrId, role, jwtAccessToken } = passedParams;
    const response = await userEndpoints.updateRole(
      usernameOrId,
      role,
      jwtAccessToken
    );
    return response.data;
  }
);

export const requestLockAccount = createAsyncThunk(
  'user/lock-account',
  async (passedParams) => {
    const { usernameOrId, accountLockedSwitch, daysToLock, jwtAccessToken } =
      passedParams;
    const response = await userEndpoints.lockAccount(
      usernameOrId,
      accountLockedSwitch,
      daysToLock,
      jwtAccessToken
    );
    return response.data;
  }
);
