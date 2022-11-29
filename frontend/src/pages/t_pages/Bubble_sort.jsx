import AlgoFram from "../../components/algo-frame/AlgoFrame";
// import AlgVisBtns from "../../components/topic_page_samples/bubble_sort/alg_vis_btns/AlgVisBtns"
import Detail from "../../components/topic_page_samples/bubble_sort/detail/Detail";
import CodeSnippet from "../../components/topic_page_samples/bubble_sort/code-snippet/CodeSnippet";
//import TopicQuiz from "../../components/topic_page_samples/bubble_sort/topic_quiz/TopicQuiz"
import CommentFrame from "../../components/comment/CommentFrame";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTopic } from "../../services/topic";
import { forumActions } from "../../store/reducers/forum-reducer";
import { useEffect } from "react";

var bubble_url = "https://algorithm-visualizer.org/brute-force/bubble-sort";
var viz_title = "BUBBLE SORT";
const BUBBLE_SORT_PAGE_ID = "3ba9a5c8-a328-4c88-80e0-57872ed56bde";
export default function Bubble_sort() {
  const dispatch = useDispatch();
  const { status, forum } = useSelector((state) => state.forum);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSingleTopic(BUBBLE_SORT_PAGE_ID));
    }
    if (status === "success") {
      dispatch(forumActions.resetData());
    }
  }, [status, dispatch]);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <AlgoFram vis_url={bubble_url} viz_title={viz_title}/>
      <Detail />
      <CodeSnippet />
      {/*<TopicQuiz/> */}
      {status === "completed" && forum && (
        <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
      )}
    </>
  );
}
