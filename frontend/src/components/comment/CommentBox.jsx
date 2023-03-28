import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import Votes from './Votes';
import AddEditComment from './AddEditComment';
import OptionMenu from './OptionsMenu';
import beautifyTime from '../../utilities/beautify-time';
import './CommentBox.css';
import { selectAllCommentVotes } from '../../store/reducers/comment-vote-reducer';

// displays the frame for any comment
export default function CommentBox({
  children,
  upVotes,
  downVotes,
  userId,
  profilePicture,
  username,
  createdDate,
  commentText,
  cancelComment = () => {},
  deleteParentComment,
  editComment,
  canReply = true,
  commentId,
}) {
  const [isEditClicked, setIsEditClicked] = useState(false);

  const allCommentVotes = useSelector(selectAllCommentVotes);

  const handleCancelComment = () => {
    cancelComment();
  };

  const handleDeleteMessage = () => {
    deleteParentComment();
  };

  const handleIsEditCommentOpen = () => {
    setIsEditClicked(!isEditClicked);
  };

  const handleEditComment = (newComment) => {
    setIsEditClicked(!isEditClicked);
    editComment(newComment);
  };
  return (
    <>
      <div className="col-2 col-sm-2 col-md-2 p-2 ms-3 ms-sm-0 ms-md-0 replies-css">
        <Votes
          upVotes={upVotes}
          commentId={commentId}
          downVotes={downVotes}
          allCommentVotes={allCommentVotes}
        />
      </div>
      <div className="col-7 col-sm-8 col-md-9 col-lg-9 ms-md-0 ms-3 pb-4">
        <div className="row">
          <div className="col-auto col-sm-3 col-lg-1 col-md-2 me-0 me-lg-3">
            <Avatar
              sx={{ width: 45, height: 45 }}
              src={profilePicture}
              alt="profile user"
              loading="lazy"
            />
          </div>
          <div className="col-auto col-lg-2 col-sm-3 col-md-2 me-md-1 me-sm-0">
            <p className="text-primary commentUsername-css">{username}</p>
          </div>
          <div className="col-auto col-lg-5 col-sm-6 col-md-6 col-lg-2 me-lg-auto me-md-auto">
            <p className="text-secondary createdDate-css">
              {beautifyTime({ createdDate })}
            </p>
          </div>
        </div>
        <div className="row justify-content-between mt-2">
          <div className="col-9 col-sm-9 col-md-9 m-2 p-1 col-lg-9 comment-css">
            {isEditClicked ? (
              <AddEditComment
                handleAddEditComment={handleEditComment}
                profilePicture={profilePicture}
                commentText={commentText}
                cancelReplyElement={handleIsEditCommentOpen}
              />
            ) : (
              <p className="text" style={{ whiteSpace: 'pre-line' }}>
                {commentText}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
      <div className="col-2 col-sm-1 col-md-1 col-lg-1 align-self-start p-3 p-lg-0 p-md-0">
        <OptionMenu
          userId={userId}
          handleDeleteMessage={handleDeleteMessage}
          handleIsEditCommentOpen={handleIsEditCommentOpen}
          handleCancelComment={handleCancelComment}
          canReply={canReply}
        />
      </div>
    </>
  );
}
