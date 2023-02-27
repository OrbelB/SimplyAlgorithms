// eslint-disable-next-line no-unused-vars
import { get, post, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/quiz';

export const quizEndpoints = {
  singleQuizById: (id, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    }),
  list: (page, size, filterBy) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list`, {
      params: page,
      size,
      filterBy,
    }),
  // CHECK
  listUserHistory: (userInfo, jwtAccessToken) =>
    get(
      `${PUBLIC_ENDPOINT_ROUTE}/user_history`,
      {
        page: userInfo?.page,
        size: userInfo?.size,
        userId: userInfo?.userId,
        byQuiz: userInfo?.byQiz,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  deleteALLUserTakenQuizzes: (takeQuiz, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/deleteALLUserTakenQuizzes`,
      {
        userId: takeQuiz?.userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  calculateAverageQuizScore: (quizDTO, jwtAccessToken) =>
    get(
      `${PUBLIC_ENDPOINT_ROUTE}/avgQuizScore`,
      {
        quizId: quizDTO?.quizId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  getAllUserQuizScore: (takeQuizDTO, jwtAccessToken) =>
    get(
      `${PUBLIC_ENDPOINT_ROUTE}/userQuizScore`,
      {
        quizId: takeQuizDTO?.quizId,
        userId: takeQuizDTO?.userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  createQuiz: (userDTO, quizDTO, quizQuestionDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create`,
      {
        userDTO,
        quizDTO,
        quizQuestionDTO,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  deleteQuiz: (quizId, userId, jwtAccessToken) =>
    destroy(
      `${PUBLIC_ENDPOINT_ROUTE}/delete`,
      {
        quizId,
        userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  updateFullQuiz: (userDTO, quizDTO, quizQuestionDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        userDTO,
        quizDTO,
        quizQuestionDTO,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  submitQuiz: (takeQuizDTO, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/submitQuiz`,
      {
        takeQuizDTO,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
};
