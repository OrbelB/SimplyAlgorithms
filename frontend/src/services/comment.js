import { createAsyncThunk } from '@reduxjs/toolkit';
import { commentEndpoints } from './Api/comment';

export const fetchChildrenComments = createAsyncThunk(
  'child/list',
  async (pageParams) => {
    const { page, size, parentCommentId } = pageParams;
    const response = await commentEndpoints.listChildren(
      page,
      size,
      parentCommentId
    );

    return response.data;
  }
);

export const createChildComment = createAsyncThunk(
  'childComment/create',
  async (passedCommentToSave) => {
    const { childComment, parentCommentId, accessToken } = passedCommentToSave;
    const response = await commentEndpoints.createChild(
      childComment,
      parentCommentId,
      accessToken
    );

    return response.data;
  }
);

export const createParentComment = createAsyncThunk(
  'parentComment/create',
  async (data) => {
    const { commentToSave, accessToken } = data;
    const response = await commentEndpoints.createParent(
      commentToSave,
      accessToken
    );

    return response.data;
  }
);

export const updateChildComment = createAsyncThunk(
  'ChildComment/update',
  async (passedCommentToUpdateParams) => {
    const { commentToUpdate, accessToken } = passedCommentToUpdateParams;
    const response = await commentEndpoints.update(
      commentToUpdate,
      accessToken
    );

    return response.data;
  }
);

export const updateParentComment = createAsyncThunk(
  'parentComment/update',
  async (updateCommentParams) => {
    const { accessToken, commentToUpdate } = updateCommentParams;
    const response = await commentEndpoints.update(
      commentToUpdate,
      accessToken
    );

    return response.data;
  }
);

export const deleteChildComment = createAsyncThunk(
  'childComment/delete',
  async (deleteParams) => {
    const { userId, commentId, accessToken } = deleteParams;
    const response = await commentEndpoints.delete(
      userId,
      commentId,
      accessToken
    );

    return response.data;
  }
);

export const deleteParentComment = createAsyncThunk(
  'parentComment/delete',
  async (deleteParams) => {
    const { userId, commentId, accessToken } = deleteParams;
    const response = await commentEndpoints.delete(
      userId,
      commentId,
      accessToken
    );

    return response.data;
  }
);
export const reportComment = createAsyncThunk(
  'comment/report',
  async (reportMade, accessToken) => {
    const response = await commentEndpoints.report(reportMade, accessToken);

    return response.data;
  }
);

export const listVotesByComment = createAsyncThunk(
  'commentVote/list',
  async (passedParams) => {
    const { pageId } = passedParams;
    const response = await commentEndpoints.listVotes(pageId);

    return response.data;
  }
);

export const deleteCommentVote = createAsyncThunk(
  'commentVote/delete',
  async (passedParams) => {
    const { userId, commentId, accessToken } = passedParams;
    const response = await commentEndpoints.deleteVote(
      userId,
      commentId,
      accessToken
    );

    return response.data;
  }
);

export const voteComment = createAsyncThunk(
  'comment/vote',
  async (passedParams) => {
    const { votedComment, accessToken } = passedParams;
    const response = await commentEndpoints.vote(votedComment, accessToken);
    return response.data;
  }
);
