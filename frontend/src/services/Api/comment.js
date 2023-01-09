/* eslint-disable prefer-template */
import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/comments';

export const commentEndpoints = {
  listChildren: (page, size, parentCommentId) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list-child-comments`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
        parentCommentId,
      },
    }),
  createParent: (commentToSave, accessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create-parent-comment`,
      {
        commentId: commentToSave?.commentId,
        pageId: commentToSave?.pageId,
        commentText: commentToSave?.commentText,
        userId: commentToSave?.userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  createChild: (commentToSave, parentCommentId, accessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create-child-comment`,
      {
        parentCommentId,
        childComment: {
          pageId: commentToSave?.pageId,
          commentText: commentToSave?.commentText,
          userId: commentToSave?.userId,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  update: (commentToUpdate, accessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        commentId: commentToUpdate?.commentId,
        pageId: commentToUpdate?.pageId,
        commentText: commentToUpdate?.commentText,
        userId: commentToUpdate?.userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  delete: (userId, commentId, accessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      params: {
        userId,
        commentId,
      },
    }),
  vote: (votedComment, accessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/vote`,
      {
        commentId: votedComment?.commentId,
        userId: votedComment?.userId,
        likeDislike: votedComment?.likeDislike,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  report: (reportMade, accessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/report`,
      {
        userId: reportMade?.userId,
        reportMessage: reportMade?.reportMessage,
        commentId: reportMade?.commentId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  deleteVote: (userId, commentId, accessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete-vote`, {
      params: {
        userId,
        commentId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }),
  listVotes: (pageId) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/votes`, {
      params: {
        pageId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
