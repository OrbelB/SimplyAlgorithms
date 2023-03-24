import { createSlice } from '@reduxjs/toolkit';
import {
  reportTopic,
  createTopic,
  deleteTopic,
  updateTopic,
  fetchSingleTopic,
  fetchTopicNames,
  getNameAvailability,
} from '../../services/topic';

// initial state for slice  which defines the data for this specific domain
const initialState = {
  topic: {},
  pageId: null,
  urlPath: null,
  status: 'idle',
  topicNames: [],
  error: '',
  reportId: '',
  nameAvailable: null,
};

// creation of the slice, reducers or function that mutate the state
export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    resetData: (state) => {
      state.topic = {};
      state.topicNames = [];
      state.nameAvailable = null;
      state.reportId = '';
      state.status = 'idle';
      state.error = '';
      state.pageId = '';
      state.urlPath = null;
    },
    addSingleReply: (state, action) => {
      state.topic.comments = state.topic.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount += 1;
          return comment;
        }
        return comment;
      });
    },
    removeSingleReply: (state, action) => {
      state.topic.comments = state.topic.comments.map((comment) => {
        if (comment.commentId === action.payload?.commentId) {
          comment.replyCount -= 1;
          return comment;
        }
        return comment;
      });
    },
    // eslint-disable-next-line no-return-assign
    removeSingleReportId: (state) => void (state.reportId = ''),
    switchStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    // extra reducers used to handle the api call on updates
    builder
      .addCase(fetchSingleTopic.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleTopic.fulfilled, (state, action) => {
        state.topic = {
          ...action.payload,
          createdDate: new Date(action.payload?.createdDate ?? 0).toISOString(),
        };
        state.pageId = '';
        state.status = 'success';
      })
      .addCase(fetchSingleTopic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.error?.message;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        if (!action?.payload) {
          return;
        }
        state.status = 'success';
        state.urlPath = action.payload;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        if (action?.payload) {
          return;
        }
        state.topic = {};
        state.topicNames = [];
        state.nameAvailable = null;
        state.reportId = '';
        state.status = 'idle';
        state.error = '';
        state.pageId = '';
        state.urlPath = null;
      })
      .addCase(updateTopic.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.status = 'success';
        state.urlPath = action.payload;
      })
      .addCase(updateTopic.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(reportTopic.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(reportTopic.fulfilled, (state, action) => {
        state.status = 'success';
        state.reportId = action.payload;
      })
      .addCase(fetchTopicNames.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTopicNames.fulfilled, (state, action) => {
        state.status = 'success';
        state.topicNames = action.payload;
      })
      .addCase(fetchTopicNames.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getNameAvailability.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getNameAvailability.fulfilled, (state, action) => {
        state.status = 'success';
        state.nameAvailable = action.payload;
      })
      .addCase(getNameAvailability.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const topicActions = topicSlice.actions;
