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
