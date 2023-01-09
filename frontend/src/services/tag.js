/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { tagEndpoints } from './Api/tag';

export const fetchTags = createAsyncThunk('tag/list', async (pageParams) => {
  try {
    const { page, size } = pageParams;
    const response = await tagEndpoints.list(page, size);
    return response.data;
  } catch (err) {
    return err;
  }
});
