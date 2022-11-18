import { get, put, destroy } from "./base";
export const PUBLIC_ENDPOINT_ROUTE = "/users";

export const userEndpoints = {
  singleById: (id, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtAccessToken,
      },
    }),
  delete: (userId, accessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      params: {
        userId: userId,
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
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
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
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        },
      }
    ),
};
