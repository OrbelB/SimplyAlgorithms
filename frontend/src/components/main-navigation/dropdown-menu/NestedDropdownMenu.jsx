import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forumActions } from '../../../store/reducers/forum-reducer';

export default function NestedDropdownMenu({ selection, title, links }) {
  const dispatch = useDispatch();
  return (
    <li>
      <i
        className="dropdown-item"
        role="button"
        unselectable="off"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </i>
      <ul className="dropdown-menu dropdown-submenu">
        {selection?.map((topic, index) => (
          <li key={index}>
            <NavLink
              className="dropdown-item"
              to={links[index]}
              onClick={() => {
                dispatch(forumActions.resetData());
              }}
            >
              {topic}
            </NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}
