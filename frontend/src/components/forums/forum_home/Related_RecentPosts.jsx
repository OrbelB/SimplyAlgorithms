import "./PostPreview.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllViewedForums } from "../../../store/reducers/viewed-forums-reducer";
import { fetchUserForumsViewed } from "../../../services/forum";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forumActions } from "../../../store/reducers/forum-reducer";
import { userActions } from "../../../store/reducers/user-reducer";
import { viewForumsActions } from "../../../store/reducers/viewed-forums-reducer";
import {
  selectAllForums,
  selectSortedForums,
} from "../../../store/reducers/forums-reducer";
import { useState } from "react";
import { RiContactsBookLine } from "react-icons/ri";
export default function Related_RecentPosts({ posts = null, tagId = "" , pageId = ""}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewedForums = useSelector(selectAllViewedForums);
  const { status } = useSelector((state) => state.viewedForums);
  const { userId: authUserId, isLoggedIn } = useSelector((state) => state.auth);

  if (status === "idle") {
    if (isLoggedIn && authUserId !== null) {
      dispatch(
        fetchUserForumsViewed({
          userId: authUserId,
          page: 0,
          size: 10,
        })
      );
    }
  }
  if (status === "success") {
    return (
      <div>
        {viewedForums?.map((viewedForum) => (
          <>
            <div
              key={viewedForum?.pageId}
              className="side-section"
              onClick={() => {
                dispatch(forumActions.resetData());
                dispatch(viewForumsActions.resetData({}));
                navigate(`/forums/${viewedForum.pageId}`);
              }}
            >
              <div className="line-one">
                <img
                  className="rounded-circle m-2"
                  height="38"
                  alt="current profile user"
                  loading="lazy"
                  src={viewedForum?.userDto?.profilePicture}
                />
                <h2 className="side-username">
                  {viewedForum?.userDto?.username}
                </h2>
              </div>
              <h2 className="line-two">{viewedForum?.title}</h2>
            </div>
          </>
        ))}
      </div>
    );
  }
}
