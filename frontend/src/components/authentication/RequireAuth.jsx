import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// checking to see if the user is properly authenticated
export default function RequireAuth() {
  const location = useLocation();
  // if the user is loggedin and there is an access token then we can gauranteed the user
  // is authenticated
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  return isLoggedIn && jwtAccessToken !== '' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
