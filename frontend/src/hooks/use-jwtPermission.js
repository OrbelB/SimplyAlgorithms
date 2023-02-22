import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

export default function useJwtPermssionExists({ permission }) {
  const { jwtAccessToken } = useSelector((state) => state.auth);

  // if token is not been set yet, return false
  if (!jwtAccessToken) return false;
  const decodedToken = jwtDecode(jwtAccessToken);
  const isIncluded = decodedToken.roles.includes(permission);
  return isIncluded;
}
