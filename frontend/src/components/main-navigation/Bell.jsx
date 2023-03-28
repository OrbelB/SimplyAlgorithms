/* eslint-disable jsx-a11y/control-has-associated-label */
import { Badge } from '@mui/material';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import { fetchUserDashboardInfo } from '../../services/user';
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
  const { dashboardInfo, status } = useSelector((state) => state.user);
  const { userId: authUserId, jwtAccessToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (status === 'idle' && dashboardInfo?.notifications?.length === 0) {
      dispatch(
        fetchUserDashboardInfo({
          userId: authUserId,
          jwtAccessToken,
        })
      );
    }
    return () => {};
  }, [
    authUserId,
    dashboardInfo?.notifications?.length,
    dispatch,
    jwtAccessToken,
    status,
  ]);

  return (
    <>
      <Suspense fallback={<LoadingBackdrop />}>
        <Notifications setShow={setClickedBell} show={clickedBell} />
      </Suspense>
      <Badge
        badgeContent={dashboardInfo?.notifications?.length}
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
