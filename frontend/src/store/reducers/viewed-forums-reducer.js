/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchUserForumsViewed, addUserView } from '../../services/forum';

const viewedForumsAdapter = createEntityAdapter({
  selectId: (a) => a.pageId,
});

const initialState = viewedForumsAdapter.getInitialState({
  status: 'idle',
  error: '',
  sortBy: 'createdDate',
  filterBy: '',
});

export const viewedForumsSlice = createSlice({
  name: 'viewedForums',
  initialState,
  reducers: {
    setForums: (state, action) => {
      viewedForumsAdapter.upsertMany(state, action.payload?.forums);
    },
    resetData: (state) => {
      viewedForumsAdapter.removeAll(state);
      state.status = 'idle';
      state.error = '';
    },
    sortForums: (state, action) => {
      state.filterBy = '';
      state.sortBy = action.payload;
    },
    filterForums: (state, action) => {
      state.filterBy = action.payload;
      state.sortBy = 'createdDate';
    },
    updateForum: (state, action) => {
      // state.status = "idle";
      viewedForumsAdapter.upsertOne(state, action.payload?.forum);
    },
    deleteForum: (state, action) => {
      viewedForumsAdapter.removeOne(state, action.payload.pageId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserForumsViewed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserForumsViewed.fulfilled, (state, action) => {
        const posts = action.payload?.map((forumQuickView) => {
          forumQuickView.createdDate = new Date(
            forumQuickView?.createdDate
          ).toISOString();
          return forumQuickView;
        });
        // add other forums
        viewedForumsAdapter.addMany(state, posts);
        state.status = 'success';
      })
      .addCase(fetchUserForumsViewed.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUserView.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addUserView.fulfilled, (state, action) => {
        state.status = 'idle';
        // eslint-disable-next-line no-unused-vars
        const post = {
          ...action.payload,
          createdDate: new Date(action.payload?.createdDate).toISOString(),
        };
        // add other forums
        // viewedForumsAdapter.upsertOne(state, post);
      });
  },
});

export const {
  selectAll: selectAllViewedForums,
  selectById: selectAllViewedForumsByPageId,
  selectIds: selectViewedForumsIds,
} = viewedForumsAdapter.getSelectors((state) => state.viewedForums);

export const viewForumsActions = viewedForumsSlice.actions;
