import Login from "../components/login/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import templateImage from "../assets/noPictureTemplate.png";
import { GET_SINGLE_USER } from "../store/actions/types";
export default function LoginPage() {
  const { jwtAccessToken , userId,isLoggedIn} = useSelector((state) => state.auth);
  const profilePicture = useSelector(state => state.user.profilePicture);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(isLoggedIn && profilePicture === templateImage){
      dispatch({type: GET_SINGLE_USER, payload : { jwtAccessToken, userId }});
    }
  })
  return <Login />;
}
