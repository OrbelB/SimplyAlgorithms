import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { wikiActions } from '../../store/reducers/wiki-reducer';

export default function Aside({ links = {}, disabled = false, path = 'wiki' }) {
  const dispatch = useDispatch();
  const handleNavigation = (e) => {
    dispatch(wikiActions.resetData());
    if (disabled) e.preventDefault();
  };
  return (
    <>
      <NavLink
        onClick={handleNavigation}
        to={`/wiki/${links?.title}`}
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded fs"
      >
        {links?.title}
      </NavLink>
      {links?.pages?.map((link) => (
        <NavLink
          onClick={handleNavigation}
          key={link?.title}
          to={`/${path}/${link?.title}`}
          data-toggle="tab"
          className="nav-item nav-link has-icon nav-link-faded indent fs"
        >
          {link.title}
        </NavLink>
      ))}
    </>
  );
}
