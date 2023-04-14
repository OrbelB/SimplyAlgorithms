// import { useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wikiActions } from '../../../store/reducers/wiki-slice';
import './Categories.css';

export default function Categories() {
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.wiki);

  const handleRedirect = () => {
    dispatch(wikiActions.resetData());
  };
  return (
    <div className="wrap-collabsible">
      <h1 className="head">CATEGORIES</h1>
      <br />
      <br />
      <div className="categories">
        <div className="row justify-content-center">
          {subCategories.map((subCategory) => (
            <button
              key={subCategory.wikiId}
              type="button"
              style={{ backgroundColor: subCategory.rgb }}
              className="topic col-10 col-lg-5"
            >
              <NavLink
                to={`/wiki/${subCategory.wikiName}`}
                onClick={handleRedirect}
              >
                <p className="stuff">{subCategory.wikiName}</p>
              </NavLink>
            </button>
          ))}
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
