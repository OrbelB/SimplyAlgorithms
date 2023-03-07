import { createAsyncThunk } from '@reduxjs/toolkit';
import { topicEndpoints } from './Api/topic';

export const fetchTopicList = createAsyncThunk(
  'topic/getList',
  async (pageParams) => {
    const { page, size, sortBy } = pageParams;
    const response = await topicEndpoints
      .list(page, size, sortBy)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const fetchSingleTopic = createAsyncThunk(
  'topic/singleTopic',
  async (pageId) => {
    const response = await topicEndpoints.singleById(pageId).catch((error) => {
      return error;
    });
    return response.data;
  }
);

export const createTopic = createAsyncThunk(
  'topic/create',
  async (passedParams) => {
    const { createdTopic, accessToken } = passedParams;
    const response = await topicEndpoints
      .create(createdTopic, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const updateTopic = createAsyncThunk(
  'topic/update',
  async (passedParams) => {
    const { updatedTopic, accessToken } = passedParams;
    const response = await topicEndpoints
      .update(updatedTopic, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const deleteTopic = createAsyncThunk(
  'topic/delete',
  async (passedParams) => {
    const { pageId, userId, accessToken } = passedParams;
    const response = await topicEndpoints
      .delete(userId, pageId, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const voteTopic = createAsyncThunk(
  'topic/vote',
  async (passedParams) => {
    const { voteObject, accessToken } = passedParams;
    const response = await topicEndpoints
      .vote(voteObject, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const reportTopic = createAsyncThunk(
  'topic/report',
  async (passedParams) => {
    const { reportedPage, accessToken } = passedParams;
    const response = await topicEndpoints
      .report(reportedPage, accessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const fetchVotes = createAsyncThunk(
  'topic/list-votes',
  async (passedParams) => {
    const response = await topicEndpoints.listVotes(passedParams);
    return response.data;
  }
);

export const deleteTopicVote = createAsyncThunk(
  'topic/delete-vote',
  async (passedParams) => {
    const response = await topicEndpoints.deleteVote(passedParams);
    return response.data;
  }
);

export const fetchTopicNames = createAsyncThunk(
  'topic/list-names',
  async () => {
    const response = await topicEndpoints.getAvailablePages();
    return response.data;
  }
);

export const getNameAvailability = createAsyncThunk(
  'topic/name-availability',
  async (passedParams) => {
    const { name, jwtAccessToken } = passedParams;
    const response = await topicEndpoints.nameIsAvailable(name, jwtAccessToken);
    return response.data;
  }
);
