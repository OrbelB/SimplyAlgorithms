import {useEffect, useState} from "react";
import InputComment from "./InputComment";
import Comment from "./Comment";

const staticComments = [{
    id: "unique_id_0",
    comment_id: "unique_comment_id_0",
    name: "temp",
    photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
    comment: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. " + "You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    created_at: "2 months ago",
    upVotes: 0,
    replies: [{
        id: "unique_id_1",
        comment_id: "unique_comment_id_1",
        name: "Harry",
        photo: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
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
            id: "unique_id_0",
            comment_id: crypto.randomUUID(),
            name: "temp",
            photo: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
            comment: passedComment,
            created_at: temp,
            upVotes: 0,
            replies: []
        });
        setComments(tempArray);
    };

    const handleOnNewCommentChild = (childComment, parentId, comment_component_id, name, photo_link) => {
        const date = new Date();
        const temp = date.toLocaleString('default', {
            month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric"
        }).toString();
        let tempArray = [...comments];
        tempArray.find(parentComment => parentComment.comment_id === comment_component_id).replies.push(
            {
                id: parentId,
                comment_id: crypto.randomUUID(),
                name: name,
                photo: photo_link,
                comment: childComment,
                created_at: temp,
                upVotes: 0,
            }
        );
        setComments(tempArray);
    }

    const deleteParentComment = (comment_id) => {
        let tempArray = [...comments];
        setComments(tempArray.filter(parentComment => parentComment.comment_id !== comment_id));
    }

    const deleteChildComment = (parent_comment_id, comment_id) => {
        console.log(parent_comment_id, comment_id);
        let tempArray = [...comments];
        tempArray.find(parenComment => parenComment.comment_id === parent_comment_id).replies = (tempArray
            .find(ParentComment => ParentComment.comment_id === parent_comment_id)
            .replies
            .filter(childComment => childComment.comment_id !== comment_id));
        setComments(tempArray);
    }

    const editComment = (comment_id, parent_id) => {
        //TODO
    }
    return (<div className="bg-white mt-4">
            <InputComment onNewComment={onNewComment}/>
            {comments.map((staticComment) => (
                <Comment key={staticComment.comment_id} parentId={staticComment.id} name={staticComment.name}
                         comment_component_id={staticComment.comment_id}
                         photo_link={staticComment.photo} comment={staticComment.comment}
                         created_at={staticComment.created_at} upVotes={staticComment.upVotes}
                         onNewCommentChild={handleOnNewCommentChild} replies={staticComment.replies}
                         deleteParentComment={deleteParentComment} deleteChildComment={deleteChildComment}
                         editComment={editComment}
                />
            ))}
        </div>

    );

}