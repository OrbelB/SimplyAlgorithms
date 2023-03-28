import { Avatar, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// input places to add or edit a comment
export default function AddEditComment({
  commentText,
  handleAddEditComment,
  cancelReplyElement,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const profilePicture = useSelector((state) => state.user.profilePicture);
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  const [checkComment, setCheckComment] = useState(commentText || '');

  const handleInputChildCommentUpdate = (e) => {
    setCheckComment(e.target.value);
  };
  const handleCancelChildComment = () => {
    cancelReplyElement();
  };

  const getChildComment = (e) => {
    e.preventDefault();
    if (!isLoggedIn && jwtAccessToken === '') {
      navigate('/login', { state: { from: location } });
    }
    handleAddEditComment(checkComment);
  };

  return (
    <form
      onSubmit={getChildComment}
      className="row justify-content-evenly mt-2"
    >
      <div className="col-auto col-sm-auto col-md-2">
        <Avatar
          sx={{ width: 40, height: 40 }}
          src={profilePicture}
          className="rounded-circle"
          alt="Profile of Current User"
          loading="lazy"
        />
      </div>
      <div className="col-auto col-md-10 m-0 p-0">
        <TextareaAutosize
          className="form-control p-4 p-sm-auto mb-4"
          placeholder="add a reply..."
          required
          rowsMin={1}
          value={checkComment}
          onChange={handleInputChildCommentUpdate}
        />
        {/* <input
          className="form-control"
          placeholder="add a reply.."
          value={checkComment}
          onInput={handleInputChildCommentUpdate}
          type="text"
        /> */}
      </div>
      <div className="row justify-content-end g-0">
        <div className="col-auto col-sm-auto btn-group pe-md-2">
          <button
            className="btn btn-danger"
            onClick={handleCancelChildComment}
            type="button"
          >
            CANCEL
          </button>
        </div>
        <div className="col-auto col-sm-auto btn-group">
          <button className="btn btn-success" type="submit">
            REPLY
          </button>
        </div>
      </div>
    </form>
  );
}
