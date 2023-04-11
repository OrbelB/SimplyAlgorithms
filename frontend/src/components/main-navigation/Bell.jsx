/* eslint-disable jsx-a11y/control-has-associated-label */
import { Badge } from '@mui/material';
import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { fetchUserNotifications } from '../../services/user';
import LoadingBackdrop from '../loading/LoadingBackdrop';

const Notifications = lazy(() =>
  import('../dashboard/Notifications/Notifications')
);

export default function Bell() {
  const [clickedBell, setClickedBell] = useState(false);
  const handleBellButtonClicked = () => {
    setClickedBell(!clickedBell);
  };
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.user);
  const {
    userId: authUserId,
    jwtAccessToken,
    isLoggedIn,
  } = useSelector((state) => state.auth);

  // to avoid recreating the function on every render
  const fetchDashboardInfo = useCallback(() => {
    if (!isLoggedIn && authUserId === '') return;
    dispatch(
      fetchUserNotifications({
        page: 0,
        size: 15,
        sortBy: 'createdDate',
        userId: authUserId,
        jwtAccessToken,
      })
    );
  }, [isLoggedIn, dispatch, authUserId, jwtAccessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDashboardInfo();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchDashboardInfo, isLoggedIn]);

  return (
    <>
      <Suspense fallback={<LoadingBackdrop />}>
        <Notifications setShow={setClickedBell} show={clickedBell} />
      </Suspense>
      <Badge
        badgeContent={notifications?.length}
        color="info"
        onClick={handleBellButtonClicked}
      >
        <span
          data-bs-toggle="modal"
          className={cx(`bi bi-bell${clickedBell ? '-fill' : ''}`)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'enter') {
              handleBellButtonClicked();
            }
          }}
          role="button"
        />
      </Badge>
    </>
  );
}
