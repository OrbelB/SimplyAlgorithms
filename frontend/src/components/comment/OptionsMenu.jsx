/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from 'react-redux';

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
  const permission = authUserId === userId;
  const seeOptions = permission || canReply;
  return (
    seeOptions && (
      <div className="btn-group dropup-center">
        <i
          role="button"
          className="dropdown-toggle-split bi bi-three-dots-vertical"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          tabIndex={0}
        />
        <div className="dropdown-menu">
          {permission && (
            <i
              role="button"
              className="dropdown-item bi bi-trash text-danger"
              onClick={onDeleteMessage}
              tabIndex={0}
            >
              {' '}
              Delete
            </i>
          )}
          {permission && (
            <i
              className="dropdown-item bi bi-pencil-fill"
              onClick={onEditMessage}
              role="button"
              tabIndex={0}
            >
              {' '}
              Edit
            </i>
          )}
          {canReply && (
            <i
              role="button"
              className="dropdown-item bi bi-arrow-return-left text-info"
              onClick={onReplyMessage}
              tabIndex={0}
            >
              {' '}
              Reply
            </i>
          )}
        </div>
      </div>
    )
  );
}
