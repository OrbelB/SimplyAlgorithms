import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  Avatar,
} from '@mui/material';
import Report from '../report/Report';
import './PostPreview.css';
import { forumActions } from '../../../store/reducers/forum-reducer';
import { forumVoteActions } from '../../../store/reducers/forum-vote-reducer';
import { commentVoteActions } from '../../../store/reducers/comment-vote-reducer';
import { commentActions } from '../../../store/reducers/comment-reducer';
import { forumsActions } from '../../../store/reducers/forums-reducer';

export default function ForumQuickView({
  pageId,
  userDto,
  title,
  upVotes,
  downVotes,
  innerRef,
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeData = useCallback(() => {
    dispatch(forumActions.resetData());
    dispatch(forumVoteActions.resetData());
    dispatch(commentVoteActions.resetData());
    dispatch(commentActions.resetData());
    dispatch(forumsActions.resetData());
    navigate(`${pageId}`);
  }, [dispatch, navigate, pageId]);

  return (
    <Card
      ref={innerRef}
      key={pageId}
      sx={{ minWidth: 400, width: '100%' }}
      raised
      className="preview-section mt-4 mb-4 me-4"
    >
      <CardActionArea
        onClick={removeData}
        sx={{ borderBottom: '1px solid black' }}
        className="p-3 pb-5"
      >
        <div className="row">
          <div className="col-auto col-md-2">
            <Avatar
              sx={{ width: 60, height: 60 }}
              src={userDto.profilePicture}
              className="m-auto m-md-3"
              alt="current profile user"
              loading="lazy"
            />
          </div>
          <h2 className="preview-username col-auto col-md-2">
            {userDto.username}
          </h2>
        </div>
        <Typography
          variant="h2"
          component="h2"
          className="row justify-content-center"
        >
          {title.trim().length > 40
            ? title.substring(0, 40).concat('...')
            : title}
        </Typography>
      </CardActionArea>
      <CardActions className="pb-4">
        <div className="row justify-content-between btn-group">
          <div className="col-auto col-lg-4 m-0 p-0 align-self-end ">
            <i className="bi bi-hand-thumbs-up ms-4"> {` ${upVotes}`}</i>
            <i className="bi bi-hand-thumbs-down ms-4"> {` ${downVotes}`}</i>
          </div>
          <div className="col-4 m-0 p-0 align-self-end">
            {isLoggedIn && <Report pageId={pageId} />}
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
