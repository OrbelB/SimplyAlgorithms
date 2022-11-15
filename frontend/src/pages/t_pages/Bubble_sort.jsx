import AlgoFram from "../../components/topic_page_samples/bubble_sort/algo-frame/AlgoFrame"
import AlgVisBtns from "../../components/topic_page_samples/bubble_sort/alg_vis_btns/AlgVisBtns"
import Detail from "../../components/topic_page_samples/bubble_sort/detail/Detail"
import CodeSnippet from "../../components/topic_page_samples/bubble_sort/code-snippet/CodeSnippet"
import TopicQuiz from "../../components/topic_page_samples/bubble_sort/topic_quiz/TopicQuiz"
import CommentFrame from "../../components/comment/CommentFrame"
export default function Bubble_sort(){
    return(
        <>
        <AlgoFram/>
        <AlgVisBtns/>
        <Detail/>
        <CodeSnippet/>
        <TopicQuiz/>
        <CommentFrame/>
    </>
    )
}