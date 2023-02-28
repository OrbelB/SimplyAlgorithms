import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuizScreen from '../../components/quiz/QuizScreen/QuizScreen';
import JoinQuiz from '../../components/quiz/QuizJoin/QuizJoin';
import { fetchSingleQuiz } from '../../services/quiz';

export default function QuizSample() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const { quizId } = useParams();
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { quizDTO, quizQuestionDTO, status } = useSelector(
    (state) => state.quiz
  );
  useEffect(() => {
    console.info('quizDTO', quizDTO);
    console.info('status', status);
    if (Object.keys(quizDTO).length === 0 && status === 'idle') {
      dispatch(fetchSingleQuiz({ quizId, jwtAccessToken }));
    }
  }, [dispatch, quizDTO, quizQuestionDTO, status, quizId, jwtAccessToken]);

  if (quizDTO !== {} && quizQuestionDTO !== {} && status === 'success') {
    return (
      <div className="quiz-container">
        {isQuizStarted ? (
          <QuizScreen
            retry={() => setIsQuizStarted(false)}
            questions={quizQuestionDTO}
          />
        ) : (
          <JoinQuiz start={() => setIsQuizStarted(true)} quiz={quizDTO} />
        )}
      </div>
    );
  }
}
