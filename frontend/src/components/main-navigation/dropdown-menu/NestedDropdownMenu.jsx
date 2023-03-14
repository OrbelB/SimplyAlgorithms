import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forumActions } from '../../../store/reducers/forum-reducer';

export default function NestedDropdownMenu({ selection, title, links }) {
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
        {selection?.map((topic, index) => (
          <li key={`${topic[index]}`}>
            <NavLink
              style={{ fontWeight: 600, fontSize: 20 }}
              className="dropdown-item font-size-20"
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
