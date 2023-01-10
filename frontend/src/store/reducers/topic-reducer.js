import { createSlice } from '@reduxjs/toolkit';
import {
  reportTopic,
  createTopic,
  deleteTopic,
  updateTopic,
} from '../../services/topic';

// initial state for slice  which defines the data for this specific domain
const initialState = {
  topic: {},
  pageId: '',
  status: 'idle',
  error: '',
  reportId: '',
};

// creation of the slice, reducers or function that mutate the state
export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    resetData: (state) => {
      state.Topic = {};
      state.status = 'idle';
      state.error = '';
      state.pageId = '';
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
      // .addCase(fetchSingleTopic.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchSingleTopic.fulfilled, (state, action) => {
      //   console.log("in here");
      //   state.status = "success";
      //   state.Topic = {
      //     ...action.payload,
      //     createdDate: new Date(action.payload.createdDate).toISOString(),
      //   };
      //   state.pageId = "";
      // })
      // .addCase(fetchSingleTopic.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action?.error?.message;
      // })
      .addCase(createTopic.fulfilled, (state, action) => {
        if (!action?.payload) {
          console.log('nothing passed');
          return;
        }
        state.status = 'successToIdle';
        state.pageId = action.payload;
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        if (action?.payload) {
          return;
        }
        if (state.topic.pageId === action?.payload) {
          state.topic = {};
          state.status = 'idle';
          state.error = '';
          state.pageId = '';
        }
      })
      .addCase(updateTopic.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.status = 'completed';
        state.topic = {
          ...action.payload,
          createdDate: new Date(action.payload.createdDate).toISOString(),
        };
        state.pageId = '';
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
      });
  },
});

export const topicActions = topicSlice.actions;
