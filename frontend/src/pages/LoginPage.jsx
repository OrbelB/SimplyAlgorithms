import { useLocation } from 'react-router-dom';
import Login from '../components/login/Login';
import useLoginUser from '../hooks/use-loginuser';

export default function LoginPage() {
  const location = useLocation();
  // if there is not a history of prev pages visited returned to home
  const redirectTo = location?.state?.from?.pathname || '/home';
  useLoginUser(redirectTo);
  return <Login />;
}
