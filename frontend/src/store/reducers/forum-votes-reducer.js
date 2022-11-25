import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { fetchVotes, deleteForumVote, voteForum } from "../../services/forum";

const forumVotesAdapter = createEntityAdapter({
  selectId: (a) => a.forumVoteId,
});

const initialState = forumVotesAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const forumVotesSlice = createSlice({
  name: "forumVotes",
  initialState,
  reducers: {
    resetData: (state) => {
      forumVotesAdapter.removeAll();
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVotes.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchVotes.fulfilled, (state, action) => {
        if (!action?.payload) return;
        const objectList = action.payload.map((forumVote) => {
          const forumVoteId = {
            userId: forumVote?.userId,
            pageId: forumVote?.pageId,
          };
          const likeDislike = forumVote.likeDislike;
          console.info({ forumVoteId, likeDislike }, "check this thing out");
          return { forumVoteId, likeDislike };
        });
        console.debug(objectList);
        state.status = "success";
        forumVotesAdapter.upsertMany(state, objectList);
      })
      .addCase(fetchVotes.rejected, (state, action) => {
        state.status = "failed";

        state.error = action?.error?.message;
      })
      .addCase(deleteForumVote.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteForumVote.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = "success";
        const forumVoteId = {
          userId: action.payload?.userId,
          pageId: action.payload?.pageId,
        };
        forumVotesAdapter.removeOne(state, forumVoteId);
      })
      .addCase(deleteForumVote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(voteForum.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(voteForum.fulfilled, (state, action) => {
        if (!action?.payload) return;
        state.status = "success";
        const passedForumVote = {
          forumVoteId: {
            userId: action.payload?.userId,
            pageId: action.payload?.pageId,
          },
          likeDislike: action.payload?.likeDislike,
        };
        forumVotesAdapter.upsertOne(state, passedForumVote);
      });
  },
});

export const {
  selectAll: selectAllForumVotes,
  selectById: selectByForumVoteId,
  selectIds: selectAllForumVotesIds,
} = forumVotesAdapter.getSelectors((state) => state.forumVotes);

export const forumVoteActions = forumVotesSlice.actions;
