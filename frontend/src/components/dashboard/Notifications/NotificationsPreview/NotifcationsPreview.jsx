import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeSingleNotification,
  fetchUserNotifications,
} from '../../../../services/user';
import { forumActions } from '../../../../store/reducers/forum-slice';
import './NotificationsPreview.css';
import { forumsActions } from '../../../../store/reducers/forums-slice';
import { commentActions } from '../../../../store/reducers/comment-slice';

const NOTIFICATION_PREVIEWS = [
  {
    id: 1,
    department: 'Maintenance',
    message:
      'Simply Algorithim scheduled maintenance on December 11, 2022 12:00pm - 4:00pm.',
  },
  {
    id: 2,
    department: 'Forum',
    message:
      'You have gotten (23) replies to your post: An epicurei rationibus vituperata mei, ea odio veri reque nec.',
  },
  {
    id: 3,
    department: 'Simply Algorithims',
    message:
      'We noticed that you enjoyed studying about Searching algorithms. You might be intrigued by learning about Arrays.',
  },
];

export { NOTIFICATION_PREVIEWS };

export default function NotificationsPreview({ setShow, lastElementChild }) {
  const { notifications, status } = useSelector((state) => state.user);
  const { userId: authUserId, jwtAccessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle' && notifications?.length === 0) {
      dispatch(
        fetchUserNotifications({
          page: 0,
          size: 15,
          userId: authUserId,
          jwtAccessToken,
        })
      );
    }
    return () => {};
  }, [authUserId, notifications?.length, dispatch, jwtAccessToken, status]);

  // TODO: Refactor this function to be more dynamic and not hard coded.
  function handleNavigation(notificationId, referenceId, message, title) {
    if (message.includes('post.')) {
      setShow(false);
      dispatch(forumActions.resetData());
      dispatch(forumsActions.resetData());
      dispatch(commentActions.resetData());
      navigate(`/forums/${referenceId}`, {
        preventScrollReset: true,
        replace: true,
      });
    }
    if (message.includes('replies')) {
      if (title.includes('Binary Search Trees')) {
        setShow(false);

        navigate(`/search/binarysearchtree`, {
          preventScrollReset: true,
          replace: true,
        });
      }
      if (title.includes('BFS')) {
        setShow(false);
        navigate(`/search/bfs`, {
          preventScrollReset: true,
        });
      }
      if (title.includes('Bubble Sort')) {
        setShow(false);
        navigate(`/search/bfs`, {
          preventScrollReset: true,
        });
      }
      if (title.includes('Bubble Sort')) {
        setShow(false);
        navigate(`/search/bfs`, {
          preventScrollReset: true,
        });
      }
    }
    dispatch(
      removeSingleNotification({
        userId: authUserId,
        notificationId,
        jwtAccessToken,
      })
    );
  }

  return notifications?.map(
    ({ notificationId, referenceId, title, message }, index) => {
      return index + 1 === notifications.length ? (
        <div
          ref={lastElementChild}
          key={notificationId}
          onClick={() =>
            handleNavigation(notificationId, referenceId, message, title)
          }
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleNavigation(notificationId, referenceId, message, title);
            }
          }}
          tabIndex={0}
          className="preview-sect d-flex flex-column justify-content-center rounded-3 p-4 mt-3 mb-5"
          sx={{
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              boxShadow:
                '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            },
          }}
        >
          <h4>{title}</h4>

          <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
      ) : (
        <div
          key={notificationId}
          onClick={() =>
            handleNavigation(notificationId, referenceId, message, title)
          }
          role="button"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleNavigation(notificationId, referenceId, message, title);
            }
          }}
          tabIndex={0}
          className="preview-sect d-flex flex-column justify-content-center rounded-3 p-4 mt-3 mb-5"
          sx={{
            boxShadow:
              '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '&:hover': {
              boxShadow:
                '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            },
          }}
        >
          <h4>{title}</h4>

          <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
      );
    }
  );
}
