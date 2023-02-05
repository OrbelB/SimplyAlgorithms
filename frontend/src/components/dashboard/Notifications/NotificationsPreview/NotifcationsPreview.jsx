import './NotificationsPreview.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeSingleNotification } from '../../../../services/user';
import { forumActions } from '../../../../store/reducers/forum-reducer';

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

export default function NotificationsPreview() {
  const { dashboardInfo } = useSelector((state) => state.user);
  const { userId: authUserId, jwtAccessToken } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleNavigation(notificationId, referenceId, message, title) {
    if (message.includes('post.')) {
      document.getElementById('modal-notification-close').click();
      dispatch(forumActions.resetData());
      navigate(`/forums/${referenceId}`, {
        preventScrollReset: true,
        replace: true,
      });
    }
    if (message.includes('replies')) {
      if (title.includes('Binary Search Trees')) {
        document.getElementById('modal-notification-close').click();
        navigate(`/search/binarysearchtree`, {
          preventScrollReset: true,
          replace: true,
        });
      }
      if (title.includes('BFS')) {
        document.getElementById('modal-notification-close').click();
        navigate(`/search/bfs`, {
          preventScrollReset: true,
        });
      }
      if (title.includes('Bubble Sort')) {
        document.getElementById('modal-notification-close').click();
        navigate(`/search/bfs`, {
          preventScrollReset: true,
        });
      }
      if (title.includes('Bubble Sort')) {
        document.getElementById('modal-notification-close').click();
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

  return dashboardInfo?.notifications?.map(
    ({ notificationId, referenceId, title, message }) => (
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
        className="preview-sect d-flex flex-column justify-content-center p-4 mt-3 mb-5"
      >
        <h4>{title}</h4>

        <p>{message}</p>
      </div>
    )
  );
}
