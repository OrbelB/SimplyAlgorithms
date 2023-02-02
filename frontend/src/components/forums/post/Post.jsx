import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { Fab, TextField, Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useValidateInput from '../../../hooks/use-ValidateInput';
import './post.css';

import { createForum } from '../../../services/forum';
import TagForm from '../tags/TagForm';

export default function Post() {
  const [tagsSelected, setTagsSelected] = useState([]);
  const authUserId = useSelector((state) => state.auth.userId);
  const { jwtAccessToken, isLoggedIn } = useSelector((state) => state.auth);
  const { pageId, status } = useSelector((state) => state.forum);
  const [showSignUp, setShowSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    value: title,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleHandler,
  } = useValidateInput((value) => value.trim() !== '');

  const {
    value: message,
    valueIsValid: messageIsValid,
    valueChangeHandler: messageChangedHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessageHandler,
  } = useValidateInput((value) => value.trim() !== '');

  let canFormBeSubmitted = false;
  if (titleIsValid && messageIsValid) canFormBeSubmitted = true;

  const saveNewForum = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location }, replace: true });
    }
    if (!canFormBeSubmitted) return;
    dispatch(
      createForum({
        createdForum: {
          descriptionText: message,
          title,
          photo: '',
          video: '',
          userDto: {
            userId: authUserId,
          },
          tags: tagsSelected,
        },
        accessToken: jwtAccessToken,
      })
    );
    resetMessageHandler();
    resetTitleHandler();
    setTagsSelected([]);
  };

  const handleShow = () => {
    setShowSignUp(!showSignUp);
  };
  if (pageId !== '' && status === 'successToIdle') {
    navigate(`${pageId}`, { replace: true });
  }

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <Tooltip
        title="Ask A Question"
        aria-label="Ask"
        onClick={() => handleShow()}
      >
        <Fab color="info">
          <RiQuestionnaireFill />
        </Fab>
      </Tooltip>

      {/* <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        onClick={handleShow}
      >
        <div>
          Ask A Question
          <RiQuestionnaireFill />
        </div>
      </button> */}

      {/* <!-- Modal --> */}
      <Modal
        show={showSignUp}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="text-uppercase text-center">My Forum Post</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="align-items-center text-center">
          <TextField
            className="w-100 mb-5"
            label="Title"
            type="text"
            id="forum_post_title"
            value={title}
            onChange={titleChangedHandler}
            onBlur={titleBlurHandler}
          />
          <div className="col-md-4 w-100">
            <TagForm
              currentTags={tagsSelected}
              setCurrentTags={setTagsSelected}
            />
            {/* <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <select
              id="inputCategory"
              className="form-select"
              onChange={addTagToSave}
            >
              {tags.map((tag) => (
                <option value={tag.tagId} key={tag.tagId}>
                  {tag.tag}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 w-100 form-group">
            <label htmlFor="question_categories" className="col-form-label">
              Or create your own category
            </label>
            <input
              type="text"
              class="form-control"
              id="question_categories"
              value={newTagName}
              onChange={updateTagName}
              onKeyDown={addNewTag}
            />
           */}
          </div>
          {/* <div className="row mt-2 justify-content-center">
            {tagsSelected?.map((tag) => (
              <Chip
                key={tag.tagId === "" ? nanoid() : tag.tagId}
                className="col-auto m-1"
                label={tag.tag}
                variant="outlined"
                onDelete={() => removeTag(tag.tagId, tag.tag)}
              />
            ))}
          </div> */}
          <TextField
            className="w-100 mb-5"
            label="Message"
            type="text"
            id="forum_post_question"
            multiline
            rows="4"
            value={message}
            onChange={messageChangedHandler}
            onBlur={messageBlurHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveNewForum}
            disabled={!canFormBeSubmitted}
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
      {/* <div
        className="modal fade"
        id="staticBackdrop"
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
                My Forum Post
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-0 form-group">
                <label htmlFor="forum_post_title" className="col-form-label">
                  Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="forum_post_title"
                  value={title}
                  onChange={titleChangedHandler}
                  onBlur={titleBlurHandler}
                />
              </div>
              <div className="col-md-4 w-100">
                <label htmlFor="inputCategory" className="form-label">
                  Category
                </label>
                <select
                  id="inputCategory"
                  className="form-select"
                  onChange={addTagToSave}
                >
                  {tags.map((tag) => (
                    <option value={tag.tagId} key={tag.tagId}>
                      {tag.tag}
                    </option>
                  ))}
                </select>
              </div>

              <div class="col-md-4 w-100 form-group">
                <label htmlFor="question_categories" className="col-form-label">
                  Or create your own Category:
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="question_categories"
                  value={newTagName}
                  onChange={updateTagName}
                  onKeyDown={addNewTag}
                />
              </div>
              <div className="row mt-2 justify-content-center">
                {tagsSelected?.map((tag) => (
                  <Chip
                    key={tag.tagId === "" ? nanoid() : tag.tagId}
                    className="col-auto m-1"
                    label={tag.tag}
                    variant="outlined"
                    onDelete={() => removeTag(tag.tagId, tag.tag)}
                  />
                ))}
              </div>

              <div className="mb-3">
                <label htmlFor="question_text" className="col-form-label">
                  Message:
                </label>
                <textarea
                  className="form-control"
                  id="forum_post_question"
                  value={message}
                  onChange={messageChangedHandler}
                  onBlur={messageBlurHandler}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveNewForum}
                disabled={!canFormBeSubmitted}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
     */}
    </>
  );
}
