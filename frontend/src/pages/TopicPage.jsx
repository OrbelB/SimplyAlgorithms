import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Slide, useScrollTrigger } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import {
  fetchSingleTopic,
  fetchVotes,
  deleteTopicVote,
  voteTopic,
} from '../services/topic';
import Report from '../components/report/Report';
import { fetchParentComments, listVotesByPage } from '../services/comment';
import NavbarTopic from '../components/navbarFortopic/NavbarTopic';
import Vote from '../components/vote_comp/Vote';
import AlgoFrame from '../components/algo-frame/AlgoFrame';
import CommentFrame from '../components/comment/CommentFrame';
import ForumPreview from '../components/forums-preview/ForumPreview';
import Detail from '../components/topic_page/detail/Detail';
import CodeSnippet from '../components/topic_page/code-snippet/CodeSnippet';
import { commentActions } from '../store/reducers/comment-slice';
import {
  topicVoteActions,
  selectByTopicVoteId,
} from '../store/reducers/topic-votes-slice';
import { commentVoteActions } from '../store/reducers/comment-vote-slice';

export default function TopicPage() {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userId, jwtAccessToken } = useSelector(
    (state) => state.auth
  );
  const { topic, status: topicStatus } = useSelector((state) => state.topic);
  const { commentParents, status: commentStatus } = useSelector(
    (state) => state.comment
  );
  const [snippetIndex, setSnippetIndex] = useState(0);
  const { status: voteStatus } = useSelector((state) => state.commentVotes);
  const { status: topicVoteStatus } = useSelector((state) => state.topicVotes);

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

  useEffect(() => {
    if (
      topicStatus === 'idle' ||
      (topicName !== topic?.title && topicStatus === 'success')
    ) {
      dispatch(topicVoteActions.resetData());
      dispatch(commentActions.resetData());
      dispatch(commentVoteActions.resetData());
      dispatch(fetchSingleTopic(topicName));
    }
    if (topicStatus === 'failed') {
      navigate('/home', { replace: true });
    }
  }, [dispatch, topicStatus, topicName, topic?.title, navigate]);

  useEffect(() => {
    if (commentStatus === 'idle' && topic.pageId && topicName === topic.title) {
      dispatch(
        fetchParentComments({ pageId: topic.pageId, size: 10, page: 0 })
      );
    }
  }, [dispatch, commentStatus, topic.pageId, topic.title, topicName]);

  useEffect(() => {
    if (
      commentStatus === 'success' &&
      voteStatus === 'idle' &&
      topic.pageId &&
      topicName === topic.title &&
      isLoggedIn &&
      userId
    ) {
      dispatch(listVotesByPage({ pageId: topic.pageId, userId }));
    }
  }, [
    dispatch,
    voteStatus,
    userId,
    topic.pageId,
    isLoggedIn,
    commentStatus,
    topic.title,
    topicName,
  ]);

  useEffect(() => {
    if (
      topicVoteStatus === 'idle' &&
      topic.pageId &&
      topicName === topic.title &&
      isLoggedIn &&
      userId
    ) {
      dispatch(fetchVotes({ pageId: topic.pageId, userId, jwtAccessToken }));
    }
  }, [
    dispatch,
    topicVoteStatus,
    userId,
    topic.pageId,
    isLoggedIn,
    topic.title,
    topicName,
    jwtAccessToken,
  ]);

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  return (
    topic.pageId &&
    topic.title === topicName && (
      <>
        <section id="visualizer">
          <AlgoFrame
            pageId={topic.pageId}
            topicName={topic.title}
            vizUrl={topic.visualizer}
            vizTitle={topic.title}
            vizSource={topic.source}
          />
        </section>
        <Slide
          direction="up"
          className="position-fixed m-2 bottom-0 start-0"
          in={!isScrolling && open}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Vote
                status={topicVoteStatus}
                deleteVote={deleteTopicVote}
                selectByVoteId={selectByTopicVoteId}
                votePage={voteTopic}
                pageId={topic?.pageId}
                like_={topic.upVotes ?? 0}
                dislike_={topic.downVotes ?? 0}
              />
              <Button
                type="button"
                variant="contained"
                startIcon={<FlagIcon />}
                style={{ fontSize: '15px', marginLeft: '1rem' }}
                onClick={handleOpenReport}
              >
                Report
              </Button>
              <Report open={openReport} handleClose={handleCloseReport} />
            </div>
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
          <Detail
            pageDescription={topic?.pageDescription}
            references={topic?.topicExternalResources}
          />
        </section>
        <section id="code">
          <CodeSnippet
            snippets={topic?.codeSnippets}
            setSnippetIndex={setSnippetIndex}
            snippetIndex={snippetIndex}
          />
        </section>
        <section id="forumspreview">
          <ForumPreview />
        </section>
        <section id="comments">
          <CommentFrame passedComments={commentParents} pageId={topic.pageId} />
        </section>
      </>
    )
  );
}
