/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authActions } from '../../store/reducers/auth-slice';
import { userActions } from '../../store/reducers/user-slice';
import { viewForumsActions } from '../../store/reducers/viewed-forums-slice';
import { forumVoteActions } from '../../store/reducers/forum-vote-slice';
import { commentVoteActions } from '../../store/reducers/comment-vote-slice';
import { forumActions } from '../../store/reducers/forum-slice';
import { quizActions } from '../../store/reducers/quiz-slice';
import { topicVoteActions } from '../../store/reducers/topic-votes-slice';
import { commentActions } from '../../store/reducers/comment-slice';
import { resetData } from '../../store/reducers/note-slice';

export default function Logout({ handleLogout }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal((prevState) => (prevState = !prevState));
    handleLogout(showModal);
  };
  const handleUserLogoutRequest = () => {
    dispatch(quizActions.resetData());
    dispatch(topicVoteActions.resetData());
    dispatch(authActions.resetData());
    dispatch(userActions.onUserLogout());
    dispatch(viewForumsActions.resetData());
    dispatch(forumVoteActions.resetData());
    dispatch(commentVoteActions.resetData());
    dispatch(forumActions.resetData());
    dispatch(commentActions.resetData());
    dispatch(resetData());
    // remove refresh token cookie
    Cookies.remove('refresh-token');
    handleLogout(!showModal);
    navigate(location, {
      replace: true,
    });
  };
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center w-100"
        >
          <h2 className="text-uppercase text-center">Logout</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center  p-5">
        <h4>Are you sure you want to logout?</h4>
      </Modal.Body>
      <Modal.Footer className="justify-content-evenly">
        <div className="col-4">
          <button
            className="btn btn-danger"
            onClick={handleUserLogoutRequest}
            type="button"
          >
            YES
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-light" type="button" onClick={handleClose}>
            NO
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
