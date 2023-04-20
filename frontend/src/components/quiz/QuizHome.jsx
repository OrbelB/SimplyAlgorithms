/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import QuizPreview from './QuizPreview/QuizPreview';
import './QuizHome.css';

import SelectionList from '../selector';
import useSearchBar from '../../hooks/use-searchBar';
import useSortBy from '../../hooks/use-sortBy';
import { fetchQuizList } from '../../services/quiz';

const SORTING_OPTIONS = ['Created Date', 'Alphabetical'];
// const SELECTED_TOPIC_QUIZ = [{ index: 1, topic: 'Topic 1' }];

export default function Quizhome() {
  const dispatch = useDispatch();
  const { status, quizList, totalElements } = useSelector(
    (state) => state.quiz
  );
  const [selection, setSelection] = useState('');
  const { handleSortBy } = useSortBy({ actionToDispatch: fetchQuizList });

  // handles search bar logic
  const { handleSearch: handleSearchQuiz, searchResults: searchQuizzes } =
    useSearchBar({
      status,
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
          size: 10,
        })
      );
    }
  }, [status, quizList, dispatch, totalElements]);
  return (
    <div className="container-fluid bottom-home min-vh-100 g-0 m-0 p-0">
      <div className="p-5">
        <h1 className="quiz-logo text-center">QUIZZES</h1>
        <div className="row justify-content-between quiz-home-buttons mx-auto">
          <div className="col-auto text-start">
            <SelectionList
              label="Sort By"
              options={SORTING_OPTIONS}
              setValue={setSelection}
              value={selection}
              handleAction={handleSortBy}
            />
          </div>
          <div className="col-auto text-end">
            <input
              onChange={handleSearchQuiz}
              type="search"
              id="form1"
              className="form-control"
              placeholder="Search for quiz..."
              aria-label="Search"
            />
          </div>
        </div>

        <QuizPreview quizList={searchQuizzes} status={status} />
      </div>
    </div>
  );
}
