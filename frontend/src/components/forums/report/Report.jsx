/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { reportForum } from '../../../services/forum';

export default function Report({ pageId }) {
  const [reportMessage, setReportMessage] = useState('');
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const handleReportMessageChange = (e) => {
    setReportMessage(e.target.value);
  };
  const submitForm = () => {
    dispatch(
      reportForum({
        reportedPage: {
          pageId,
          userId: authUserId,
          reportMessage,
        },
        accessToken: jwtAccessToken,
      })
    );
    setReportMessage('');
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        <div>
          Report <RiQuestionnaireFill />
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop1"
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
                Report A Problem
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* <div class="mb-0">
                <label for="quetion_categories" class="col-form-label">
                  Type of Problem:
                </label>
                <input type="text" class="form-control" id="forum_post_title" />
              </div> */}
              <div className="mb-3">
                <label htmlFor="question_text" className="col-form-label">
                  Brief Description Of The Problem:
                </label>
                <textarea
                  className="form-control"
                  id="forum_post_question"
                  value={reportMessage}
                  onChange={handleReportMessageChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submitForm}
                aria-label="Close"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
