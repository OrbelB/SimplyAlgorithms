/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quizDTO: {},
  quizQuestionDTO: [
    {
      questionId: '',
      quizId: '',
      question: '',
      picture: '',
      deleteQuestion: false,
      answers: [],
    },
  ],
  userDTO: {},
  status: 'idle',
  error: '',
  reportId: '',
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // what ever you are passing into the action their name should match
    updateQuestionProblem: (state, action) => {
      state.quizQuestionDTO.find(
        (question) => question.questionId === action.payload.questionId
      ).question = action.payload.question;
    },
    updateQuestionPicture: (state, action) => {
      state.quizQuestionDTO.find(
        (question) => question.questionId === action.payload.questionId
      ).picture = action.payload.picture;
    },
    updateQuestionDeleteTag: (state, action) => {
      state.quizQuestionDTO.find(
        (question) => question.questionId === action.payload.questionId
      ).deleteQuestion = action.payload.deleteQuestion;
    },
    updateQuestionAnswer: (state, action) => {
      state.quizQuestionDTO
        .find((question) => question.questionId === action.payload.questionId)
        .answers.find(
          (answer) => answer.answerId === action.payload.answerId
        ).answer = action.payload.answer;
    },
    updateQuestionAnswerIsCorrect: (state, action) => {
      state.quizQuestionDTO
        .find((question) => question.questionId === action.payload.questionId)
        .answers.find(
          (answer) => answer.answerId === action.payload.answerId
        ).isCorrect = action.payload.isCorrect;
    },
    updateQuizTitle: (state, action) => {
      state.quizDTO.title = action.payload.title;
    },
    updateQuizScore: (state, action) => {
      state.quizDTO.score = action.payload.score;
    },
  },
});
export const quizActions = quizSlice.actions;
