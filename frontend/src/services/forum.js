import { createAsyncThunk } from '@reduxjs/toolkit';
import { forumEndpoints } from './Api/forum';

export const fetchForumList = createAsyncThunk(
  'forum/getList',
  async (pageParams) => {
    const { page, size, sortBy, filterBy, tagId, title } = pageParams;
    const response = await forumEndpoints.list(
      page,
      size,
      sortBy,
      filterBy,
      title,
      tagId
    );

    return response.data;
  }
);

export const fetchForumsListByCategory = createAsyncThunk(
  'forum/getForumByCategory',
  async (pageParams) => {
    const { page, size, tagId } = pageParams;
    const response = await forumEndpoints.listByCategory(page, size, tagId);
    return response.data;
  }
);

export const fetchSingleForum = createAsyncThunk(
  'forum/singleForum',
  async (pageId) => {
    const response = await forumEndpoints.singleById(pageId);
    return response.data;
  }
);

export const createForum = createAsyncThunk(
  'forum/create',
  async (passedParams) => {
    const { createdForum, accessToken } = passedParams;
    const response = await forumEndpoints
      .create(createdForum, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const updateForum = createAsyncThunk(
  'forum/update',
  async (passedParams) => {
    const { updatedForum, accessToken } = passedParams;
    const response = await forumEndpoints
      .update(updatedForum, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const deleteForum = createAsyncThunk(
  'forum/delete',
  async (passedParams) => {
    const { pageId, userId, accessToken } = passedParams;
    const response = await forumEndpoints
      .delete(userId, pageId, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const voteForum = createAsyncThunk(
  'forum/vote',
  async (passedParams) => {
    const { voteObject, accessToken } = passedParams;
    const response = await forumEndpoints
      .vote(voteObject, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const reportForum = createAsyncThunk(
  'forum/report',
  async (passedParams) => {
    const { reportedPage, accessToken } = passedParams;
    const response = await forumEndpoints
      .report(reportedPage, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const addUserView = createAsyncThunk(
  'forums/view',
  async (passedParams) => {
    const { pageId, userId, accessToken } = passedParams;
    const response = await forumEndpoints.viewed(pageId, userId, accessToken);
    return response.data;
  }
);

export const fetchUserForumsViewed = createAsyncThunk(
  'forums/list/view',
  async (passedParams) => {
    const response = await forumEndpoints.listForumViewed(passedParams);
    return response.data;
  }
);

export const fetchVotes = createAsyncThunk(
  'forum/list-votes',
  async (passedParams) => {
    const response = await forumEndpoints.listVotes(passedParams);
    return response.data;
  }
);

export const deleteForumVote = createAsyncThunk(
  'forum/delete-vote',
  async (passedParams) => {
    const response = await forumEndpoints.deleteVote(passedParams);
    return response.data;
  }
);
