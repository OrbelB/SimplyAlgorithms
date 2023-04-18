/* eslint-disable prefer-template */
import { get, put, destroy } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/users';

export const userEndpoints = {
  singleById: (userId, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  delete: (userIdOrUsername, jwtAccessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      params: {
        userIdOrUsername,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  available: (username, email) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/available`, {
      params: {
        username,
        email,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  update: (updatedUser, accessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        userId: updatedUser?.userId,
        username: updatedUser?.username,
        firstName: updatedUser?.firstName,
        lastName: updatedUser?.lastName,
        email: updatedUser?.email,
        profilePicture: updatedUser?.profilePicture,
        biography: updatedUser?.biography,
        phoneNumber: updatedUser?.phoneNumber,
        dob: updatedUser?.dob,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  updatePassword: (updatedPassword, accessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update-password`,
      {
        userId: updatedPassword?.userId,
        newPassword: updatedPassword?.newPassword,
        oldPassword: updatedPassword?.oldPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  updatePreferences: (updatedPreferences, accessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update-preferences`,
      {
        userId: updatedPreferences.userId,
        accountChanges: updatedPreferences.accountChanges,
        repliesNotification: updatedPreferences.repliesNotification,
        postLikes: updatedPreferences.postLikes,
        postReplies: updatedPreferences.postReplies,
        specialUpdates: updatedPreferences.specialUpdates,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      }
    ),
  deleteNotification: (notificationId, userId, accessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete-notification`, {
      data: {
        userId,
        notificationId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }),
  fetchNotifications: (userId, page, size, sortBy, title, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/notifications`, {
      params: {
        userId,
        page,
        size,
        sortBy,
        title,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  fetchDayStreak: (userId, accessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/dayStreak/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    }),
  requestRoleChange: (roleRequestForm, jwtAccessToken) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/request-role`, roleRequestForm, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  lockAccount: (
    usernameOrId,
    accountLockedSwitch,
    daysToLock,
    jwtAccessToken
  ) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/lock-account`, null, {
      params: {
        usernameOrId,
        accountLockedSwitch,
        daysToLock,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  updateRole: (usernameOrId, role, jwtAccessToken) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/update-role`, null, {
      params: {
        usernameOrId,
        role,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
};
