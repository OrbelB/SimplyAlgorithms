// import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';

// import { useEffect } from 'react';
// import { fetchUser, fetchUserDashboardInfo } from '../services/user';
// import templateImage from '../assets/noPictureTemplate.png';
import Login from '../components/login/Login';
import useLoginUser from '../hooks/use-loginuser';

export default function LoginPage() {
  const location = useLocation();
  // if there is not a history of prev pages visited returned to home
  const redirectTo = location?.state?.from?.pathname || '/home';
  useLoginUser(redirectTo);
  // selects specifics attrs from the auth domain
  // const { jwtAccessToken, userId, isLoggedIn } = useSelector(
  //   (state) => state.auth
  // );

  // const { profilePicture, status } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // // runs everytime anything on the dependency array gets updated; used to check if
  // // a user has properly logged in
  // useEffect(() => {
  //   if (isLoggedIn && profilePicture === templateImage) {
  //     if (status === 'idle') {
  //       dispatch(fetchUser({ userId, jwtAccessToken }));
  //       dispatch(fetchUserDashboardInfo({ userId, jwtAccessToken }));
  //     }
  //   }
  //   if (status === 'succeeded') {
  //     navigate(redirectTo, {
  //       replace: true,
  //     });
  //   }
  // }, [
  //   status,
  //   isLoggedIn,
  //   profilePicture,
  //   jwtAccessToken,
  //   dispatch,
  //   navigate,
  //   redirectTo,
  //   userId,
  // ]);

  return <Login />;
}
