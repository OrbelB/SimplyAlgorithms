import { useSelector } from "react-redux";

export default function OptionMenu({
  userId,
  handleDeleteMessage,
  handleIsEditCommentOpen,
  handleCancelComment = () => {},
  canReply = true,
}) {
  const authUserId = useSelector((state) => state.user.userId);
  const onDeleteMessage = () => {
    handleDeleteMessage();
  };

  const onEditMessage = () => {
    handleIsEditCommentOpen();
  };

  const onReplyMessage = () => {
    handleCancelComment();
  };
  let permission = authUserId === userId;
  let seeOptions = permission || canReply;
  return (
    <>
      {seeOptions && (
        <div className="btn-group dropup-center">
          <i
            role={"button"}
            className={"dropdown-toggle-split bi bi-three-dots-vertical"}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          ></i>
          <div className="dropdown-menu">
            {permission && (
              <i
                role={"button"}
                className={"dropdown-item bi bi-trash text-danger"}
                onClick={onDeleteMessage}
              >
                {" "}
                Delete
              </i>
            )}
            {permission && (
              <i
                className={"dropdown-item bi bi-pencil-fill"}
                onClick={onEditMessage}
                role={"button"}
              >
                {" "}
                Edit
              </i>
            )}
            {canReply && (
              <i
                role={"button"}
                className={"dropdown-item bi bi-arrow-return-left text-info"}
                onClick={onReplyMessage}
              >
                {" "}
                Reply
              </i>
            )}
          </div>
        </div>
      )}
    </>
  );
}
