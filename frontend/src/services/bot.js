import { createAsyncThunk } from '@reduxjs/toolkit';

import { botEndpoints } from './Api/bot';

export const updateBot = createAsyncThunk('bot/updateBot', async (params) => {
  const { updatedBot, jwtAccessToken } = params;
  const res = await botEndpoints.update(updatedBot, jwtAccessToken);
  return res.data;
});

export const fetchBot = createAsyncThunk('bot/fetchBot', async (params) => {
  const { jwtAccessToken } = params;
  const res = await botEndpoints.getSingle(jwtAccessToken);
  return res.data;
});
