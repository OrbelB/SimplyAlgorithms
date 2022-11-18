import { authSlice } from "./auth-reducer";
import { combineReducers } from "@reduxjs/toolkit";
import { httpSlice } from "./httpStatus-reducer";
import { userSlice } from "./user-reducer";
import { forumsSlice } from "./forums-reducer";
import { forumSlice } from "./forum-reducer";
import { tagSlice } from "./tags-reducer";
import { commentSlice } from "./comment-reducer";
import { commentVotesSlice } from "./comment-vote-reducer";
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  http: httpSlice.reducer,
  user: userSlice.reducer,
  forums: forumsSlice.reducer,
  forum: forumSlice.reducer,
  tags: tagSlice.reducer,
  comment: commentSlice.reducer,
  commentVotes: commentVotesSlice.reducer,
});
