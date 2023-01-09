import { refreshAccessToken } from '../auth';
import { apiClient } from './base';

const interceptors = (store) => {
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
        store.getState().auth.jwtAccessToken !== '' &&
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
      }
      return Promise.reject(error);
    }
  );
};

export default interceptors;
