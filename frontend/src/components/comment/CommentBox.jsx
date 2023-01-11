/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
      <div className="col-auto col-sm-2 col-lg-2 p-2 p-lg-0 p-sm-0 p-md-0 replies-css">
        <Votes
          upVotes={upVotes}
          commentId={commentId}
          downVotes={downVotes}
          allCommentVotes={allCommentVotes}
        />
      </div>
      <div className="col me-lg-5 me-auto">
        <div className="row">
          <div className="col-auto col-sm-auto m-1">
            <img
              src={profilePicture}
              className="rounded-circle"
              height="45"
              alt="profile user"
              loading="lazy"
            />
          </div>
          <div className="col-auto me-1">
            <p className="text-primary commentUsername-css">{username}</p>
          </div>
          <div className="col-auto me-lg-auto me-md-auto">
            <p className="text-secondary createdDate-css">
              {beautifyTime({ createdDate })}
            </p>
          </div>
        </div>
        <div className="row justify-content-between mt-2">
          <div className="col-8 col-sm-10 m-2 p-1 col-lg-10 comment-css">
            {isEditClicked ? (
              <AddEditComment
                handleAddEditComment={handleEditComment}
                profilePicture={profilePicture}
                commentText={commentText}
                cancelReplyElement={handleIsEditCommentOpen}
              />
            ) : (
              <p className="text-wrap">{commentText}</p>
            )}
          </div>
          <div className="col-2 col-sm-auto align-self-start p-3 p-lg-0 p-md-0">
            <OptionMenu
              userId={userId}
              handleDeleteMessage={handleDeleteMessage}
              handleIsEditCommentOpen={handleIsEditCommentOpen}
              handleCancelComment={handleCancelComment}
              canReply={canReply}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
