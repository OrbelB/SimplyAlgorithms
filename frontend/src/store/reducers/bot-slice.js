import { createSlice } from '@reduxjs/toolkit';

import { fetchBot, updateBot } from '../../services/bot';

const initialState = {
  bot: {},
  status: 'idle',
  error: null,
};

export const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    resetData: (state) => {
      state.bot = {};
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBot.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBot.fulfilled, (state, action) => {
        state.status = 'success';
        state.bot = action.payload;
      })
      .addCase(fetchBot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBot.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBot.fulfilled, (state, action) => {
        state.status = 'success';
        state.bot = action.payload;
      })
      .addCase(updateBot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const reportActions = botSlice.actions;
