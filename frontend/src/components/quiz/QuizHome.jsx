import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import QuizPreview from './QuizPreview/QuizPreview';
import './QuizHome.css';

import SelectionList from '../selector';
import useSearchBar from '../../hooks/use-searchBar';
import useSortBy from '../../hooks/use-sortBy';
import { quizActions } from '../../store/reducers/quiz-reducer';
import { fetchQuizList } from '../../services/quiz';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';

const SORTING_OPTIONS = ['Created Date', 'Alphabetical'];
const SELECTED_TOPIC_QUIZ = [{ index: 1, topic: 'Topic 1' }];

export default function Quizhome() {
  const dispatch = useDispatch();
  const { status, quizList, totalElements } = useSelector(
    (state) => state.quiz
  );
  const [selection, setSelection] = useState('');
  const { handleSortBy } = useSortBy({ actionToDispatch: fetchQuizList });
  const navigate = useNavigate();
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const isTeacher = useJwtPermssionExists({ permission: 'ROLE_TEACHER' });

  // handles search bar logic
  const { handleSearch: handleSearchQuiz, searchResults: searchQuizzes } =
    useSearchBar({
      searchFrom: quizList,
      valueSearched: 'title',
      actionToDispatch: fetchQuizList,
      debounceTime: 500,
    });

  useEffect(() => {
    if (
      status === 'idle' ||
      (status === 'success' &&
        quizList.length === 0 &&
        totalElements === undefined)
    ) {
      dispatch(
        fetchQuizList({
          page: 0,
          size: 20,
        })
      );
    }
  }, [status, quizList, dispatch, totalElements]);

  return (
    <div>
      <div className="p-5 top-quizhome">
        <div className="row justify-content-center">
          <h1 className="quiz-logo">Quizzes</h1>
          <div className="form-outline w-50 mb-5">
            <input
              onChange={handleSearchQuiz}
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search Here..."
              aria-label="Search"
            />
          </div>
        </div>
      </div>
      <div className="p-5 bottom-quizhome">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto p-0 m-0">
            {SELECTED_TOPIC_QUIZ.map(({ index, topic }) => {
              return (
                <div key={`${topic} ${index}`}>
                  <h5>Topic: {topic}</h5>
                </div>
              );
            })}
          </div>
          <div className="col-4 p-0 m-0 text-start">
            <SelectionList
              label="Sort By"
              options={SORTING_OPTIONS}
              setValue={setSelection}
              value={selection}
              handleAction={handleSortBy}
            />
          </div>
          {(isAdmin || isTeacher) && (
            <div className="col-4 text-end">
              <button
                type="button"
                className="quizstart"
                onClick={() => {
                  navigate('createquiz');
                  dispatch(quizActions.resetData());
                }}
              >
                create quiz
              </button>
            </div>
          )}
        </div>
        <div className="mt-5">
          <QuizPreview quizList={searchQuizzes} status={status} />
        </div>
      </div>
    </div>
  );
}
