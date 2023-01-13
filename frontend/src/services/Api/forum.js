/* eslint-disable prefer-template */
import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/forums';

export const forumEndpoints = {
  singleById: (id) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  list: (page, size, sortBy) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list`, {
      params: {
        page,
        size,
        sortBy,
      },
    }),
  listByCategory: (pageId, size, tagId) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/by-category`, {
      params: {
        pageId,
        size,
        tagId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  create: (createdForum, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create`,
      {
        descriptionText: createdForum?.descriptionText,
        title: createdForum?.title,
        photo: createdForum?.photo,
        video: createdForum?.video,
        userDto: {
          userId: createdForum?.userDto?.userId,
        },
        tags: createdForum?.tags,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  update: (updatedForum, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        pageId: updatedForum?.pageId,
        descriptionText: updatedForum?.descriptionText,
        title: updatedForum?.title,
        createdDate: updatedForum?.createdDate,
        photo: updatedForum?.photo,
        video: updatedForum?.video,
        upVotes: updatedForum?.upVotes,
        downVotes: updatedForum?.downVotes,
        userDto: {
          userId: updatedForum?.userDto.userId,
        },
        tags: updatedForum?.tags,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  delete: (userId, pageId, jwtAccessToken) => {
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
      params: {
        userId,
        pageId,
      },
    });
  },
  vote: (voteObject, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/vote`,
      {
        userId: voteObject?.userId,
        pageId: voteObject?.pageId,
        likeDislike: voteObject?.likeDislike,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  report: (reportedPage, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/report`,
      {
        pageId: reportedPage?.pageId,
        userId: reportedPage?.userId,
        reportMessage: reportedPage?.reportMessage,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtAccessToken,
        },
      }
    ),
  viewed: (pageId, userId, accessToken) =>
    post(`${PUBLIC_ENDPOINT_ROUTE}/view`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      params: {
        userId,
        pageId,
      },
    }),
  listForumViewed: (passedParams) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/forums-view`, {
      params: {
        userId: passedParams?.userId,
        page: passedParams?.page,
        size: passedParams?.size,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  deleteVote: (passedParams) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete-vote`, {
      params: {
        pageId: passedParams?.pageId,
        userId: passedParams?.userId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + passedParams.accessToken,
      },
    }),
  listVotes: (passedParams) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/votes`, {
      params: {
        pageId: passedParams.pageId,
        userId: passedParams.userId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + passedParams.accessToken,
      },
    }),
};
