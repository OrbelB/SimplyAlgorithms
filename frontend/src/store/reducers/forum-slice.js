/* eslint-disable no-return-assign */
/* eslint-disable no-void */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSingleForum,
  reportForum,
  createForum,
  deleteForum,
  updateForum,
} from '../../services/forum';

// import { fetchSingleTopic } from '../../services/topic';

const initialState = {
  forum: {},
  pageId: '',
  status: 'idle',
  error: '',
  reportId: '',
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    resetData: (state) => {
      state.forum = {};
      state.status = 'idle';
      state.error = '';
      state.pageId = '';
      state.reportId = '';
    },
    addSingleReply: (state, action) => {
      state.forum.comments = state.forum.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount += 1;
          return comment;
        }
        return comment;
      });
    },
    removeSingleReply: (state, action) => {
      state.forum.comments = state.forum.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount -= 1;
          return comment;
        }
        return comment;
      });
    },
    removeSingleReportId: (state) => void (state.reportId = ''),
    switchStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSingleForum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleForum.fulfilled, (state, action) => {
        state.status = 'success';
        state.forum = {
          ...action.payload,
          createdDate: new Date(action.payload.createdDate).toISOString(),
        };
        state.pageId = '';
      })
      .addCase(fetchSingleForum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error?.message;
      })
      .addCase(createForum.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = 'successToIdle';
        state.pageId = action.payload;
      })
      .addCase(deleteForum.fulfilled, (state, action) => {
        if (action?.payload) {
          return;
        }
        if (state.forum.pageId === action?.payload) {
          state.forum = {};
          state.status = 'idle';
          state.error = '';
          state.pageId = '';
        }
      })
      .addCase(updateForum.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateForum.fulfilled, (state, action) => {
        state.status = 'completed';
        state.forum = {
          ...action.payload,
          createdDate: new Date(action.payload.createdDate).toISOString(),
        };
        state.pageId = '';
      })
      .addCase(updateForum.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(reportForum.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(reportForum.fulfilled, (state, action) => {
        state.status = 'success';
        state.reportId = action.payload;
      });
  },
});

export const forumActions = forumSlice.actions;
