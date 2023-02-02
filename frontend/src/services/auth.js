import { createAsyncThunk } from '@reduxjs/toolkit';
import authEndpoints from './Api/auth';

export const register = createAsyncThunk(
  'register',
  async (userToAuthenticate) => {
    const response = await authEndpoints.register(userToAuthenticate);
    return response.data;
  }
);

export const login = createAsyncThunk('login', async (userCredentials) => {
  const response = await authEndpoints.login(
    userCredentials?.username,
    userCredentials?.password
  );
  return response.data;
});

export const refreshAccessToken = createAsyncThunk(
  'refreshToken',
  async (refreshToken) => {
    const response = await authEndpoints
      .singleByRefreshToken(refreshToken)
      .catch((error) => {
        if (error?.response) {
          return error;
        }
        throw Error(error);
      });
    return response.data;
  }
);

export const resetPasswordRequest = createAsyncThunk(
  'resetPasswordRequest',
  async (username) => {
    await authEndpoints.resetPasswordRequest(username);
  }
);

export const changePassword = createAsyncThunk(
  'changePassword',
  async (passwordRestObj) => {
    await authEndpoints.changePassword(passwordRestObj);
  }
);

export const getUsername = createAsyncThunk('getUsername', async (email) => {
  await authEndpoints.getUsername(email);
});
