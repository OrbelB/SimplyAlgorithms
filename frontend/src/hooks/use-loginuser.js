import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import {
  fetchUser,
  fetchUserDayStreak,
  fetchUserNotifications,
} from '../services/user';
import templateImage from '../assets/person-fill.png';

export default function useLoginUser(redirectTo) {
  const { jwtAccessToken, userId, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { profilePicture, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && profilePicture === templateImage) {
      if (status === 'idle' || status === 'success') {
        dispatch(fetchUserDayStreak({ userId, jwtAccessToken }));
        dispatch(
          fetchUserNotifications({ userId, page: 0, size: 12, jwtAccessToken })
        );
        dispatch(fetchUser({ userId, jwtAccessToken }));
      }
    }
    if (status === 'succeeded') {
      navigate(redirectTo, {
        replace: true,
      });
    }
  }, [
    status,
    isLoggedIn,
    profilePicture,
    jwtAccessToken,
    dispatch,
    navigate,
    redirectTo,
    userId,
  ]);
}
