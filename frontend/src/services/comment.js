import { createAsyncThunk } from "@reduxjs/toolkit";
import { commentEndpoints } from "./Api/comment";
export const fetchChildrenComments = createAsyncThunk(
  "child/list",
  async (pageParams) => {
    const { page, size, parentCommentId } = pageParams;
    const response = await commentEndpoints
      .listChildren(page, size, parentCommentId)
      .catch((error) => {
        if (error) {
          console.log(error?.message);
          return error;
        }
      });
    return response.data;
  }
);

export const createChildComment = createAsyncThunk(
  "childComment/create",
  async (passedCommentToSave) => {
    const {childComment, parentCommentId, accessToken} = passedCommentToSave;
    const response = await commentEndpoints
      .createChild(childComment, parentCommentId, accessToken)
      .catch((error) => {
        if (error) return error;
      });
    return response.data;
  }
);

export const createParentComment = createAsyncThunk(
  "parentComment/create",
  async (data) => {
    const { commentToSave, accessToken } = data;
    const response = await commentEndpoints
      .createParent(commentToSave, accessToken)
      .catch((error) => {
        if (error) return error;
      });

    return response.data;
  }
);

export const updateChildComment = createAsyncThunk(
  "ChildComment/update",
  async (passedCommentToUpdateParams) => {
    const {commentToUpdate, accessToken} = passedCommentToUpdateParams;
    const response = await commentEndpoints
      .update(commentToUpdate, accessToken)
      .catch((error) => {
        if (error) return error;
      });
    return response.data;
  }
);

export const updateParentComment = createAsyncThunk(
  "parentComment/update",
  async (updateCommentParams) => {
    const {accessToken, commentToUpdate} = updateCommentParams
    const response = await commentEndpoints
      .update(commentToUpdate, accessToken)
      .catch((error) => {
        if (error) return error;
      });
    return response.data;
  }
);

export const deleteChildComment = createAsyncThunk(
  "childComment/delete",
  async (deleteParams) => {
    const {userId, commentId, accessToken} = deleteParams;
    const response = await commentEndpoints
      .delete(userId, commentId, accessToken)
      .catch((error) => {
        if (error) return error;
      });

    return response.data;
  }
);

export const deleteParentComment = createAsyncThunk(
  "parentComment/delete",
  async (deleteParams) => {
    const { userId, commentId, accessToken } = deleteParams;
    const response = await commentEndpoints
      .delete(userId, commentId, accessToken)
      .catch((error) => {
        if (error) return error;
      });
    return response.data;
  }
);
export const reportComment = createAsyncThunk(
  "comment/report",
  async (reportMade, accessToken) => {
    const response = await commentEndpoints
      .report(reportMade, accessToken)
      .catch((error) => {
        if (error) return error;
      });

    return response.data;
  }
);
