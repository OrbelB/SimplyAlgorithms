import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Chip, Typography, createTheme } from '@mui/material';
import { styled } from '@mui/system';
import Votes from './Votes';
import AddEditComment from './AddEditComment';
import OptionMenu from './OptionsMenu';
import { beautifyTime } from '../../utilities/beautify-time';
import './CommentBox.css';
import { selectAllCommentVotes } from '../../store/reducers/comment-vote-slice';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const RoleBadge = styled(Chip)(() => ({
  borderRadius: '16px',
  padding: '8px 16px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  boxShadow: 'none',
  transition: 'all 0.2s ease-in-out',
}));

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
  roleName,
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
      <div className="col-2 col-sm-2 col-md-2 pt-2 ms-sm-0 ms-md-0 replies-css">
        <Votes
          upVotes={upVotes}
          commentId={commentId}
          downVotes={downVotes}
          allCommentVotes={allCommentVotes}
        />
      </div>
      <div className="col-8 col-sm-8 col-md-9 col-lg-9 ms-md-0 ms-3 pb-4">
        <div className="row g-0 justify-content-md-start justify-content-sm-center gy-2">
          <div className="col-auto col-sm-12 align-self-sm-center col-lg-1 col-md-1 me-md-3">
            <Avatar
              sx={{
                width: 45,
                height: 45,
              }}
              src={profilePicture}
              alt="profile user"
              loading="lazy"
            />
          </div>
          <div className="col-12 align-self-sm-center col-lg-2 col-sm-12 col-md-2 me-auto me-lg-0">
            <Typography
              className="text-primary commentUsername-css me-auto"
              variant="subtitle1"
            >
              {username}
            </Typography>
          </div>
          <div className="col-12 align-self-sm-center align-self-md-center align-self-lg-center col-lg-3 col-sm-12 col-md-3 ">
            <RoleBadge label={roleName} size="medium" />
          </div>
          <div className="col-12 align-self-center col-lg-4 col-sm-12 col-md-5">
            <Typography className="text-secondary createdDate-css text-md-end text-lg-start">
              {beautifyTime({ createdDate })}
            </Typography>
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
