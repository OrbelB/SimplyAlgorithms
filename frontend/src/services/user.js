import { userEndpoints } from "./Api/user";
import { userActions } from "../store/reducers/user-reducer";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { statusActions } from "../store/reducers/httpStatus-reducer";
import { GET_SINGLE_USER } from "../store/actions/types";

export const userMiddleware = createListenerMiddleware();

userMiddleware.startListening({
  type: GET_SINGLE_USER,
  effect: async (action, listenerApi) => {
    const response = userEndpoints
      .singleById(action.payload?.userId, action.payload?.jwtAccessToken)
      .catch((error) => {
        if (error?.response) {
          listenerApi.dispatch(
            statusActions.setStatus({
              statusCode: error?.response.status,
            })
          );
          return;
        }
      }); 
    const responseData = await response;

  
    listenerApi.dispatch(
      userActions.setState({
        username: responseData.data.username,
        profilePicture: responseData.data.profilePicture,
        email: responseData?.data.email,
      })
    );
    listenerApi.dispatch(
      statusActions.setStatus({
        statusCode: responseData.status,
      })
    );
  },
});
