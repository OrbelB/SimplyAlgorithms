/* eslint-disable dot-notation */
import cx from 'classnames';
import { Grid } from 'react-loading-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Frame.module.css';
import OptionsMenu from '../options-menu';
import { deleteTopic } from '../../services/topic';
import { topicActions } from '../../store/reducers/topic-slice';
import { wikiActions } from '../../store/reducers/wiki-slice';
import { fetchSubCategories, fetchWikiLinks } from '../../services/wiki';
import useJwtPermssionExists from '../../hooks/use-jwtPermission';
// import ToggleVisibility from "../../../ToggleVisibility";
// https://reactjs.org/docs/dom-elements.html

export default function AlgoFrame({
  vizUrl,
  vizTitle,
  vizSource,
  topicName,
  pageId,
}) {
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = useJwtPermssionExists({ permission: 'ROLE_ADMIN' });
  const isTeacher = useJwtPermssionExists({ permission: 'ROLE_TEACHER' });
  const handleOnDelete = async () => {
    try {
      await dispatch(
        deleteTopic({ pageId, userId, accessToken: jwtAccessToken })
      ).unwrap();
    } finally {
      dispatch(fetchWikiLinks());
      dispatch(fetchSubCategories());
      navigate('/home', { replace: true });
    }
  };

  const handleOnEdit = () => {
    dispatch(wikiActions.resetData());
    dispatch(topicActions.resetData());
    navigate(`/topic/${topicName}/edit`);
  };

  function disableLoader() {}
  return (
    <div className={cx(styles['container-style'])}>
      <div className="row m-0 p-0 justify-content-center">
        <div className="col-12">
          {vizUrl === undefined && (
            <div className="row justify-content-center">
              <div className={cx(styles['temp_view'])}>
                <Grid />
              </div>
            </div>
          )}
          <div className="row justify-content-center">
            <div className={cx(styles['algo_title'], 'text-center')}>
              {vizTitle}
            </div>
          </div>
          <div className="row justify-content-center">
            <iframe
              id="viz_alg"
              src={vizUrl}
              className={cx(styles['website'])}
              loading="lazy"
              scrolling="no"
              title="algorithm visualizer by algorithm-visualizer.org"
              onLoad={disableLoader}
            >
              <p>Your browser does not support iframes :( </p>
            </iframe>
          </div>
          <div className="row justify-content-center">
            <div className={cx(styles['credit'])}>
              Algorithm visualizer brought to you by &nbsp;
              <a
                className={cx(styles['credit_link'])}
                href={vizSource}
                target="_blank"
                rel="noreferrer"
              >
                {vizSource}
              </a>
            </div>
          </div>
        </div>
        {(isAdmin || isTeacher) && pageId ? (
          <div className="row-cols text-end">
            <OptionsMenu
              handleOnDelete={handleOnDelete}
              handleOnEdit={handleOnEdit}
              userId={userId}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
