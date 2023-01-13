import { useDispatch, useSelector } from 'react-redux';

import { useNavigate, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { fetchUser } from '../services/user';
import templateImage from '../assets/noPictureTemplate.png';
import Login from '../components/login/Login';

export default function LoginPage() {
  // selects specifics attrs from the auth domain
  const { jwtAccessToken, userId, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const { profilePicture, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // if there is not a history of prev pages visited returned to home
  const redirectTo = location?.state?.from?.pathname || '/home';

  // runs everytime anything on the dependency array gets updated; used to check if
  // a user has properly logged in
  useEffect(() => {
    if (isLoggedIn && profilePicture === templateImage) {
      if (status === 'idle') {
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

  return <Login />;
}
