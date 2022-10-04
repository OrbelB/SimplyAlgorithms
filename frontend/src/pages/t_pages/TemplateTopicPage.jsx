import AlgoFrame from "../../components/ui/algo-frame/AlgoFrame";
import Alg_vis_btns from "../../components/ui/alg_vis_btns/Alg_vis_btns";
import Detail from "../../components/ui/Detail";
import CodeSnippet from "../../components/ui/code-snippet/CodeSnippet";
import Topic_quiz from "../../components/ui/topic_quiz/Topic_quiz";
import CommentFrame from "../../components/ui/comment/CommentFrame";

export default function TemplateTopicPage() {
    return (
        <>
            <AlgoFrame/>
            <Alg_vis_btns/>
            <Detail/>
            <CodeSnippet/>
            <Topic_quiz/>
            <CommentFrame/>
        </>
    );
}