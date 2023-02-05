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

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (passedParams) => {
    const { userId, accessToken } = passedParams;
    const response = await userEndpoints
      .delete(userId, accessToken)
      .catch((error) => {
        return error;
      });
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

export const fetchUserDashboardInfo = createAsyncThunk(
  'user/dashboard',
  async (passedParams) => {
    const { userId, jwtAccessToken } = passedParams;
    const response = await userEndpoints.fetchUserDashboardInfo(
      userId,
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
