import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AlgoFram from '../../components/algo-frame/AlgoFrame';
// import AlgVisBtns from  "../../components/topic_page_samples/binary_search_tree/alg_vis_btns/AlgVisBtns"
import Detail from '../../components/topic_page_samples/binary_search_tree/detail/Detail';
import CodeSnippet from '../../components/topic_page_samples/binary_search_tree/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page_samples/binary_search_tree/topic_quiz/TopicQuiz"
import CommentFrame from '../../components/comment/CommentFrame';
import { fetchSingleTopic } from '../../services/topic';
import { forumActions } from '../../store/reducers/forum-reducer';

const bst =
  'https://algorithm-visualizer.org/branch-and-bound/binary-search-tree';
const VIZ_TITLE = 'BINARY SEARCH TREE';
const BINARY_SEARCH_PAGE_ID = '7940b97e-d662-4c19-a2bc-2cd74f3fe25c';
export default function BinarySearchTree() {
  const dispatch = useDispatch();
  const { status, forum } = useSelector((state) => state.forum);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleTopic(BINARY_SEARCH_PAGE_ID));
    }
    if (status === 'success') {
      dispatch(forumActions.resetData());
    }
  }, [status, dispatch]);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <AlgoFram vis_url={bst} viz_title={VIZ_TITLE} />
      <Detail />
      <CodeSnippet />
      {/* <TopicQuiz/> */}
      {status === 'completed' && forum && (
        <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
      )}
    </>
  );
}
