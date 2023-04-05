/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import { quizEndpoints } from './Api/quiz';

export const fetchSingleQuiz = createAsyncThunk(
  'quiz/SingleQuiz',
  async (passedParams) => {
    const { quizId, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.singleQuizById(quizId, jwtAccessToken);
    return response.data;
  }
);

export const fetchQuizList = createAsyncThunk(
  'quiz/list',
  async (pageParams) => {
    const { page, size, filterBy, sortBy } = pageParams;
    const response = await quizEndpoints.list(page, size, filterBy, sortBy);
    return response.data;
  }
);

export const fetchUserHistory = createAsyncThunk(
  'quiz/user-history',
  async (passedParams) => {
    const { page, size, userId, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.listUserHistory(
      page,
      size,
      userId,
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
    const { userDto, quizDTO, quizQuestionDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.createQuiz(
      userDto,
      quizDTO,
      quizQuestionDTO,
      jwtAccessToken
    );

    return response.data;
  }
);

export const deleteQuiz = createAsyncThunk(
  'quiz/delete',
  async (passedParams) => {
    const { quizId, userId, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.deleteQuiz(
      quizId,
      userId,
      jwtAccessToken
    );

    return response.data;
  }
);

export const updateQuiz = createAsyncThunk(
  'quiz/update',
  async (passedParams) => {
    const { userDto, quizDTO, quizQuestionDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.updateFullQuiz(
      userDto,
      quizDTO,
      quizQuestionDTO,
      jwtAccessToken
    );

    return response.data;
  }
);

export const submitQuiz = createAsyncThunk(
  'quiz/submitQuiz',
  async (passedParams) => {
    const { takeQuizDTO, jwtAccessToken } = passedParams;
    const response = await quizEndpoints.submitQuiz(
      takeQuizDTO,
      jwtAccessToken
    );

    return response.data;
  }
);
