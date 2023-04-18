import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FlagIcon from '@mui/icons-material/Flag';
import {
  Typography,
  Card,
  CardActionArea,
  CardActions,
  Avatar,
  Button,
} from '@mui/material';
import Report from '../../report/Report';
import './PostPreview.css';
import { forumActions } from '../../../store/reducers/forum-slice';
import { forumVoteActions } from '../../../store/reducers/forum-vote-slice';
import { commentVoteActions } from '../../../store/reducers/comment-vote-slice';
import { commentActions } from '../../../store/reducers/comment-slice';
import { forumsActions } from '../../../store/reducers/forums-slice';

export default function ForumQuickView({
  pageId,
  userDto,
  title,
  upVotes,
  downVotes,
  innerRef,
}) {
  const { isLoggedIn, userId: victimId } = useSelector((state) => state.auth);
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

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  return (
    <Card
      raised
      ref={innerRef}
      key={pageId}
      sx={{ minWidth: 400, width: '100%' }}
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
        <div className="row row-style justify-content-between btn-group">
          <div className="col-auto col-lg-4 m-0 p-0 align-self-end ">
            <i className="bi bi-hand-thumbs-up ms-4"> {` ${upVotes}`}</i>
            <i className="bi bi-hand-thumbs-down ms-4"> {` ${downVotes}`}</i>
          </div>
          <div className="col-4 m-0 p-0 align-self-end">
            {isLoggedIn && (
              <>
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<FlagIcon />}
                  sx={{ fontSize: '15px' }}
                  onClick={handleOpenReport}
                >
                  Report
                </Button>
                <Report
                  open={openReport}
                  handleClose={handleCloseReport}
                  culpritUserId={userDto.userId}
                  foreignId={pageId}
                  typeOfForeignId="forum"
                  victumUserId={victimId}
                />
              </>
            )}
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
