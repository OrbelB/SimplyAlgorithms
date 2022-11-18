import React from "react";
import { RiQuestionnaireFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { reportForum } from "../../../services/forum";
import { useState } from "react";
export default function Report({ pageId }) {
  const [reportMessage, setReportMessage] = useState("");
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const handleReportMessageChange = (e) => {
    setReportMessage(e.target.value);
  }
  const submitForm = () => {
    dispatch(
      reportForum({
        reportedPage: {
          pageId: pageId,
          userId: authUserId,
          reportMessage: reportMessage,
        },
        accessToken: jwtAccessToken,
      })
    );
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn btn-outline-secondary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop1"
      >
        <div>
          Report
          <RiQuestionnaireFill />
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title" id="staticBackdropLabel">
                Report A Problem
              </h2>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* <div class="mb-0">
                <label for="quetion_categories" class="col-form-label">
                  Type of Problem:
                </label>
                <input type="text" class="form-control" id="forum_post_title" />
              </div> */}
              <div class="mb-3">
                <label for="question_text" class="col-form-label">
                  Brief Description Of The Problem:
                </label>
                <textarea
                  class="form-control"
                  id="forum_post_question"
                  value={reportMessage}
                  onChange={handleReportMessageChange}
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
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
