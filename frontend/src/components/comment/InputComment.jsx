import { Avatar } from '@mui/material';
import cx from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createParentComment } from '../../services/comment';

import styles from './InputComment.module.css';

// display the input field for a comment
export default function InputComment({ pageId }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { profilePicture, userId } = useSelector((state) => state.user);
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const handleInputText = (event) => {
    setText(event?.target.value);
  };

  const handleSubmitForm = (event) => {
    event?.preventDefault();
    if (!isLoggedIn)
      navigate('/login', { state: { from: location }, replace: true });
    if (text.length === 0 || text === '') return;
    if (pageId === undefined) return;
    dispatch(
      createParentComment({
        commentToSave: {
          pageId,
          userId,
          commentText: text,
        },
        accessToken: jwtAccessToken,
      })
    );
    // onNewComment(text);
    setText('');
  };

  return (
    <div className={cx('container-fluid mb-4', styles['input-comment-style'])}>
      <form className={cx('grid p-3')} onSubmit={handleSubmitForm}>
        <div className="row justify-content-evenly">
          <div className="col-auto col-sm-auto m-auto align-self-center">
            <Avatar
              sx={{ width: 45, height: 45 }}
              src={profilePicture}
              height="50"
              alt="profile"
              loading="lazy"
            />
          </div>
          <div className="col-auto col-md-9 col-sm-auto m-auto align-self-center">
            <input
              className="form-control  m-1 p-3 p-sm-auto"
              onInput={handleInputText}
              value={text}
              placeholder="add a comment..."
            />
          </div>
          <div className="col-auto col-sm-auto  align-self-center m-auto">
            <button
              className={cx(
                'btn btn-outline-primary text-white p-auto',
                styles['btn-style']
              )}
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
