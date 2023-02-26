import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-reducer';
import { userSlice } from './user-reducer';
import { forumsSlice } from './forums-reducer';
import { forumSlice } from './forum-reducer';
import { tagSlice } from './tags-reducer';
import { commentSlice } from './comment-reducer';
import { commentVotesSlice } from './comment-vote-reducer';
import { viewedForumsSlice } from './viewed-forums-reducer';
import { topicSlice } from './topic-reducer';
import { topicVotesSlice } from './topic-votes-reducer';
import { forumVotesSlice } from './forum-vote-reducer';
import { quizSlice } from './quiz-reducer';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  forums: forumsSlice.reducer,
  forum: forumSlice.reducer,
  tags: tagSlice.reducer,
  comment: commentSlice.reducer,
  commentVotes: commentVotesSlice.reducer,
  viewedForums: viewedForumsSlice.reducer,
  topic: topicSlice.reducer,
  topicVotes: topicVotesSlice.reducer,
  forumVotes: forumVotesSlice.reducer,
  quiz: quizSlice.reducer,
});

export default rootReducer;
