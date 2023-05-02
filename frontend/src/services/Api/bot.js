import { get, put } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/chatty';

export const botEndpoints = {
  getSingle: (jwtAccessToken) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/get-chatty-setting`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    }),
  update: (chattySetting, jwtAccessToken) =>
    put(`${PUBLIC_ENDPOINT_ROUTE}/update`, chattySetting, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtAccessToken}`,
      },
    }),
};
