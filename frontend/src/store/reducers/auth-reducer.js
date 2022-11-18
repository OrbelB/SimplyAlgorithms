import { createSlice } from "@reduxjs/toolkit";
import { login, register, refreshAccessToken } from "../../services/auth";
const initialState = {
  isLoggedIn: false,
  userId: "",
  jwtAccessToken: "",
  jwtRefreshToken:
    document.cookie.replace(
      /(?:(?:^|.*;\s*)refresh_token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ) || "",
  status: "idle",
  statusCode: 0,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVals: (state, action) => {
      state.userId = action.payload.userId;
      state.jwtAccessToken = action.payload.jwtAccessToken;
      state.jwtRefreshToken = action.payload.jwtRefreshToken;
    },
    setIsLoggedIn: (state) => void (state.isLoggedIn = true),
    resetData: (state) => {
      state.isLoggedIn = false;
      state.jwtAccessToken = "";
      state.jwtRefreshToken = "";
      state.userId = "";
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = "success";
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      })
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = "success";
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.userId = action.payload?.userId;
        state.jwtAccessToken = action.payload?.accessToken;
        state.jwtRefreshToken = action.payload?.refreshToken;
        state.status = "success";
      });
  },
});

export const authActions = authSlice.actions;
