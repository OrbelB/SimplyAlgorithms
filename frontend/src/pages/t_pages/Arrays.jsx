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

const ARRAY_PAGE_ID = 'c9fc9f60-6468-45ed-ab1f-5463f4b72865';
export default function Arrays() {
  const dispatch = useDispatch();
  const { status, forum } = useSelector((state) => state.forum);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSingleTopic(ARRAY_PAGE_ID));
    }
    if (status === 'success') {
      dispatch(forumActions.resetData());
    }
  }, [status, dispatch]);

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
