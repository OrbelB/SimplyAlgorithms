/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import {
  fetchChildrenComments,
  updateChildComment,
  deleteChildComment,
  createChildComment,
} from '../../services/comment';

const commentAdapter = createEntityAdapter({
  selectId: (a) => a.comment.commentId,
});

const initialState = commentAdapter.getInitialState({
  error: '',
  status: 'idle',
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetData: (state) => {
      commentAdapter.removeAll(state);
      state.error = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildrenComments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChildrenComments.fulfilled, (state, action) => {
        state.status = 'success';
        const childrenComments = action.payload?.content?.map((comment) => {
          comment.parentCommentId = comment?.rootId;
          comment.comment.createdDate = new Date(
            comment?.comment?.createdDate
          ).toISOString();
          return comment;
        });
        commentAdapter.upsertMany(state, childrenComments);
      })
      .addCase(fetchChildrenComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(createChildComment.fulfilled, (state, action) => {
        if (!action?.payload?.comment?.commentId) return;
        state.status = 'success';
        const newCreatedChildComment = {
          parentCommentId: action.payload.rootId,
          comment: {
            ...action.payload.comment,
            createdDate: new Date(
              action.payload.comment.createdDate
            ).toISOString(),
          },
        };
        commentAdapter.addOne(state, newCreatedChildComment);
      })
      .addCase(createChildComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateChildComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateChildComment.fulfilled, (state, action) => {
        if (!action?.payload?.comment?.commentId) {
          return;
        }
        state.status = 'success';
        const updatedComment = {
          parentCommentId: action.payload.rootId,
          comment: {
            ...action.payload.comment,
            createdDate: new Date(
              action.payload.comment.createdDate
            ).toISOString(),
          },
        };
        commentAdapter.upsertOne(state, updatedComment);
      })
      .addCase(deleteChildComment.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.status = 'success';
        commentAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteChildComment.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  selectAll: selectAllChildrenComments,
  selectById: selectByParentCommentId,
  selectIds: selectAllChildrenCommentsIds,
} = commentAdapter.getSelectors((state) => state.comment);

export const selectChildrenCommentsByParentCommentId = createSelector(
  [selectAllChildrenComments, (state, parentCommentId) => parentCommentId],
  (childrenComments, parentCommentId) =>
    childrenComments.filter(
      (childComment) => childComment.parentCommentId === parentCommentId
    )
);
export const commentActions = commentSlice.actions;
