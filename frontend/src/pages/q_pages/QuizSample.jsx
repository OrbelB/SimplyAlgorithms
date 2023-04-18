import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuizScreen from '../../components/quiz/QuizScreen/QuizScreen';
import JoinQuiz from '../../components/quiz/QuizJoin/QuizJoin';
import { fetchSingleQuiz } from '../../services/quiz';
import useTimer from '../../hooks/use-timer';

export default function QuizSample() {
  const {
    start,
    stop,
    startTime: startedAt,
    stoppedTime: finishedAt,
  } = useTimer();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const { quizId } = useParams();
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [runOnce, setRunOnce] = useState(false);
  const { quizDTO, quizQuestionDTO, status, userDTO } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    if (
      Object.keys(quizDTO).length === 0 &&
      status === 'idle' &&
      jwtAccessToken !== '' &&
      !runOnce
    ) {
      setRunOnce(true);
      dispatch(fetchSingleQuiz({ quizId, jwtAccessToken }));
    }
  }, [
    dispatch,
    quizDTO,
    quizQuestionDTO,
    status,
    quizId,
    jwtAccessToken,
    runOnce,
  ]);

  if (quizDTO !== {} && quizQuestionDTO !== {} && status === 'success') {
    return (
      <div className="container-xxxl">
        {isQuizStarted ? (
          <QuizScreen
            stop={stop}
            retry={() => setIsQuizStarted(false)}
            questions={quizQuestionDTO}
            quizId={quizId}
            userDto={userDTO}
            userId={userId}
            startedAt={startedAt}
            finishedAt={finishedAt}
            jwtAccessToken={jwtAccessToken}
          />
        ) : (
          <JoinQuiz
            start={() => {
              setIsQuizStarted(true);
              start();
            }}
            jwtAccessToken={jwtAccessToken}
            quiz={quizDTO}
            createdBy={userDTO}
            authUserId={userId}
            amountOfQuestions={quizQuestionDTO.length}
          />
        )}
      </div>
    );
  }
}
