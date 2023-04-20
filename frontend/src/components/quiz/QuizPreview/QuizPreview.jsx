/* eslint-disable no-unused-vars */
import './QuizPreview.css';
import { nanoid } from '@reduxjs/toolkit';
import 'react-circular-progressbar/dist/styles.css';

import { useSelector } from 'react-redux';
import { quizActions } from '../../../store/reducers/quiz-slice';
import usePaginationWithInfiniteScroll from '../../../hooks/use-pagination';
import { fetchQuizList } from '../../../services/quiz';
import QuizCard from './QuizCard';

export default function QuizDB({ quizList, status }) {
  const { quizListCurrPage, quizListTotalPages } = useSelector(
    (state) => state.quiz
  );
  const { lastElementChild } = usePaginationWithInfiniteScroll({
    totalPages: quizListTotalPages,
    currPage: quizListCurrPage,
    updateCurrPage: quizActions.updateQuizListCurrPage,
    itemId: '',
    itemName: '',
    fetchFunction: fetchQuizList,
    status,
  });

  return (
    <div className="row justify-content-around gy-5">
      {quizList.map(
        (
          {
            quizId,
            title,
            score,
            createdBy,
            description,
            picture,
            createdDate,
          },
          index
        ) => {
          if (index + 1 === quizList.length) {
            return (
              <div
                key={nanoid()}
                className="col-auto col-sm-12 col-md-12 col-lg-6 col-xl-4 gx-2"
                style={{ marginStart: 5 }}
              >
                <QuizCard
                  quizId={quizId}
                  title={title}
                  score={score}
                  createdBy={createdBy}
                  description={description}
                  picture={picture}
                  createdDate={createdDate}
                  lastElementChild={lastElementChild}
                />
              </div>
            );
          }
          return (
            <div
              key={nanoid()}
              className="col-auto col-sm-12 col-md-12 col-lg-6 col-xl-4 gx-2"
              style={{ marginStart: 5, marginBottom: 5 }}
            >
              <QuizCard
                quizId={quizId}
                title={title}
                score={score}
                createdBy={createdBy}
                description={description}
                picture={picture}
                createdDate={createdDate}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
