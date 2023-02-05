import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, fetchUserDashboardInfo } from '../services/user';
import { refreshAccessToken } from '../services/auth';
import { authActions } from '../store/reducers/auth-reducer';
import image from '../assets/noPictureTemplate.png';

export default function useRefreshToken() {
  const { jwtRefreshToken, userId, isLoggedIn, jwtAccessToken, status } =
    useSelector((state) => state.auth);
  const { profilePicture } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [once, setOnce] = useState(true);

  useEffect(() => {
    console.count();
    if (jwtRefreshToken !== '' && once) {
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
      dispatch(fetchUserDashboardInfo({ userId, jwtAccessToken }));
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
