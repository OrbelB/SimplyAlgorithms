/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  quizDTO: {},
  quizQuestionDTO: [
    {
      questionId: nanoid(),
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
    addQuizQuestion: (state, action) => {
      state.quizQuestionDTO = state.quizQuestionDTO.concat({
        questionId: action.payload.questionId,
        quizId: '',
        question: '',
        picture: '',
        deleteQuestion: false,
        answers: [],
      });
    },
    addQuestionAnswer: (state, action) => {
      const { questionId, answerId } = action.payload;
      console.info(action.payload);
      state.quizQuestionDTO.find(
        (question) => question.questionId === questionId
      ).answers = state.quizQuestionDTO
        .find((question) => question.questionId === questionId)
        .answers.concat({
          questionId,
          answer: '',
          answerId,
          isCorrect: false,
        });
      // console.info(temp);

      console.info(
        state.quizQuestionDTO.find(
          (question) => question.questionId === questionId
        ).answers.length
      );
    },
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
