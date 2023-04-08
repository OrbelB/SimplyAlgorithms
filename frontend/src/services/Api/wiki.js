/* eslint-disable prefer-template */
import { get, post, destroy, put } from './base';

export const PUBLIC_ENDPOINT_ROUTE = '/wiki';

export const wikiEndpoints = {
  singleById: (id) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  singleByName: (wikiName) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/${wikiName}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  nameIsAvailable: (name) =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/name/available`, {
      params: {
        name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  create: (wiki, jwtAccessToken) =>
    post(
      `${PUBLIC_ENDPOINT_ROUTE}/create`,
      {
        wikiName: wiki.wikiName,
        description: wiki.description,
        pageIds: wiki.pageIds,
        wikiIds: wiki.wikiIds,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  listLinks: () =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  listAvailableWikis: () =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/available`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  listSubCategories: () =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/subcategories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  delete: (wikiId, jwtAccessToken) =>
    destroy(`${PUBLIC_ENDPOINT_ROUTE}/delete`, {
      params: {
        wikiId,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtAccessToken,
      },
    }),
  update: (updatedWiki, jwtAccessToken) =>
    put(
      `${PUBLIC_ENDPOINT_ROUTE}/update`,
      {
        wikiId: updatedWiki.wikiId,
        wikiName: updatedWiki.wikiName,
        description: updatedWiki.description,
        pageIds: updatedWiki.pageIds,
        wikiIds: updatedWiki.wikiIds,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtAccessToken}`,
        },
      }
    ),
  listAvailableSubCategories: () =>
    get(`${PUBLIC_ENDPOINT_ROUTE}/list/available/subcategories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};
