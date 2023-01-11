// import AlgoFram from "../../components/topic_page_samples/arrays/algo-frame/AlgoFrame"
// import AlgVisBtns from  "../../components/topic_page_samples/arrays/alg_vis_btns/AlgVisBtns"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Detail from '../../components/topic_page_samples/arrays/detail/Detail';
import CodeSnippet from '../../components/topic_page_samples/arrays/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page_samples/arrays/topic_quiz/TopicQuiz"
import CommentFrame from '../../components/comment/CommentFrame';
import { fetchSingleTopic } from '../../services/topic';
import { forumActions } from '../../store/reducers/forum-reducer';
import { listVotesByPage } from '../../services/comment';
import { commentActions } from '../../store/reducers/comment-reducer';
import { commentVoteActions } from '../../store/reducers/comment-vote-reducer';

const ARRAY_PAGE_ID = 'c9fc9f60-6468-45ed-ab1f-5463f4b72865';

export default function Arrays() {
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
      dispatch(fetchSingleTopic(ARRAY_PAGE_ID));
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
      ARRAY_PAGE_ID !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId: ARRAY_PAGE_ID,
          userId: authUserId,
        })
      );
    }
  }, [authUserId, dispatch, isLoggedIn, jwtAccessToken, commentVoteStatus]);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <Detail />
      <CodeSnippet />
      {/* <TopicQuiz/> */}
      {status === 'completed' && forum && (
        <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
      )}
    </>
  );
}
