/* eslint-disable camelcase */
import './PostPreview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Avatar, Card, CardActionArea } from '@mui/material';
import debounce from 'lodash.debounce';
import {
  selectAllViewedForums,
  viewForumsActions,
} from '../../../store/reducers/viewed-forums-slice';
import { fetchUserForumsViewed } from '../../../services/forum';
import { forumActions } from '../../../store/reducers/forum-slice';
import useUpdateStore from '../../../hooks/use-updateStore';
import { forumVoteActions } from '../../../store/reducers/forum-vote-slice';
import { commentActions } from '../../../store/reducers/comment-slice';
import { commentVoteActions } from '../../../store/reducers/comment-vote-slice';

export default function RelatedRecentPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewedForums = useSelector(selectAllViewedForums);
  const { status } = useSelector((state) => state.viewedForums);
  const { userId: authUserId, isLoggedIn } = useSelector((state) => state.auth);

  const forumViewsUpdateStore = useMemo(() => {
    return {
      conditions: [status === 'idle' && isLoggedIn && authUserId !== null],
      actions: [[fetchUserForumsViewed]],
      arguments: [[{ userId: authUserId, page: 0, size: 10 }]],
    };
  }, [authUserId, isLoggedIn, status]);

  useUpdateStore(
    forumViewsUpdateStore.conditions,
    forumViewsUpdateStore.actions,
    forumViewsUpdateStore.arguments
  );

  const resetData = (pageId) => {
    dispatch(forumActions.resetData());
    dispatch(forumVoteActions.resetData());
    dispatch(commentActions.resetData());
    dispatch(commentVoteActions.resetData());
    dispatch(viewForumsActions.resetData({}));
    navigate(`/forums/${pageId}`);
  };

  if (status === 'success') {
    return viewedForums?.map(({ pageId, userDto, title }) => (
      <Card key={pageId} raised sx={{ marginBottom: 5 }}>
        <CardActionArea
          sx={{ padding: '0.5rem 1rem' }}
          onClick={debounce(() => resetData(pageId), 100)}
        >
          <div className="line-one">
            <Avatar
              className="m-2"
              width="50"
              alt="current profile user"
              loading="lazy"
              src={userDto?.profilePicture}
            />
            <h2 className="side-username">{userDto?.username}</h2>
          </div>
          <h2 className="line-two">{title}</h2>
        </CardActionArea>
      </Card>
    ));
  }
}
