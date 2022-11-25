import { stepLabelClasses } from "@mui/material";
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

import {
  listVotesByComment,
  deleteCommentVote,
  voteComment,
} from "../../services/comment";

const commentVotesAdapter = createEntityAdapter({
  selectId: (a) => a.commentVoteId,
});

const initialState = commentVotesAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const commentVotesSlice = createSlice({
  name: "commentVotes",
  initialState,
  reducers: {
    resetData: (state) => {
      commentVotesAdapter.removeAll(state);
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listVotesByComment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(listVotesByComment.fulfilled, (state, action) => {
        if (!action?.payload) return;
        const objectList = action.payload.map((commentVote) => {
          const commentVoteId = {
            userId: commentVote?.userId,
            commentId: commentVote?.commentId,
          };
          const likeDislike = commentVote.likeDislike;
          return { commentVoteId, likeDislike };
        });
        console.debug(objectList);
        state.status = "success";
        commentVotesAdapter.addMany(state, objectList);
      })
      .addCase(listVotesByComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(deleteCommentVote.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteCommentVote.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = "success";
        const passedCommentVoteId = {
          userId: action.payload?.userId,
          commentId: action.payload?.commentId,
        };
        commentVotesAdapter.removeOne(state, passedCommentVoteId);
      })
      .addCase(deleteCommentVote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(voteComment.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(voteComment.fulfilled, (state, action) => {
        if (!action?.payload) return;
        state.status = "success";
        const passedCommentVote = {
          commentVoteId: {
            userId: action.payload?.userId,
            commentId: action.payload?.commentId,
          },
          likeDislike: action.payload?.likeDislike,
        };
        commentVotesAdapter.upsertOne(state, passedCommentVote);
      });
  },
});

export const {
  selectAll: selectAllCommentVotes,
  selectById: selectByCommentVoteId,
  selectIds: selectAllVoteCommentIds,
} = commentVotesAdapter.getSelectors((state) => state.commentVotes);

export const commentVoteActions = commentVotesSlice.actions;
