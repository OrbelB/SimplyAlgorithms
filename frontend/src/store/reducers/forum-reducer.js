import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSingleForum,
  reportForum,
  createForum,
  deleteForum,
  updateForum,
  voteForum,
} from "../../services/forum";
import {
  createParentComment,
  deleteParentComment,
  updateParentComment,
} from "../../services/comment";
const initialState = {
  forum: {},
  pageId: "",
  status: "idle",
  error: "",
};

export const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    resetData: (state) => {
      state.forum = {};
      state.status = "idle";
      state.error = "";
      state.pageId = "";
    },
    addSingleReply: (state, action) => {
      state.forum.comments = state.forum.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount = comment.replyCount + 1;
          return comment;
        }
        return comment;
      });
    },
    removeSingleReply: (state, action) => {
      state.forum.comments = state.forum.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount = comment.replyCount - 1;
          return comment;
        }
        return comment;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSingleForum.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchSingleForum.fulfilled, (state, action) => {
        state.status = "success";
        console.log("check");
        console.log(action.payload);
        state.forum = {
          ...action.payload,
          createdDate: new Date(action.payload.createdDate).toISOString(),
        };
        state.pageId = "";
      })
      .addCase(fetchSingleForum.rejected, (state, action) => {
        state.status = "failed";
        console.log("check");
        state.error = action?.error?.message;
      })
      .addCase(createParentComment.fulfilled, (state, action) => {
        if (!action?.payload?.rootId) {
          console.log("Comment id not provided");
          return;
        }

        const pageId = action.payload.rootId;
        const commentToConcat = {
          ...action?.payload?.comment,
          createdDate: new Date(
            action.payload.comment.createdDate
          ).toISOString(),
        };
        if (pageId !== state.forum?.pageId) return;
        state.forum.comments = state.forum.comments.concat(commentToConcat);
      })
      .addCase(deleteParentComment.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("delete could not be done");
          return;
        } else {
          console.log("delete performed");
          state.forum.comments = state.forum.comments.filter(
            (comment) => comment.commentId !== action.payload
          );
        }
      })
      .addCase(updateParentComment.fulfilled, (state, action) => {
        if (!action?.payload?.comment?.commentId) {
          console.log("The update could not be done");
          console.log(action.payload);
          return;
        }
        const updatedComment = {
          ...action.payload?.comment,
          createdDate: new Date(
            action.payload.comment.createdDate
          ).toISOString(),
        };
        state.forum.comments = state.forum.comments.map((comment) => {
          if (comment.commentId !== updatedComment.commentId) return comment;
          return updatedComment;
        });
      })
      .addCase(createForum.fulfilled, (state, action) => {
        if (!action?.payload) {
          console.log("nothing passed");
          return;
        }
        state.status = "successToIdle";
        state.pageId = action.payload;
      }).addCase(deleteForum.fulfilled, (state, action) => {
        if (action?.payload) {
          return;
        }
        if (state.forum.pageId === action?.payload) {
          state.forum = {};
          state.status = "idle";
          state.error = "";
          state.pageId = "";
        }
      })
      .addCase(updateForum.pending, (state, action) => {
        state.forum = "pending";
      })
      .addCase(updateForum.fulfilled, (state, action) => {
        state.status = "success";
        console.log("check");
        console.log(action.payload);
        state.forum = {
          ...action.payload,
          createdDate: new Date(action.payload.createdDate).toISOString(),
        };
      })
      .addCase(updateForum.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const forumActions = forumSlice.actions;
