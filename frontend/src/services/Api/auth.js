import { post } from './base';

const PUBLIC_ENDPOINT_ROUTE = '/api/public';

const authEndpoints = {
  register: (userToAuthenticate) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/register`,
      {
        username: userToAuthenticate?.username,
        password: userToAuthenticate?.password,
        email: userToAuthenticate?.email,
        firstName: userToAuthenticate?.firstName,
        lastName: userToAuthenticate?.lastName,
        profilePicture: userToAuthenticate?.profilePicture,
        dob: userToAuthenticate?.dob,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  login: (username, password) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/login`,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  singleByRefreshToken: (jwtRefreshToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/token`,
      {
        refreshToken: jwtRefreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  resetPasswordRequest: (username) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/resetPasswordRequest`,
      {
        username,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
  changePassword: (passwordRestObj) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/changePassword`,
      {
        passwordToken: passwordRestObj?.passwordToken,
        newPassword: passwordRestObj?.newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ),
};

export default authEndpoints;
