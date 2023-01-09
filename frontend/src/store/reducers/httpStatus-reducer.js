/* eslint-disable no-return-assign */
/* eslint-disable no-void */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statusCode: 0,
};

export const httpSlice = createSlice({
  name: 'httpStatus',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.statusCode = action.payload.statusCode;
    },

    resetData: (state) => void (state.statusCode = 0),
  },
});

export const statusActions = httpSlice.actions;
