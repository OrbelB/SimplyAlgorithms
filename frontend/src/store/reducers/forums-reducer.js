import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { fetchForumList } from "../../services/forum";
const forumsAdapter = createEntityAdapter({
  selectId: (a) => a.pageId,
});

const initialState = forumsAdapter.getInitialState({
  status: "idle",
  error: "",
  sortBy: "createdDate",
  filterBy: "",
});

export const forumsSlice = createSlice({
  name: "forums",
  initialState,
  reducers: {
    setForums: (state, action) => {
      forumsAdapter.upsertMany(state, action.payload?.forums);
    },
    resetData: (state) => {
      forumsAdapter.removeAll(state);
      state.status = "idle";
      state.error = "";
    },
    sortForums: (state, action) => {
      state.filterBy = "";
      state.sortBy = action.payload;
    },
    filterForums: (state, action) => {
      state.filterBy = action.payload;
      state.sortBy = "createdDate";
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
      .addCase(fetchForumList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchForumList.fulfilled, (state, action) => {
        state.status = "success";
        const posts = action.payload?.content?.map((forumQuickView) => {
          forumQuickView.createdDate = new Date(
            forumQuickView?.createdDate
          ).toISOString();
          return forumQuickView;
        });
        //add other forums
        forumsAdapter.upsertMany(state, posts);
      })
      .addCase(fetchForumList.rejected, (state, action) => {
        state.status = "failed";
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
      if (isNaN(a[sortBy.toString().trim()])) {
        if (sortBy.toString().trim() === "title") {
          return a[sortBy.toString().trim()].localeCompare(
            b[sortBy.toString().trim()]
          );
        }
        return b[sortBy.toString().trim()].localeCompare(
          a[sortBy.toString().trim()]
        );
      } else {
        return b[sortBy.toString().trim()] - a[sortBy.toString().trim()];
      }
    })
);

export const forumsActions = forumsSlice.actions;
