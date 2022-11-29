import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUser } from "../services/user";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import templateImage from "../assets/noPictureTemplate.png";

  export default function useLoginuser(location) {

    const { jwtAccessToken, userId, isLoggedIn } = useSelector(
        (state) => state.auth
      );
      const { profilePicture, status } = useSelector((state) => state.user);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const redirectTo = location?.state?.from?.pathname || "/home";
    
      useEffect(() => { 
        if (isLoggedIn && profilePicture === templateImage) {
          if (status === "idle") {
            dispatch(fetchUser({ userId, jwtAccessToken }));
          }
        }
        if (status === "succeeded") {
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
      return status;
  }