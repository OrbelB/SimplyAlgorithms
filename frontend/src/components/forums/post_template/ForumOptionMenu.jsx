/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteForum } from '../../../services/forum';
import { forumsActions } from '../../../store/reducers/forums-reducer';

export default function ForumOptionMenu({ pageId, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { jwtAccessToken, userId: authUserId } = useSelector(
    (state) => state.auth
  );
  const onDeleteForum = () => {
    dispatch(forumsActions.deleteForum({ pageId }));
    dispatch(
      deleteForum({
        pageId,
        userId,
        accessToken: jwtAccessToken,
      })
    );
    navigate('/forums', { replace: true });
  };
  const onEditForum = () => {
    navigate(`/forums/edit/${pageId}`, {
      state: { from: location },
      replace: false,
    });
  };
  const permission = authUserId === userId;
  return (
    permission && (
      <div className="btn-group dropdown-center align-self-start p-0">
        <i
          role="button"
          className="dropdown-toggle-split bi bi-three-dots"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <div className="dropdown-menu">
          <i
            role="button"
            className="dropdown-item bi bi-trash text-danger"
            onClick={onDeleteForum}
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                onDeleteForum();
              }
            }}
            tabIndex={0}
          >
            {' '}
            Delete
          </i>
          <i
            className="dropdown-item bi bi-pencil-fill"
            onClick={onEditForum}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'enter') {
                onEditForum();
              }
            }}
            tabIndex={0}
          >
            {' '}
            Edit
          </i>
        </div>
      </div>
    )
  );
}
