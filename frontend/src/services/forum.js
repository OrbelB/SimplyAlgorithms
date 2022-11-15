import { forumEndpoints } from "./Api/forum";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchForumList = createAsyncThunk(
  "forum/getList",
  async (pageParams) => {
    const { page, size, sortBy } = pageParams;
    const response = await forumEndpoints
      .list(page, size, sortBy)
      .catch((error) => {
        if (error?.response) {
          console.log(error.message);
          return error;
        }
      });
    return response.data;
  }
);

export const fetchForumsListByCategory = createAsyncThunk(
  "forum/getForumByCategory",
  async (pageParams) => {
    const { page, size, tagId } = pageParams;
    const response = await forumEndpoints
      .listByCategory(page, size, tagId)
      .catch((error) => {
        if (error?.response) {
          console.log(error.message);
          return error;
        }
      });
    return response.data;
  }
);

export const fetchSingleForum = createAsyncThunk(
  "forum/singleForum",
  async (pageId) => {
    const response = await forumEndpoints.singleById(pageId).catch((error) => {
      console.log(error?.message);
      return error;
    });
    return response.data;
  }
);

export const createForum = createAsyncThunk(
  "forum/create",
  async (passedParams) => {
    const { createdForum , accessToken } = passedParams;
    console.log(createdForum);
    const response = await forumEndpoints
      .create(createdForum, accessToken)
      .catch((error) => {
        console.log(error.message);
        return error;
      });
    return response.data;
  }
);

export const updateForum = createAsyncThunk(
  "forum/update",
  async (passedParams) => {
    const { updatedForum, accessToken } = passedParams;
    const response = await forumEndpoints
      .update(updatedForum, accessToken)
      .catch((error) => {
        console.log(error.message);
        return error;
      });
    return response.data;
  }
);

export const deleteForum = createAsyncThunk(
  "forum/delete",
  async (passedParams) => {
    const { pageId, userId, accessToken } = passedParams;
    const response = await forumEndpoints
      .delete(userId, pageId, accessToken)
      .catch((error) => {
        console.log(error.message);
        return error;
      });
    return response.data;
  }
);

export const voteForum = createAsyncThunk(
  "forum/vote",
  async (passedParams) => {
    const { voteObject, accessToken } = passedParams;
    const response = await forumEndpoints
      .vote(voteObject, accessToken)
      .catch((error) => {
        console.log(error.message);
        return error;
      });
    return response.data;
  }
);

export const reportForum = createAsyncThunk(
  "forum/report",
  async (passedParams) => {
    const { reportedPage, accessToken } = passedParams;
    const response = await forumEndpoints
      .report(reportedPage, accessToken)
      .catch((error) => {
        console.log(error.message);
        return error;
      });
    return response.data;
  }
);
