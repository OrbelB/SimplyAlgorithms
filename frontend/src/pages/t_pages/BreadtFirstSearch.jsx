import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AlgoFram from '../../components/algo-frame/AlgoFrame';
// import AlgVisBtns from  "../../components/topic_page_samples/breath_first_search/alg_vis_btns/AlgVisBtns"
import Detail from '../../components/topic_page_samples/breath_first_search/detail/Detail';
import CodeSnippet from '../../components/topic_page_samples/breath_first_search/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page_samples/breath_first_search/topic_quiz/TopicQuiz"
import CommentFrame from '../../components/comment/CommentFrame';
import { fetchSingleTopic } from '../../services/topic';
import { forumActions } from '../../store/reducers/forum-reducer';
import { listVotesByPage } from '../../services/comment';
import { commentActions } from '../../store/reducers/comment-reducer';
import { commentVoteActions } from '../../store/reducers/comment-vote-reducer';

const bfs = 'https://algorithm-visualizer.org/brute-force/breadth-first-search';
const VIZ_TITLE = 'BREADTH FIRST SEARCH';
const BFS_PAGE_ID = '54e9d8be-f123-4360-9c76-0c4c2ccd99eb';
export default function BreadthFirstSearch() {
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
      dispatch(fetchSingleTopic(BFS_PAGE_ID));
    }
    if (status === 'success') {
      dispatch(forumActions.resetData());
      dispatch(commentActions.resetData());
      dispatch(commentVoteActions.resetData());
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
      BFS_PAGE_ID !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId: BFS_PAGE_ID,
          userId: authUserId,
        })
      );
    }
  }, [authUserId, dispatch, isLoggedIn, jwtAccessToken, commentVoteStatus]);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <AlgoFram vis_url={bfs} viz_title={VIZ_TITLE} />
      <Detail />
      <CodeSnippet />
      {/* <TopicQuiz/> */}
      {status === 'completed' && forum && (
        <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
      )}
    </>
  );
}
