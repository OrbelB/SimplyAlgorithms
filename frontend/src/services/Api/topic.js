/* eslint-disable prefer-template */
import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/topics';

export const topicEndpoints = {
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
  create: (topic, jwtAccessToken) =>
    post(`${PUBLIC_ENDPOINT_ROUTE}/create`, topic, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  update: (updatedTopic, jwtAccessToken) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/update`, updatedTopic, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
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
  vote: (voteObject, accessToken) =>
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
          Authorization: 'Bearer ' + accessToken,
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
        pageId: passedParams?.pageId,
        userId: passedParams?.userId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + passedParams.jwtAccessToken,
      },
    }),
  getAvailablePages: () =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/available-pages`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  nameIsAvailable: (name, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/name/available`, {
      params: {
        name,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
};
