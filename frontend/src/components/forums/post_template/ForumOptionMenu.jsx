/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Report from '../../report/Report';
import { deleteForum } from '../../../services/forum';
import { forumsActions } from '../../../store/reducers/forums-slice';
import useJwtPermssionExists from '../../../hooks/use-jwtPermission';

export default function ForumOptionMenu({ pageId, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    jwtAccessToken,
    userId: authUserId,
    isLoggedIn,
  } = useSelector((state) => state.auth);
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });

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

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  return (
    isLoggedIn && (
      <div className="btn-group dropdown-center align-self-start p-0">
        <i
          role="button"
          className="dropdown-toggle-split bi bi-three-dots"
          style={{ fontSize: '25px' }}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <div className="dropdown-menu">
          {(permission || isAdmin) && (
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
          )}
          {permission && (
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
          )}
          <i
            className="dropdown-item bi bi-flag-fill text-primary"
            role="button"
            onClick={handleOpenReport}
            tabIndex={0}
          >
            {' '}
            Report
          </i>
          <Report
            open={openReport}
            handleClose={handleCloseReport}
            culpritUserId={userId}
            foreignId={pageId}
            typeOfForeignId="forum"
            victumUserId={authUserId}
          />
        </div>
      </div>
    )
  );
}
