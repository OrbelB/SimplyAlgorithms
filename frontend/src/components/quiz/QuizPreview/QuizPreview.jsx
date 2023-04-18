/* eslint-disable no-unused-vars */
import './QuizPreview.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { quizActions } from '../../../store/reducers/quiz-slice';
import usePaginationWithInfiniteScroll from '../../../hooks/use-pagination';
import { fetchQuizList } from '../../../services/quiz';

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
  const dispatch = useDispatch();

  if (status === 'success') {
    return (
      <div className="flex d-flex flex-wrap justify-content-around g-0 mt-5">
        {quizList.map(
          (
            { quizId, title, description, picture, score, createdBy },
            index
          ) => {
            if (index + 1 === quizList.length) {
              description = description.slice(0, 256) + '...';
              return (
                <NavLink
                  ref={lastElementChild}
                  key={() => nanoid()}
                  className="nav-hover"
                  aria-current="page"
                  to={quizId}
                  onClick={() => dispatch(quizActions.resetData())}
                >
                  <div className="card quizpreview p-3 w-75 m-4">
                    <div className="container-fluid">
                      <div className="row">
                        <h5 className="text-center display-5 mb-2">{title}</h5>
                      </div>
                      <div className="row">
                        <p className="text-center">
                          Created By {createdBy.username}
                        </p>
                        <p className="text-center">Max Score: {score}</p>
                      </div>
                      <div className="row text-center">{description}</div>
                      <div>
                        <Avatar
                          sx={{ width: 250, height: 250 }}
                          src={picture}
                          className="mx-auto my-3"
                          alt="quiz picture"
                          loading="lazy"
                          variant="rounded"
                        />
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            }
            return (
              <NavLink
                key={() => nanoid()}
                className="nav-hover"
                aria-current="page"
                to={quizId}
                onClick={() => dispatch(quizActions.resetData())}
              >
                <div className="card quizpreview p-3 w-75 m-4">
                  <div className="container-fluid">
                    <div className="row">
                      <h5>{title}</h5>
                    </div>
                    <div className="row">
                      <p>Created By {createdBy.username}</p>
                    </div>
                    <div className="row">
                      <div className="col-5">
                        {/* <CircularProgressbar
                        value={score}
                        text={`${score}%`}
                        strokeWidth="10"
                        styles={buildStyles({
                          strokeLinecap: 'round',
                          textSize: '18px',
                          pathColor: `#0000FF`,
                          textColor: 'black',
                          trailColor: 'darkgray',
                        })}
                      /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          }
        )}
      </div>
    );
  }
}
