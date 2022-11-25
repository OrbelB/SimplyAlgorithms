import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { fetchTags } from "../../services/tag";

const tagAdapter = createEntityAdapter({
  selectId: (a) => a.tagId,
});

const initialState = tagAdapter.getInitialState({
  error: "",
  status: "idle",
  totalElements: 0,
  totalPages: 0,
});

export const tagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    resetData: (state) => {
      tagAdapter.removeAll(state);
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "success";
        state.totalElements = action?.payload?.totalElements;
        state.totalPages = action?.payload?.totalPages;
        //add tags

        tagAdapter.upsertMany(state, action?.payload?.content);
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllTags,
  selectById: selectAllTagsById,
  selectIds: selectIdTags,
} = tagAdapter.getSelectors((state) => state.tags);

export const tagsActions = tagSlice.actions;
