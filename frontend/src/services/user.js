import { userEndpoints } from "./Api/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/getUsers",
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
  "user/delete",
  async (passedParams) => {
    const { userId, accessToken } = passedParams;
    const response = await userEndpoints
      .delete(userId, accessToken)
      .catch((error) => {
        if (error) return error;
      });
    return response.data;
  }
);
export const updateUserData = createAsyncThunk(
  "user/update",
  async (passedParams) => {
    const { updatedUserData, accessToken } = passedParams;

    const response = await userEndpoints.update(updatedUserData, accessToken);
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  "user/update-password",
  async (passedParams) => {
    const { updatedPassword, accessToken } = passedParams;
    const response = await userEndpoints
      .updatePassword(updatedPassword, accessToken)
      .catch((error) => {
        if (error) return error;
      });

    return response.data;
  }
);
