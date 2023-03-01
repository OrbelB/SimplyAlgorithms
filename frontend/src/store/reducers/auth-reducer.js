/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import {
  login,
  register,
  refreshAccessToken,
  resetPasswordRequest,
  changePassword,
} from '../../services/auth';

const initialState = {
  passwordResetState: 'idle',
  isLoggedIn: false,
  userId: '',
  jwtAccessToken: '',
  jwtRefreshToken: Cookies.get('refresh-token') ?? '',
  status: 'idle',
  statusCode: 0,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVals: (state, action) => {
      state.userId = action.payload.userId;
      state.jwtAccessToken = action.payload.jwtAccessToken;
      state.jwtRefreshToken = action.payload.jwtRefreshToken;
    },
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    resetData: (state) => {
      state.isLoggedIn = false;
      state.jwtAccessToken = '';
      state.jwtRefreshToken = '';
      state.userId = '';
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = 'success';
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = 'success';
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = 'success';
      })
      // initial state
      // action response from endpoint rout
      .addCase(resetPasswordRequest.rejected, (state) => {
        // state.error = action.payload;
        state.error = 'failed';
      })
      .addCase(resetPasswordRequest.fulfilled, () => {
        console.log('got the email');
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordResetState = 'accepted';
      })
      .addCase(changePassword.rejected, (state) => {
        state.passwordResetState = 'rejected';
      });
  },
});

export const authActions = authSlice.actions;
