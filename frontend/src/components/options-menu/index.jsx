/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from 'react-redux';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';

export default function OptionsMenu({
  userId,
  handleOnDelete,
  handleOnEdit,
  handleCancelAction = () => {},
  canReply = false,
}) {
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const authUserId = useSelector((state) => state.user.userId);

  const onDelete = () => {
    handleOnDelete();
  };

  const onEdit = () => {
    handleOnEdit();
  };

  const onReplyMessage = () => {
    handleCancelAction();
  };

  const permission = authUserId === userId;
  const seeOptions = permission || canReply || isAdmin;
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
              onClick={onDelete}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) onDelete();
              }}
              tabIndex={0}
            >
              Delete
            </i>
          )}
          {permission && (
            <i
              className="dropdown-item bi bi-pencil-fill"
              onClick={onEdit}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) onEdit();
              }}
            >
              Edit
            </i>
          )}
          {canReply && (
            <i
              role="button"
              className="dropdown-item bi bi-arrow-return-left text-info"
              onClick={onReplyMessage}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) onDelete();
              }}
            >
              Reply
            </i>
          )}
        </div>
      </div>
    )
  );
}
