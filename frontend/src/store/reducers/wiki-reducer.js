import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSingleWiki,
  createWiki,
  updateWiki,
  getNameAvailability,
  fetchWikiNames,
  fetchSubCategories,
} from '../../services/wiki';

const initialState = {
  wiki: {},
  wikiNames: [],
  subCategories: [],
  status: 'idle',
  wikiId: null,
  error: '',
  nameAvailable: null,
};

export const wikiSlice = createSlice({
  name: 'wiki',
  initialState,
  reducers: {
    resetData: (state) => {
      state.wiki = {};
      state.subCategories = [];
      state.wikiId = null;
      state.wikiNames = [];
      state.status = 'idle';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleWiki.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleWiki.fulfilled, (state, action) => {
        state.status = 'success';
        const links = {
          title: action.payload.wikiName,
          pages: [],
        };
        if (action.payload.isParentChild === 'parent') {
          links.pages = action.payload.wikiChildren.map((child) => {
            return { title: child.wikiChild.wikiName };
          });
        } else if (action.payload.isParentChild === 'child') {
          links.pages = action.payload.wikiTopicPages.map((topicPage) => {
            return { title: topicPage.topicPage.title };
          });
        }
        state.wiki = {
          ...action.payload,
          links,
        };
      })
      .addCase(fetchSingleWiki.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWikiNames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWikiNames.fulfilled, (state, action) => {
        state.status = 'success';
        state.wikiNames = action.payload;
      })
      .addCase(fetchWikiNames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getNameAvailability.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNameAvailability.fulfilled, (state, action) => {
        state.status = 'success';
        state.nameAvailable = action.payload;
      })
      .addCase(getNameAvailability.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createWiki.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWiki.fulfilled, (state, action) => {
        state.wikiId = action.payload;
        state.status = 'success';
      })
      .addCase(createWiki.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateWiki.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateWiki.fulfilled, (state, action) => {
        state.status = 'success';
        state.wikiId = action.payload;
      })
      .addCase(updateWiki.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSubCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const wikiActions = wikiSlice.actions;
