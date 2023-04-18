import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUser,
  fetchUserDayStreak,
  fetchUserNotifications,
} from '../services/user';
import { refreshAccessToken } from '../services/auth';
import { authActions } from '../store/reducers/auth-slice';
import image from '../assets/person-fill.png';

export default function useRefreshToken() {
  const { jwtRefreshToken, userId, isLoggedIn, jwtAccessToken, status } =
    useSelector((state) => state.auth);
  const { profilePicture } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [once, setOnce] = useState(true);

  useEffect(() => {
    if (jwtRefreshToken !== '' && once && !isLoggedIn) {
      setOnce(false);
      dispatch(refreshAccessToken(jwtRefreshToken));
    }

    if (
      status === 'success' &&
      userId !== '' &&
      !isLoggedIn &&
      jwtAccessToken &&
      profilePicture === image
    ) {
      dispatch(fetchUserDayStreak({ userId, jwtAccessToken }));
      dispatch(
        fetchUserNotifications({ userId, page: 0, size: 12, jwtAccessToken })
      );
      dispatch(fetchUser({ userId, jwtAccessToken }));
    }

    if (profilePicture !== image && !isLoggedIn) {
      dispatch(authActions.setIsLoggedIn());
    }
  }, [
    dispatch,
    isLoggedIn,
    jwtAccessToken,
    profilePicture,
    userId,
    status,
    jwtRefreshToken,
    once,
  ]);
}
