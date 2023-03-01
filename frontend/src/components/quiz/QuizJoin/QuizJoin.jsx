import { nanoid } from '@reduxjs/toolkit';
import './QuizJoin.css';

// const quizbasis = [
//   {
//     qname: 'Random Quiz',
//     qattempts: '2',
//     qamount: '4',
//     qtime: '5',
//     qdescription:
//       'Maecenas viverra tortor eu nisi vulputate vehicula sed ut lorem. Nullam aliquam aliquet accumsan. Morbi eu ultricies nulla. Morbi vehicula vitae orci facilisis laoreet. Curabitur accumsan sodales gravida. Proin finibus eu tellus sit amet posuere. Curabitur ac elit maximus, pellentesque risus in, commodo arcu. Mauris lorem massa, luctus id dolor ut, rutrum finibus tellus. ',
//   },
// ];
export default function JoinQuiz({ start, quiz }) {
  return (
    <div className="join-screen containter w-100 p-5">
      <div key={nanoid()}>
        <div className="row">
          <div className="col-md-8">
            <h1 className="qname text-center">{quiz.title}</h1>
            {/* <h5 className="qdescription m-5 text-left">{quizDTO.title}</h5> */}
          </div>
          <div className="col-auto qinfo">
            <h5 className="qamount text-left">Questions: {quiz.length}</h5>
            {/* <h5 className="qattempts text-left">Attempts Left: 2</h5> */}
            <h5 className="qtime text-left">Time Limit: ∞ minutes</h5>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button type="button" className="quizstart" onClick={start}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
