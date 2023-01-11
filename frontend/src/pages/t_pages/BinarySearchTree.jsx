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
import { listVotesByPage } from '../../services/comment';
import { commentActions } from '../../store/reducers/comment-reducer';
import { commentVoteActions } from '../../store/reducers/comment-vote-reducer';

const bst =
  'https://algorithm-visualizer.org/branch-and-bound/binary-search-tree';
const VIZ_TITLE = 'BINARY SEARCH TREE';
const BINARY_SEARCH_PAGE_ID = '7940b97e-d662-4c19-a2bc-2cd74f3fe25c';

export default function BinarySearchTree() {
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    jwtAccessToken,
    userId: authUserId,
  } = useSelector((state) => state.auth);
  const { status, forum } = useSelector((state) => state.forum);
  const { status: commentVoteStatus } = useSelector(
    (state) => state.commentVotes
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleTopic(BINARY_SEARCH_PAGE_ID));
    }
    if (status === 'success') {
      dispatch(commentVoteActions.resetData());
      dispatch(commentActions.resetData());
      dispatch(forumActions.resetData());
    }
    if (status === 'completed') {
      dispatch(commentActions.resetData());
      dispatch(commentVoteActions.resetData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (
      commentVoteStatus === 'idle' &&
      jwtAccessToken !== '' &&
      isLoggedIn &&
      authUserId !== '' &&
      BINARY_SEARCH_PAGE_ID !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId: BINARY_SEARCH_PAGE_ID,
          userId: authUserId,
        })
      );
    }
  }, [authUserId, dispatch, isLoggedIn, jwtAccessToken, commentVoteStatus]);

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
