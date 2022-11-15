import axios from "axios";
import { refreshAccessToken } from "../auth";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const interceptors = (store) => {
  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;
      if (status === 401 && store.getState().auth.jwtAccessToken !== "") {
        console.log(store.getState().auth.jwtAccessToken);
        store.dispatch(
          refreshAccessToken(store.getState().auth.jwtRefreshToken)
        );
        console.log("second check", store.getState().auth.jwtAccessToken);
        // replace the expired token and retry
        originalRequest.headers["Authorization"] =
          "Bearer " + store.getState().auth.jwtAccessToken;
        originalRequest.headers["Content-Type"] = "application/json";
        return originalRequest;
      } else {
        return Promise.reject(error);
      }
    }
  );
};
const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy };
 