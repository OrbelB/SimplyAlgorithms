import Login from "../components/login/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import templateImage from "../assets/noPictureTemplate.png";
import { fetchUser } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function LoginPage() {
  const { jwtAccessToken, userId, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { profilePicture, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname || "home";

  if (isLoggedIn && profilePicture === templateImage) {
    if (status === "idle") {
      dispatch(fetchUser({ userId, jwtAccessToken }));
    }
  }

  if (status === "loading") {
    console.log("Loading");
  }
  if (status === "succeeded") {
    navigate(redirectTo, {
      replace: true,
    });
  }
  return <Login />;
}
