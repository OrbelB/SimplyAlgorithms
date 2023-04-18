import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { Map } from 'immutable';
import {
  fetchParentComments,
  createParentComment,
  deleteParentComment,
  updateParentComment,
  fetchChildrenComments,
  updateChildComment,
  deleteChildComment,
  createChildComment,
} from '../../services/comment';

const commentAdapter = createEntityAdapter({
  selectId: (a) => a.comment.commentId,
});

const initialState = commentAdapter.getInitialState({
  commentParents: [],
  commentParentCurrPage: 0,
  commentParentsTotalPages: undefined,
  commentChildrenTotalPages: Map(),
  commentChildrenCurrPages: Map(),
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
      state.commentParentCurrPage = 0;
      state.commentParentsTotalPages = undefined;
      state.commentChildrenTotalPages = Map();
      state.commentChildrenCurrPages = Map();
      state.commentParents = [];
    },
    updateCurrentParentPage: (state) => {
      state.commentParentCurrPage += 1;
    },
    updateCurrentChildrenPage: (state, action) => {
      state.commentChildrenCurrPages = state.commentChildrenCurrPages.set(
        action.payload.parentCommentId,
        action.payload.commentChildrenCurrPage + 1
      );
    },
    addSingleReply: (state, action) => {
      const commentId = action.payload?.commentId;
      state.commentParents = state.commentParents.map((comment) => {
        if (comment.commentId === commentId) {
          comment.replyCount += 1;
          return comment;
        }
        return comment;
      });
    },
    removeSingleReply: (state, action) => {
      const commentId = action.payload?.commentId;
      state.commentParents = state.commentParents.map((comment) => {
        if (comment.commentId === commentId) {
          comment.replyCount -= 1;
          return comment;
        }
        return comment;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildrenComments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChildrenComments.fulfilled, (state, action) => {
        state.status = 'success';
        const { rootId } = action.payload.content[0];
        const { number, totalPages } = action.payload;
        if (
          number === 0 &&
          state.commentChildrenCurrPages.get(String(rootId)) === undefined
        ) {
          state.commentChildrenCurrPages = state.commentChildrenCurrPages.set(
            String(rootId),
            number
          );
        }
        state.commentChildrenTotalPages = state.commentChildrenTotalPages.set(
          String(rootId),
          totalPages
        );
        const childrenComments = action.payload?.content?.map((comment) => {
          comment.parentCommentId = comment?.rootId;
          comment.comment.createdDate = new Date(
            comment?.comment?.createdDate
          ).toISOString();
          return comment;
        });
        commentAdapter.setMany(state, childrenComments);
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
      })
      .addCase(fetchParentComments.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchParentComments.fulfilled, (state, action) => {
        const parentComments = action.payload?.content?.map((comment) => {
          // console.info('action.payload', comment);
          comment.createdDate = new Date(comment?.createdDate).toISOString();
          return comment;
        });
        state.commentParentsTotalPages = action.payload?.totalPages;

        // for every new parent comment in parentComments array
        // check if it is already in the state
        // if it is, then update it
        // if it is not, then add it
        state.commentParents = state.commentParents.map((comment) => {
          const foundComment = parentComments.find(
            (c) => c.commentId === comment.commentId
          );
          if (foundComment) {
            return foundComment;
          }
          return comment;
        });

        // add new parent comments to the state with no duplicates
        state.commentParents = [
          ...state.commentParents,
          ...parentComments.filter(
            (comment) =>
              !state.commentParents.find(
                (c) => c.commentId === comment.commentId
              )
          ),
        ];

        state.status = 'success';
      })
      .addCase(fetchParentComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error.message;
      })
      .addCase(updateParentComment.fulfilled, (state, action) => {
        if (!action?.payload?.comment?.commentId) {
          return;
        }
        state.status = 'success';
        const updatedComment = {
          ...action.payload.comment,
          createdDate: new Date(
            action.payload.comment.createdDate
          ).toISOString(),
        };

        state.commentParents = state.commentParents.map((comment) => {
          if (comment.commentId === updatedComment.commentId) {
            return updatedComment;
          }
          return comment;
        });
      })
      .addCase(updateParentComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteParentComment.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.status = 'success';
        state.commentParents = state.commentParents.filter(
          (comment) => comment.commentId !== action.payload
        );
      })
      .addCase(deleteParentComment.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createParentComment.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createParentComment.fulfilled, (state, action) => {
        if (!action?.payload?.rootId) {
          return;
        }
        state.status = 'success';
        const commentToConcat = {
          ...action?.payload?.comment,
          pageId: action.payload.rootId,
          createdDate: new Date(
            action.payload.comment.createdDate
          ).toISOString(),
        };
        // add the new comment to the beginning of the array
        state.commentParents = [commentToConcat].concat(state.commentParents);
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
