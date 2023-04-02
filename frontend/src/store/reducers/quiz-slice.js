/* eslint-disable no-multi-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {
  createQuiz,
  fetchQuizList,
  fetchSingleQuiz,
  updateQuiz,
  deleteQuiz,
  fetchUserHistory,
} from '../../services/quiz';

const firstId = crypto.randomUUID();
const initialState = {
  quizDTO: {},
  totalElements: undefined,
  quizQuestionDTO: [
    {
      questionId: firstId,
      quizId: '',
      question: '',
      picture: '',
      deleteQuestion: false,
      answers: [
        {
          questionId: firstId,
          answer: '',
          answerId: crypto.randomUUID(),
          isCorrect: 1,
        },
        {
          questionId: firstId,
          answer: '',
          answerId: crypto.randomUUID(),
          isCorrect: 0,
        },
      ],
    },
  ],
  userDTO: {},
  userHistory: [],
  userHistoryCurrPage: undefined,
  userHistoryTotalPages: undefined,
  quizListCurrPage: undefined,
  quizListTotalPages: undefined,
  status: 'idle',
  error: '',
  reportId: '',
  quizList: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetData: (state) => {
      state.userHistory = [];
      state.quizDTO = {};
      state.quizQuestionDTO = [
        {
          questionId: firstId,
          quizId: '',
          question: '',
          picture: '',
          deleteQuestion: false,
          answers: [
            {
              questionId: firstId,
              answer: '',
              answerId: crypto.randomUUID(),
              isCorrect: 1,
            },
            {
              questionId: firstId,
              answer: '',
              answerId: crypto.randomUUID(),
              isCorrect: 0,
            },
          ],
        },
      ];
      state.userDTO = {};
      state.totalElements = undefined;
      state.quizList = [];
      state.status = 'idle';
      state.error = '';
      state.reportId = '';
      state.userHistoryCurrPage = undefined;
      state.userHistoryTotalPages = undefined;
      state.quizListCurrPage = undefined;
      state.quizListTotalPages = undefined;
    },
    updateQuizListCurrPage: (state) => {
      state.quizListCurrPage += 1;
    },
    removeQuestionAnswer: (state, action) => {
      const { questionId, answerId } = action.payload;
      state.quizQuestionDTO.find(
        (question) => question.questionId === questionId
      ).answers = state.quizQuestionDTO
        .find((question) => question.questionId === questionId)
        .answers.filter((answer) => answer.answerId !== answerId);
    },
    addQuizQuestion: (state, action) => {
      state.quizQuestionDTO = state.quizQuestionDTO.concat({
        questionId: action.payload.questionId,
        quizId: action.payload.quizId,
        question: '',
        picture: '',
        deleteQuestion: false,
        answers: [
          {
            questionId: action.payload.questionId,
            answer: '',
            answerId: crypto.randomUUID(),
            isCorrect: 1,
          },
          {
            questionId: action.payload.questionId,
            answer: '',
            answerId: crypto.randomUUID(),
            isCorrect: 0,
          },
        ],
      });
    },
    addQuestionAnswer: (state, action) => {
      const { questionId, answerId } = action.payload;
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
    updateQuizTag: (state, action) => {
      state.quizDTO.tag = action.payload.tag;
    },
    updateQuestionAnswer: (state, action) => {
      const { questionId, answerId, answer: updatedAnswer } = action.payload;
      const answers = state.quizQuestionDTO
        .find((question) => question.questionId === questionId)
        .answers.map((answer) => {
          if (answer.answerId === answerId) {
            return { ...answer, answer: updatedAnswer };
          }
          return answer;
        });
      state.quizQuestionDTO.find(
        (question) => question.questionId === questionId
      ).answers = answers;
    },
    updateQuestionAnswerIsCorrect: (state, action) => {
      const {
        questionId,
        answerId,
        isCorrect: updatedIsCorrect,
      } = action.payload;
      const answers = state.quizQuestionDTO
        .find((question) => question.questionId === questionId)
        .answers.map((answer) => {
          if (answer.answerId === answerId) {
            return { ...answer, isCorrect: updatedIsCorrect };
          }
          return { ...answer, isCorrect: updatedIsCorrect === 0 ? 1 : 0 };
        });
      state.quizQuestionDTO.find(
        (question) => question.questionId === questionId
      ).answers = answers;
    },
    updateQuizTitle: (state, action) => {
      state.quizDTO.title = action.payload.title;
    },
    updateQuizScore: (state, action) => {
      state.quizDTO.score = action.payload.score;
    },
    deleteQuestion: (state, action) => {
      state.quizQuestionDTO = state.quizQuestionDTO.filter(
        (question) => question.questionId !== action.payload.questionId
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuizList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizList.fulfilled, (state, action) => {
        state.status = 'success';

        // add the previous state to the new state if it is not a duplicate
        state.quizList = action.payload.content.concat(
          state.quizList.filter((quiz) => {
            return !action.payload.content.find(
              (quiz2) => quiz2.quizId === quiz.quizId
            );
          })
        );
        state.quizListCurrPage = action.payload.pageNumber;
        state.quizListTotalPages = action.payload.totalPages;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchQuizList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleQuiz.fulfilled, (state, action) => {
        state.status = 'success';
        state.quizDTO = action.payload.quizDTO;
        state.quizQuestionDTO = action.payload.quizQuestionDTO;
        state.userDTO = action.payload.userDto;
      })
      .addCase(fetchSingleQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        if (!action.payload.content) return;
        state.status = 'success';
        state.userHistory = state.userHistory.concat(action.payload.content);
        state.userHistoryCurrPage = action.payload.pageNumber;
        state.userHistoryTotalPages = action.payload.totalPages;
      });
  },
});
export const quizActions = quizSlice.actions;
