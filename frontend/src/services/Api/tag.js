import { get } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/tags';

export const tagEndpoints = {
  list: (page, size) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        page,
        size,
      },
    }),
};
