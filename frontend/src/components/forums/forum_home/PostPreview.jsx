import "./PostPreview.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSortedForums } from "../../../store/reducers/forums-reducer";
import { useState } from "react";
import { fetchForumList } from "../../../services/forum";
import ForumQuickView from "./ForumQuickView";
import ReportModal from "./ReportModal";
export const post_previews = [
  {
    id: 1,
    name: "Bob",
    title: "Lorem ipsum dolor sit amet, duo dolore erroribus ut?",
  },
  {
    id: 2,
    name: "Jimmy",
    title: "An atqui vocent est, an dicunt iuvaret comprehensam eam?",
  },
  {
    id: 3,
    name: "Steve",
    title:
      "Quo no quot virtute, te est paulo civibus facilisi, melius hendrerit has at?",
  },
  {
    id: 4,
    name: "SuperLongUsername",
    title:
      "An sit purto melius recusabo. Vocibus delectus vim at, eros viderer referrentur et has?",
  },
  {
    id: 5,
    name: "Your Mom",
    title: "An epicurei rationibus vituperata mei, ea odio veri reque nec.",
  },
];

export default function PostPreview() {
  const [page, setPage] = useState(1);
  const [loadMorePages, setLoadMorePages] = useState(false);
  const [sortBy, setSortBy] = useState("createdDate");
  const { filterBy: filterForumBy, sortBy: sortForumBy } = useSelector(
    (state) => state.forums
  );

  const dispatch = useDispatch();
  const forums = useSelector(selectSortedForums);

  let showedForums = forums;
  if (filterForumBy !== "") {
    showedForums = forums.filter((forum) =>
      forum.tags.find((tag) => tag.tagId === filterForumBy)
    );
  }
  if (sortForumBy !== "createdDate") {
    showedForums = forums;
  }
  const clickViewMorePages = (event) => {
    event.preventDefault();
    dispatch(fetchForumList({ page: page, size: 10, sortBy: sortBy }));
    setPage(page + 1);
    setLoadMorePages(!loadMorePages);
  };

  return (
    <>
      <ReportModal />
      <div>
        {showedForums.map((forum) => (
          <ForumQuickView
            key={forum?.pageId}
            pageId={forum?.pageId}
            title={forum?.title}
            userDto={forum?.userDto}
            upVotes={forum?.upVotes}
            downVotes={forum?.downVotes}
          />
        ))}
        <div className="row justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={clickViewMorePages}
          >
            load more pages..
          </button>
        </div>
      </div>
    </>
  );
}
