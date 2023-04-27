/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { fetchForumList } from '../../services/forum';

const forumsAdapter = createEntityAdapter({
  selectId: (a) => a.pageId,
});

const initialState = forumsAdapter.getInitialState({
  status: 'idle',
  error: '',
  filterBy: '',
  sortBy: '',
  totalElements: 0,
  currentPage: undefined,
  totalPages: undefined,
});

export const forumsSlice = createSlice({
  name: 'forums',
  initialState,
  reducers: {
    setForums: (state, action) => {
      forumsAdapter.upsertMany(state, action.payload.forums);
    },
    updateCurrentPage: (state) => {
      state.currentPage += 1;
    },
    resetData: (state) => {
      forumsAdapter.removeAll(state);
      state.status = 'idle';
      state.error = '';
      state.sortBy = '';
      state.currentPage = undefined;
      state.totalPages = undefined;
    },
    sortForums: (state, action) => {
      state.filterBy = '';
      state.sortBy = action.payload;
    },
    filterForums: (state, action) => {
      state.filterBy = action.payload;
      state.sortBy = '';
    },
    updateForum: (state, action) => {
      forumsAdapter.upsertOne(state, action.payload?.forum);
    },
    deleteForum: (state, action) => {
      forumsAdapter.removeOne(state, action.payload.pageId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchForumList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForumList.fulfilled, (state, action) => {
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
        state.status = 'success';
        const posts = action.payload?.content?.map((forumQuickView) => {
          forumQuickView.createdDate = new Date(
            forumQuickView?.createdDate
          ).toISOString();
          return forumQuickView;
        });
        // add other forums
        forumsAdapter.upsertMany(state, posts);
      })
      .addCase(fetchForumList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllForums,
  selectById: selectAllForumsByPageId,
  selectIds: selectForumsIds,
} = forumsAdapter.getSelectors((state) => state.forums);

export const selectSortedForums = createSelector(
  selectAllForums,
  (state) => state.forums.sortBy,
  (allForums, sortBy) =>
    [...allForums].sort((a, b) => {
      if (sortBy === '') return allForums;
      if (Number.isNaN(Number.parseInt(a[sortBy.toString().trim()], 10))) {
        if (sortBy.toString().trim() === 'title') {
          return a[sortBy.toString().trim()]
            .toUpperCase()
            .trim()
            .localeCompare(b[sortBy.toString().trim()].toUpperCase().trim());
        }
        return allForums;
      }
      if (sortBy.toString().trim() === 'createdDate') {
        return b[sortBy.toString().trim()].localeCompare(
          a[sortBy.toString().trim()]
        );
      }
      return b[sortBy.toString().trim()] - a[sortBy.toString().trim()];
    })
);

export const selectFilteredAndSortedForums = createSelector(
  [
    selectAllForums,
    (state, sortBy) => ({ filterBy: state.forums.filterBy, sortBy }),
  ],
  (forums, { filterBy, sortBy = '' }) => {
    const filteredForums = filterBy
      ? forums.filter((forum) =>
          forum.tags.find((tag) => tag.tagId === filterBy)
        )
      : forums;
    return filteredForums.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title
          .trim()
          .localeCompare(b.title.trim(), undefined, { sensitivity: 'base' });
      }
      if (sortBy === 'createdDate') {
        return b.createdDate.localeCompare(a.createdDate);
      }
      if (sortBy === 'upVotes') {
        return b[sortBy.toString().trim()] - a[sortBy.toString().trim()];
      }
      // fallback to not sorting
      return filteredForums;
    });
  }
);

export const forumsActions = forumsSlice.actions;
