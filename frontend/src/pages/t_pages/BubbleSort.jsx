/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';
import AlgoFram from '../../components/algo-frame/AlgoFrame';
// import AlgVisBtns from "../../components/topic_page_samples/bubble_sort/alg_vis_btns/AlgVisBtns"
import Detail from '../../components/topic_page_samples/bubble_sort/detail/Detail';
import CodeSnippet from '../../components/topic_page_samples/bubble_sort/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page_samples/bubble_sort/topic_quiz/TopicQuiz"
import CommentFrame from '../../components/comment/CommentFrame';
import { fetchSingleTopic } from '../../services/topic';
import { forumActions } from '../../store/reducers/forum-slice';
import { listVotesByPage } from '../../services/comment';
import { commentActions } from '../../store/reducers/comment-slice';
import { commentVoteActions } from '../../store/reducers/comment-vote-slice';
import NavbarTopic from '../../components/navbarFortopic/NavbarTopic';
import Vote from '../../components/vote_comp/Vote';
import ForumPreview from '../../components/forums-preview/ForumPreview';

const BUBBLE_SORT_URL =
  'https://algorithm-visualizer.org/brute-force/bubble-sort';
const VIZ_TITLE = 'BUBBLE SORT';
const BUBBLE_SORT_PAGE_ID = '3ba9a5c8-a328-4c88-80e0-57872ed56bde';

export default function BubbleSort() {
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
      dispatch(fetchSingleTopic(BUBBLE_SORT_PAGE_ID));
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
      BUBBLE_SORT_PAGE_ID !== ''
    ) {
      dispatch(
        listVotesByPage({
          pageId: BUBBLE_SORT_PAGE_ID,
          userId: authUserId,
        })
      );
    }
  }, [authUserId, dispatch, isLoggedIn, jwtAccessToken, commentVoteStatus]);

  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
    threshold: 50,
  });

  useEffect(() => {
    if (!trigger) {
      setOpen(true);
      setIsScrolling(true);
      setTimeout(() => {
        setIsScrolling(false);
      }, 2500);
    }
  }, [trigger]);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setOpen(true);
      setIsScrolling(true);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 2500);
    };

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return (
    <>
      {/* <AlgoFram/> */}
      {/* <AlgVisBtns/> */}
      <section id="visualizer">
        <AlgoFram
          vis_url={BUBBLE_SORT_URL}
          viz_title={VIZ_TITLE}
          vis_source="algorithms.org"
        />
      </section>

      <Slide
        direction="up"
        className="position-fixed m-2 bottom-0 start-0"
        in={!isScrolling && open}
      >
        <div>
          <Vote like_={0} dislike_={0} />
        </div>
      </Slide>

      <Slide
        direction="up"
        className="position-fixed m-3 d-none d-lg-flex"
        style={{
          bottom: '0',
          left: '40%',
          transform: 'translateX(-50%)',
          margin: '0 auto',
        }}
        in={!isScrolling && open}
      >
        <div>
          <NavbarTopic />
        </div>
      </Slide>
      <section id="content">
        <Detail />
      </section>
      <section id="code">
        <CodeSnippet />
      </section>
      <section id="forumspreview">
        <ForumPreview />
      </section>
      {/* <TopicQuiz/> */}
      <section id="comments">
        {status === 'completed' && forum && (
          <CommentFrame passedComments={forum.comments} pageId={forum.pageId} />
        )}
      </section>
    </>
  );
}
