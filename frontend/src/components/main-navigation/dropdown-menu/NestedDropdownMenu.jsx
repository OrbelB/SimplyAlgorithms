import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { topicActions } from '../../../store/reducers/topic-reducer';
import { commentActions } from '../../../store/reducers/comment-reducer';

export default function NestedDropdownMenu({ title, links }) {
  const dispatch = useDispatch();
  return (
    <li>
      <i
        className="dropdown-item"
        style={{ fontWeight: 600, fontSize: 20 }}
        role="button"
        unselectable="off"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </i>
      <ul className="dropdown-menu dropdown-submenu text-center">
        {links?.map(({ title: LinkTitle, pageId, urlPath }) => (
          <li key={pageId}>
            <NavLink
              style={{ fontWeight: 600, fontSize: 20 }}
              className="dropdown-item font-size-20"
              to={urlPath !== null ? `/wiki/${urlPath}` : `/topic/${LinkTitle}`}
              onClick={() => {
                dispatch(topicActions.resetData());
                dispatch(commentActions.resetData());
              }}
            >
              {LinkTitle}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
