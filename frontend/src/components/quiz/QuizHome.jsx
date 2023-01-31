import QuizPreview from './QuizPreview/QuizPreview';
import './QuizHome.css';

const SELECTED_TOPIC_QUIZ = [
  {
    topic: 'topic here',
  },
];

export default function quizhome() {
  return (
    <div>
      <div className="p-5 top-quizhome">
        <div className="row justify-content-center">
          <h1 className="quiz-logo">Quizzes</h1>
          <div className="form-outline w-50 mb-5">
            <input
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
        <div className="row justify-content-start">
          <div className="col-auto">
            {SELECTED_TOPIC_QUIZ.map(({ index, topic }) => {
              return (
                <div key={`${topic} ${index}`}>
                  <h5>Topic: {topic}</h5>
                </div>
              );
            })}
          </div>
          <div className="col">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort By
              </button>
              <ul className="dropdown-menu">
                <li>Action</li>
                <li>Another action</li>
                <li>Something else here</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <QuizPreview />
        </div>
      </div>
    </div>
  );
}
