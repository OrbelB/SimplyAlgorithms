import AlgoFram from "../../components/algo-frame/AlgoFrame"
//import AlgVisBtns from  "../../components/topic_page_samples/breath_first_search/alg_vis_btns/AlgVisBtns"
import Detail from "../../components/topic_page_samples/breath_first_search/detail/Detail"
import CodeSnippet from "../../components/topic_page_samples/breath_first_search/code-snippet/CodeSnippet"
//import TopicQuiz from "../../components/topic_page_samples/breath_first_search/topic_quiz/TopicQuiz"
import CommentFrame from "../../components/comment/CommentFrame";


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


const bfs = "https://algorithm-visualizer.org/brute-force/breadth-first-search"
const viz_title = "BREADTH FIRST SEARCH"

export default function Breadth_first_search(){
    return(
        <>
            <AlgoFram vis_url={bfs} viz_title={viz_title}/>
            <Detail/>
            <CodeSnippet/>
            {/*<TopicQuiz/>*/}
            <CommentFrame passedComments={staticComments} pageId={1} />
        </>
    )
}