import { useState } from 'react';
import QuizScreen from '../../components/quiz/QuizScreen/QuizScreen';
import JoinQuiz from '../../components/quiz/QuizJoin/QuizJoin';

export default function QuizSample() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  return (
    <div className="quiz-container">
      {isQuizStarted ? (
        <QuizScreen retry={() => setIsQuizStarted(false)} />
      ) : (
        <JoinQuiz start={() => setIsQuizStarted(true)} />
      )}
    </div>
  );
}
