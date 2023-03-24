import { createAsyncThunk } from '@reduxjs/toolkit';
import { wikiEndpoints } from './Api/wiki';

export const fetchWikiList = createAsyncThunk(
  'wiki/getList',
  async (pageParams) => {
    const { page, size, sortBy } = pageParams;
    const response = await wikiEndpoints
      .list(page, size, sortBy)
      .catch((error) => {
        return error;
      });
    return response.data;
  }
);

export const fetchSingleWiki = createAsyncThunk(
  'wiki/singleWiki',
  async (wikiName) => {
    const response = await wikiEndpoints.singleByName(wikiName);
    return response.data;
  }
);

export const createWiki = createAsyncThunk(
  'wiki/create',
  async (passedParams) => {
    const { wiki, jwtAccessToken } = passedParams;
    const response = await wikiEndpoints.create(wiki, jwtAccessToken);
    return response.data;
  }
);

export const updateWiki = createAsyncThunk(
  'wiki/update',
  async (passedParams) => {
    const { wiki, jwtAccessToken } = passedParams;
    const response = await wikiEndpoints.update(wiki, jwtAccessToken);

    return response.data;
  }
);

export const getNameAvailability = createAsyncThunk(
  'wiki/isNameAvailable',
  async (passedParams) => {
    const { name } = passedParams;
    const response = await wikiEndpoints.nameIsAvailable(name);

    return response.data;
  }
);

export const fetchWikiNames = createAsyncThunk(
  'wiki/getAvailableWikis',
  async () => {
    const response = await wikiEndpoints.listAvailableWikis();
    return response.data;
  }
);

export const deleteWiki = createAsyncThunk(
  'wiki/delete',
  async (passedParams) => {
    const { wikiId, jwtAccessToken } = passedParams;
    const response = await wikiEndpoints.delete(wikiId, jwtAccessToken);
    return response.data;
  }
);

export const fetchSubCategories = createAsyncThunk(
  'wiki/getSubCategories',
  async () => {
    const response = await wikiEndpoints.listSubCategories();
    return response.data;
  }
);

export const fetchWikiSubCategoriesNames = createAsyncThunk(
  'wiki/getSubCategoriesNames',
  async () => {
    const response = await wikiEndpoints.listAvailableSubCategories();
    return response.data;
  }
);

export const fetchWikiLinks = createAsyncThunk('wiki/getLinks', async () => {
  const response = await wikiEndpoints.listLinks();
  return response.data;
});
