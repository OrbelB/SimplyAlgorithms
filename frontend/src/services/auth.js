import { authEndpoints } from "./Api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "register",
  async (userToAuthenticate) => {
    const response = await authEndpoints.register(userToAuthenticate);
    return response.data;
  }
);

export const login = createAsyncThunk("login", async (userCredentials) => {
  const response = await authEndpoints.login(
    userCredentials?.username,
    userCredentials?.password
  );
  return response.data;
});

export const refreshAccessToken = createAsyncThunk(
  "refreshToken",
  async (refreshAccessToken) => {
    const response = await authEndpoints
      .singleByRefreshToken(refreshAccessToken)
      .catch((error) => {
        if (error?.response) {
          return error;
        }
      });
    return response.data;
  }
);
