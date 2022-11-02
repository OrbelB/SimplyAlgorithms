import { get } from "./base";
export const PUBLIC_ENDPOINT_ROUTE = "/users";

export const userEndpoints = {
  singleById: (id, jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtAccessToken,
      },
    }),
};
