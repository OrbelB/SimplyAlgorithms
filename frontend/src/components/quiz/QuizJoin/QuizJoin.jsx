import { nanoid } from '@reduxjs/toolkit';
import './QuizJoin.css';

const quizbasis = [
  {
    qname: 'Random Quiz',
    qattempts: '2',
    qamount: '4',
    qtime: '5',
    qdescription:
      'Maecenas viverra tortor eu nisi vulputate vehicula sed ut lorem. Nullam aliquam aliquet accumsan. Morbi eu ultricies nulla. Morbi vehicula vitae orci facilisis laoreet. Curabitur accumsan sodales gravida. Proin finibus eu tellus sit amet posuere. Curabitur ac elit maximus, pellentesque risus in, commodo arcu. Mauris lorem massa, luctus id dolor ut, rutrum finibus tellus. ',
  },
];
export default function JoinQuiz({ start }) {
  return (
    <div className="join-screen containter w-100 p-5">
      {quizbasis.map(({ qname, qattempts, qamount, qtime, qdescription }) => {
        return (
          <div key={nanoid()}>
            <div className="row">
              <div className="col-md-8">
                <h1 className="qname text-center">{qname}</h1>
                <h5 className="qdescription m-5 text-left">{qdescription}</h5>
              </div>
              <div className="col-auto qinfo">
                <h5 className="qamount text-left">Questions: {qamount}</h5>
                <h5 className="qattempts text-left">
                  Attempts Left: {qattempts}
                </h5>
                <h5 className="qtime text-left">Time Limit: {qtime} minutes</h5>
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-center mt-5">
        <button type="button" className="quizstart" onClick={start}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}
