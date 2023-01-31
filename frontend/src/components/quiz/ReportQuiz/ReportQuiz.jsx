/* eslint-disable jsx-a11y/label-has-associated-control */
import './ReportQuiz.css';

export default function QuizReportForm() {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <div className="quiz-report-request d-inline text-left">
        <button
          type="button"
          className="quizreportbutton"
          data-bs-toggle="modal"
          data-bs-target="#quizreport"
        >
          Report Quiz
        </button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="quizreport"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Quiz Report
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="form-group">
                    <label htmlFor="quiz-report">
                      If you had any problems with this quiz, write your
                      concerns here!
                    </label>
                    <textarea
                      type="text"
                      className="form-control mt-3 mb-3"
                      id="quiz-report-text"
                      placeholder="Type Here..."
                    />
                  </div>

                  <div className="form-group text-right mt-2">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
