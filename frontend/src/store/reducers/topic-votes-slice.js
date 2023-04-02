/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchVotes, deleteTopicVote, voteTopic } from '../../services/topic';

const topicVotesAdapter = createEntityAdapter({
  selectId: (a) => a.topicVoteId,
});

const initialState = topicVotesAdapter.getInitialState({
  status: 'idle',
  error: '',
});

export const topicVotesSlice = createSlice({
  name: 'topicVotes',
  initialState,
  reducers: {
    resetData: (state) => {
      topicVotesAdapter.removeAll(state);
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVotes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchVotes.fulfilled, (state, action) => {
        if (!action?.payload) return;
        const objectList = action.payload.map((topicVote) => {
          const topicVoteId = {
            userId: topicVote.userId,
            pageId: topicVote.pageId,
          };
          const { likeDislike } = topicVote;
          return { topicVoteId, likeDislike };
        });
        state.status = 'success';
        topicVotesAdapter.addMany(state, objectList);
      })
      .addCase(fetchVotes.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action?.error?.message;
      })
      .addCase(deleteTopicVote.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteTopicVote.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = 'success';
        const passedTopicVoteId = {
          userId: action.payload?.userId,
          pageId: action.payload?.pageId,
        };
        topicVotesAdapter.removeOne(state, passedTopicVoteId);
      })
      .addCase(deleteTopicVote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(voteTopic.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(voteTopic.fulfilled, (state, action) => {
        if (!action?.payload) return;
        state.status = 'success';
        const passedTopicVote = {
          topicVoteId: {
            userId: action.payload?.userId,
            pageId: action.payload?.pageId,
          },
          likeDislike: action.payload?.likeDislike,
        };
        topicVotesAdapter.upsertOne(state, passedTopicVote);
      });
  },
});

export const {
  selectAll: selectAllTopicVotes,
  selectById: selectByTopicVoteId,
  selectIds: selectAllTopicVotesIds,
} = topicVotesAdapter.getSelectors((state) => state.topicVotes);

export const topicVoteActions = topicVotesSlice.actions;
