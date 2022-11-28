import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function RequireAuth() {
  const location = useLocation();
  const { isLoggedIn, jwtAccessToken } = useSelector((state) => state.auth);
  return isLoggedIn && jwtAccessToken !== "" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
