import {useEffect, useState} from "react";
import InputComment from "./InputComment";
import Comment from "./Comment";

const staticComments = [{
    id: "unique_id_0",
    comment_component_id: "unique_comment_id_0",
    name: "temp",
    photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
    comment: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. " + "You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    created_at: "2 months ago",
    upVotes: 0,
    replies: [{
        id: "unique_id_0",
        name: "temp",
        photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        comment: "If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
        created_at: "2 months ago",
        upVotes: 0,
    },

    ],
}];


export default function CommentFrame() {
    const [comments, setComments] = useState(staticComments);
    useEffect(() => {
    }, [comments]);

    const onNewComment = (passedComment) => {
        const date = new Date();
        const temp = date.toLocaleString('default', {
            month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"
        }).toString();
        let tempArray = [...comments];
        tempArray.push({
            id: "unique_id_" + (comments.length + 1).toString(),
            comment_component_id: "unique_comment_id_" + (tempArray.length + 1).toString(),
            name: "temp",
            photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
            comment: passedComment,
            created_at: temp,
            upVotes: 0,
            replies: []
        });
        setComments(tempArray);
    };

    const handleOnNewCommentChild = (childComment, parentId, comment_component_id,name, photo_link) => {
        console.log(childComment);
        const date = new Date();
        const temp = date.toLocaleString('default', {
            month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"
        }).toString();
        let tempArray = [...comments];
        tempArray.find(temp => temp.comment_component_id === comment_component_id).replies.push(
            {
                id: parentId,
                name: name,
                photo: photo_link,
                comment: childComment,
                created_at: temp,
                upVotes: 0,
            }
        );
        setComments(tempArray);

    }
    return (<div className="bg-white mt-4">
            <InputComment onNewComment={onNewComment}/>
            {comments.map((staticComment) => (
                <Comment key={staticComment.comment_component_id} parentId={staticComment.id} name={staticComment.name}
                         comment_component_id={staticComment.comment_component_id}
                         photo_link={staticComment.photo} comment={staticComment.comment}
                         created_at={staticComment.created_at} upVotes={staticComment.upVotes}
                         onNewCommentChild={handleOnNewCommentChild} replies={staticComment.replies}/>

            ))}
        </div>

    );

}