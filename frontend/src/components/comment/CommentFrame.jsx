import { useSelector } from 'react-redux';
import InputComment from './InputComment';
import Comment from './Comment';
import { commentActions } from '../../store/reducers/comment-slice';
import { fetchParentComments } from '../../services/comment';
import usePaginationWithInfiniteScroll from '../../hooks/use-pagination';

// this is the start of the comment section, which renders the input box and the comment box section
export default function CommentFrame({ passedComments, pageId }) {
  const { commentParentCurrPage, commentParentsTotalPages, status } =
    useSelector((state) => state.comment);

  const { lastElementChild: lastElement } = usePaginationWithInfiniteScroll({
    totalPages: commentParentsTotalPages,
    currPage: commentParentCurrPage,
    updateCurrPage: commentActions.updateCurrentParentPage,
    itemId: pageId,
    itemName: 'pageId',
    fetchFunction: fetchParentComments,
    status,
  });

  return (
    <div className="bg-white mt-5 ">
      <InputComment pageId={pageId} />
      {passedComments.map((comment, index) => {
        if (index + 1 === passedComments.length) {
          return (
            <Comment
              innerRef={lastElement}
              key={comment?.commentId}
              userId={comment?.createdBy?.userId}
              username={comment?.createdBy?.username}
              parentCommentId={comment?.commentId}
              profilePicture={comment?.createdBy?.profilePicture}
              commentText={comment?.commentText}
              createdDate={comment?.createdDate}
              upVotes={comment?.likes}
              downVotes={comment?.dislikes}
              replyCount={comment?.replyCount}
              replies={comment?.replies}
              pageId={pageId}
            />
          );
        }
        return (
          <Comment
            key={comment?.commentId}
            userId={comment?.createdBy?.userId}
            username={comment?.createdBy?.username}
            parentCommentId={comment?.commentId}
            profilePicture={comment?.createdBy?.profilePicture}
            commentText={comment?.commentText}
            createdDate={comment?.createdDate}
            upVotes={comment?.likes}
            downVotes={comment?.dislikes}
            replyCount={comment?.replyCount}
            replies={comment?.replies}
            pageId={pageId}
          />
        );
      })}
    </div>
  );
}
