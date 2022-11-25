import Forums from "../components/forums/forum_home/Forums";
import { useDispatch, useSelector } from "react-redux";
import { fetchForumList } from "../services/forum";
import Forum from "../components/home_page/forum-quiz/Forum_Quiz";
export default function ForumPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.forums.status);
  if (status === "idle") {
    dispatch(
      fetchForumList({
        page: 0,
        size: 5,
        sortBy: "createdDate",
      })
    );
  }

  return <Forums />;
}
