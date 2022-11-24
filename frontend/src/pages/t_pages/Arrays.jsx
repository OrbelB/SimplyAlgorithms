//import AlgoFram from "../../components/topic_page_samples/arrays/algo-frame/AlgoFrame"
// import AlgVisBtns from  "../../components/topic_page_samples/arrays/alg_vis_btns/AlgVisBtns"
import Detail from "../../components/topic_page_samples/arrays/detail/Detail"
import CodeSnippet from "../../components/topic_page_samples/arrays/code-snippet/CodeSnippet"
//import TopicQuiz from "../../components/topic_page_samples/arrays/topic_quiz/TopicQuiz"
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

export default function Arrays(){
    return(
        <>
            {/* <AlgoFram/> */}
            {/* <AlgVisBtns/> */}
            <Detail/>
            <CodeSnippet/>
            {/*<TopicQuiz/> */}
            <CommentFrame passedComments={staticComments} pageId={1} />

        </>
    )
}