/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import {
  listVotesByPage,
  deleteCommentVote,
  voteComment,
} from '../../services/comment';

const commentVotesAdapter = createEntityAdapter({
  selectId: (a) => a.commentId,
});

const initialState = commentVotesAdapter.getInitialState({
  status: 'idle',
  error: '',
});

export const commentVotesSlice = createSlice({
  name: 'commentVotes',
  initialState,
  reducers: {
    resetData: (state) => {
      commentVotesAdapter.removeAll(state);
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listVotesByPage.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(listVotesByPage.fulfilled, (state, action) => {
        if (!action?.payload) return;
        state.status = 'success';
        commentVotesAdapter.upsertMany(state, action.payload);
      })
      .addCase(listVotesByPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error?.message;
      })
      .addCase(deleteCommentVote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteCommentVote.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = 'success';
        commentVotesAdapter.removeOne(state, action.payload.commentId);
      })
      .addCase(deleteCommentVote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(voteComment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(voteComment.fulfilled, (state, action) => {
        if (!action?.payload) return;
        state.status = 'success';
        commentVotesAdapter.upsertOne(state, action.payload);
      })
      .addCase(voteComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllCommentVotes,
  selectById: selectByCommentVoteId,
  selectIds: selectAllVoteCommentIds,
} = commentVotesAdapter.getSelectors((state) => state.commentVotes);

export const commentVoteActions = commentVotesSlice.actions;
