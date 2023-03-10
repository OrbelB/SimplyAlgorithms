import { useState, useEffect } from 'react';
import { Slide, useScrollTrigger } from '@mui/material';
import AlgoFrame from '../../components/topic_page/algo-frame/AlgoFrame';
// import AlgVisBtns from '../../components/topic_page/alg_vis_btns/AlgVisBtns';
import Detail from '../../components/topic_page/detail/Detail';
import CodeSnippet from '../../components/topic_page/code-snippet/CodeSnippet';
// import TopicQuiz from "../../components/topic_page/topic_quiz/TopicQuiz";
import CommentFrame from '../../components/comment/CommentFrame';
import NavbarTopic from '../../components/navbarFortopic/NavbarTopic';
import Vote from '../../components/vote_comp/Vote';

const staticComments = [
  {
    commentId: 'unique_comment_id_0',
    createdBy: {
      userId: 'this_id_imagine',
      username: 'temp',
      profilePicture: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
    },
    commentText:
      'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. ' +
      'You’ve nailed the design and the responsiveness at various breakpoints works really well.',
    createdDate: '2020-05-13 23:04:49.0',
    likes: 0,
    dislikes: 0,
    replyCount: 0,
  },
];

export default function TemplateTopicPage() {
  const [open, setOpen] = useState(false);
  const trigger = useScrollTrigger({
    target: window,
    threshold: 50,
  });

  useEffect(() => {
    if (!trigger) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  }, [trigger]);
  return (
    <>
      <section id="visualizer">
        <AlgoFrame />
      </section>

      <Slide
        direction="up"
        className="position-fixed m-2 bottom-0 start-0"
        in={open}
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
        in={open}
      >
        <div>
          <NavbarTopic />
        </div>
      </Slide>

      {/* <AlgVisBtns /> */}
      <section id="content">
        <Detail />
      </section>
      <section id="code">
        <CodeSnippet />
      </section>
      {/* <TopicQuiz /> */}
      <section id="comments">
        <CommentFrame passedComments={staticComments} pageId={1} />
      </section>
    </>
  );
}
