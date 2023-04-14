import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';
import { deleteWiki } from '../../services/wiki';
import { topicActions } from '../../store/reducers/topic-slice';
import { wikiActions } from '../../store/reducers/wiki-slice';
import OptionsMenu from '../options-menu';
import './WikiHome.css';

export default function WikiHome({
  wikiId,
  title,
  Aside,
  Body,
  disabled = false,
}) {
  const dispatch = useDispatch();
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.wiki);
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const handleDelete = async () => {
    try {
      dispatch(deleteWiki({ wikiId, jwtAccessToken })).unwrap();
    } finally {
      if (status === 'success') {
        dispatch(wikiActions.resetData());
        dispatch(topicActions.resetData());
        navigate('/wiki/Main Category', { replace: true });
      }
    }
  };

  const handleEdit = async () => {
    navigate(`/wiki/${title}/edit`, { replace: true });
    dispatch(wikiActions.resetData());
    dispatch(topicActions.resetData());
  };

  const handleAdd = async () => {
    dispatch(wikiActions.resetData());
    navigate(`/wiki/new/create`, { replace: true });
  };

  return (
    <div className="wikibody container-fluid pb-auto">
      <div className="wikititle">{title}</div>
      <div className="wiki-section">
        <div className="row gutters-sm">
          <div className="col-md-3 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1 nav-size">
                  {/* Specific wiki topic pages will be implemented later, to be added in topics folder */}
                  {Aside}
                </nav>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none" />
              <div className="card-body container-fluid tab-content">
                <div
                  className="d-flex flex-column flex-fill text-center tab-pane active"
                  id="profile"
                >
                  {Body}
                </div>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="col-auto">
              <div className="row-cols mb-3">
                <Button
                  disabled={disabled}
                  variant="contained"
                  color="success"
                  size="medium"
                  onClick={handleAdd}
                >
                  CREATE A NEW WIKI
                </Button>
              </div>
              {!disabled && (
                <div className="row-cols">
                  <OptionsMenu
                    handleOnDelete={handleDelete}
                    handleOnEdit={handleEdit}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
