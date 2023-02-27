/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import { quizEndpoints } from './Api/quiz';

export const fetchSingleQuiz = createAsyncThunk(
  'quiz/SingleQuiz',
  async (quizId) => {
    const response = await quizEndpoints.singleQuizById(quizId);
    return response.data;
  }
);

export const fetchQuizList = createAsyncThunk(
  'quiz/list',
  async (pageParams) => {
    const { page, size, filterBy } = pageParams;
    const response = await quizEndpoints.list(page, size, filterBy);
    return response.data;
  }
);

export const fetchUserHistory = createAsyncThunk(
  'quiz/user_history',
  async (passedParams) => {
    const { userInfo, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.listUserHistory(
      userInfo,
      jwtAccessToken
    );
    return response.data;
  }
);

export const deleteAllUserHistory = createAsyncThunk(
  'quiz/deleteALLUserTakenQuizzes',
  async (passedParams) => {
    const { takeQuiz, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.deleteALLUserTakenQuizzes(
      takeQuiz,
      jwtAccessToken
    );
    return response.data;
  }
);

export const calcAvgQuizScore = createAsyncThunk(
  'quiz/avgQuizScore',
  async (passedParams) => {
    const { quizDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.calculateAverageQuizScore(
      quizDTO,
      jwtAccessToken
    );
    return response.data;
  }
);

export const fetchAllUserQuizScore = createAsyncThunk(
  'quiz/userQuizScore',
  async (passedParams) => {
    const { takeQuizDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.getAllUserQuizScore(
      takeQuizDTO,
      jwtAccessToken
    );
    return response.data;
  }
);

export const createQuiz = createAsyncThunk(
  'quiz/create',
  async (passedParams) => {
    const { userDTO, quizDTO, quizQuestionDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints
      .createQuiz(userDTO, quizDTO, quizQuestionDTO, jwtAccessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (passedParams) => {
    const { quizId, userId, jwtAccessToken } = passedParams;
    const response = await quizEndpoints
      .deleteQuiz(quizId, userId, jwtAccessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const updateQuiz = createAsyncThunk(
  'quiz/update',
  async (passedParams) => {
    const { userDTO, quizDTO, quizQuestionDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints
      .updateFullQuiz(userDTO, quizDTO, quizQuestionDTO, jwtAccessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async (passedParams) => {
    const { takeQuizDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints
      .submitQuiz(takeQuizDTO, jwtAccessToken)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);
