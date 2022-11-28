import axios from "axios";
import { refreshAccessToken } from "../auth";
const AWS_BASE_URL = "http://simplyalgosserver-env.eba-wmcrmidx.us-east-1.elasticbeanstalk.com:5000";
const main ="https://www.api.simplyalgorithms.com"

const LOCALHOST_BASE_URL = "http://localhost:5000";
const apiClient = axios.create({
  baseURL:main,
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
      if (
        status === 401 &&
        store.getState().auth.jwtAccessToken !== "" &&
        !originalRequest?.sent
      ) {
        await store.dispatch(
          refreshAccessToken(store.getState().auth.jwtRefreshToken)
        );
        // replace the expired token and retry
        originalRequest.sent = true;
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${store.getState().auth.jwtAccessToken}`,
        };
        return apiClient(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }
  );
};
const { get, post, put, delete: destroy } = apiClient;

export { get, post, put, destroy };
