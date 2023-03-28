/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { tagEndpoints } from './Api/tag';

export const fetchTags = createAsyncThunk('tag/list', async (pageParams) => {
  const { page, size, filterBy } = pageParams;
  const response = await tagEndpoints.list(page, size, filterBy);
  return response.data;
});
