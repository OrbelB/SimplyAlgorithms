import { authSlice } from "./auth-reducer";
import { combineReducers } from "@reduxjs/toolkit";
import { httpSlice } from "./httpStatus-reducer";
import { userSlice } from "./user-reducer";
import { forumsSlice } from "./forums-reducer";
import { forumSlice } from "./forum-reducer";
import { tagSlice } from "./tags-reducer";
import { commentSlice } from "./comment-reducer";
import { commentVotesSlice } from "./comment-vote-reducer";
import { viewedForumsSlice } from "./viewed-forums-reducer";
import { topicSlice } from "./topic-reducer";
import { topicVotesSlice } from "./topic-votes-reducer";
import { forumVotesSlice } from "./forum-votes-reducer";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  http: httpSlice.reducer,
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
});
