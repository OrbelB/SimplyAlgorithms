import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice';
import { userSlice } from './user-slice';
import { forumsSlice } from './forums-slice';
import { forumSlice } from './forum-slice';
import { tagSlice } from './tags-slice';
import { commentSlice } from './comment-slice';
import { commentVotesSlice } from './comment-vote-slice';
import { viewedForumsSlice } from './viewed-forums-slice';
import { topicSlice } from './topic-slice';
import { topicVotesSlice } from './topic-votes-slice';
import { forumVotesSlice } from './forum-vote-slice';
import { quizSlice } from './quiz-slice';
import { wikiSlice } from './wiki-slice';
import { noteSlice } from './note-slice';
import { reportSlice } from './report-slice';
import { botSlice } from './bot-slice';

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
  wiki: wikiSlice.reducer,
  note: noteSlice.reducer,
  report: reportSlice.reducer,
  bot: botSlice.reducer,
});

export default rootReducer;
