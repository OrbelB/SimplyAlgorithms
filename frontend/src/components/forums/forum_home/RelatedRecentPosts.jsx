/* eslint-disable camelcase */
import './PostPreview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  selectAllViewedForums,
  viewForumsActions,
} from '../../../store/reducers/viewed-forums-reducer';
import { fetchUserForumsViewed } from '../../../services/forum';
import { forumActions } from '../../../store/reducers/forum-reducer';
import useUpdateStore from '../../../hooks/use-updateStore';

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

  if (status === 'success') {
    return (
      <div>
        {viewedForums?.map((viewedForum) => (
          <div
            key={viewedForum?.pageId}
            className="side-section"
            onClick={() => {
              dispatch(forumActions.resetData());
              dispatch(viewForumsActions.resetData({}));
              navigate(`/forums/${viewedForum.pageId}`);
            }}
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                dispatch(forumActions.resetData());
                dispatch(viewForumsActions.resetData({}));
                navigate(`/forums/${viewedForum.pageId}`);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="line-one">
              <img
                className="rounded-circle m-2"
                height="38"
                alt="current profile user"
                loading="lazy"
                src={viewedForum?.userDto?.profilePicture}
              />
              <h2 className="side-username">
                {viewedForum?.userDto?.username}
              </h2>
            </div>
            <h2 className="line-two">{viewedForum?.title}</h2>
          </div>
        ))}
      </div>
    );
  }
}
