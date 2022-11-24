import AlgoFram from "../../components/algo-frame/AlgoFrame"
// import AlgVisBtns from "../../components/topic_page_samples/bubble_sort/alg_vis_btns/AlgVisBtns"
import Detail from "../../components/topic_page_samples/bubble_sort/detail/Detail"
import CodeSnippet from "../../components/topic_page_samples/bubble_sort/code-snippet/CodeSnippet"
//import TopicQuiz from "../../components/topic_page_samples/bubble_sort/topic_quiz/TopicQuiz"
import CommentFrame from "../../components/comment/CommentFrame"

const staticComments = [
    {
      commentId: "unique_comment_id_0",
      createdBy: {
        userId: "this_id_imagine",
        username: "temp",
        profilePicture: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
      },
      commentText:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. " +
        "You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      createdDate: "2020-05-13 23:04:49.0",
      likes: 0,
      dislikes: 0,
      replyCount: 0,
    },
  ];

var bubble_url = "https://algorithm-visualizer.org/brute-force/bubble-sort";
var viz_title = "BUBBLE SORT";

export default function Bubble_sort(){
    return(
        <>
        <AlgoFram vis_url={bubble_url} viz_title={viz_title}/>
        <Detail/>
        <CodeSnippet/>
        {/*<TopicQuiz/>*/}
        <CommentFrame passedComments={staticComments} pageId={1} />
    </>
    )
}