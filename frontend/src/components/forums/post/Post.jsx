import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { Fab, TextareaAutosize, TextField, Tooltip } from '@mui/material';
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
          </div>
          <TextareaAutosize
            minRows={5}
            className="w-100 mb-5"
            label="Message"
            type="text"
            id="forum_post_question"
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
    </>
  );
}
