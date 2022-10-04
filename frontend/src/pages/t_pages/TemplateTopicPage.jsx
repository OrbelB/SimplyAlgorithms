import AlgoFrame from "../../components/topic_page/algo-frame/AlgoFrame";
import AlgVisBtns from "../../components/topic_page/alg_vis_btns/AlgVisBtns";
import Detail from "../../components/topic_page/detail/Detail";
import CodeSnippet from "../../components/topic_page/code-snippet/CodeSnippet";
import TopicQuiz from "../../components/topic_page/topic_quiz/TopicQuiz";
import CommentFrame from "../../components/comment/CommentFrame";

export default function TemplateTopicPage() {
    return (
        <>
            <AlgoFrame/>
            <AlgVisBtns/>
            <Detail/>
            <CodeSnippet/>
            <TopicQuiz/>
            <CommentFrame/>
        </>
    );
}