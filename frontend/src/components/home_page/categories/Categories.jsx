import { useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wikiActions } from '../../../store/reducers/wiki-reducer';
import './Categories.css';
import { fetchSubCategories } from '../../../services/wiki';

export default function Categories() {
  const dispatch = useDispatch();
  const { status, subCategories } = useSelector((state) => state.wiki);
  useEffect(() => {
    if (status === 'idle' && subCategories.length === 0) {
      dispatch(fetchSubCategories());
    }

    if (status === 'success' && subCategories.length === 0) {
      dispatch(wikiActions.resetData());
    }
  });

  const getRandomRGB = useCallback(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }, []);

  const handleRedirect = () => {
    dispatch(wikiActions.resetData());
  };
  return (
    <div className="wrap-collabsible">
      <h1 className="head">CATEGORIES</h1>
      <br />
      <br />
      {/* {typesTopics.map((typeTopic, index) => (
        <TypeAlgorithms key={nanoid()} typeTopic={typeTopic} index={index} />
      ))} */}
      <div className="categories">
        <button type="button" className="t0 topic">
          <NavLink to="/wiki/Main Category" onClick={handleRedirect}>
            <p className="stuff">What Are Algorithms?</p>
          </NavLink>
        </button>
        <div className="row justify-content-center">
          {subCategories.map((subCategory) => (
            <button
              key={subCategory.wikiId}
              type="button"
              style={{ backgroundColor: getRandomRGB() }}
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

        {/* <button
            type="button"
            className="topic t2 col-10 col-lg-5 text-center"
          >
            <NavLink to="/wiki/trees" onClick={handleRedirect}>
              <p className="stuff">Trees</p>
            </NavLink>
          </button>
        </div>
        <div className="row justify-content-center">
          <button type="button" className="topic t3 col-10 col-lg-5">
            <NavLink to="/wiki/graphs" onClick={handleRedirect}>
              <p className="stuff">Graphs</p>
            </NavLink>
          </button>
          <button type="button" className="topic t4 col-10 col-lg-5">
            <NavLink to="/wiki/datastructures" onClick={handleRedirect}>
              <p className="stuff">Data Structures</p>
            </NavLink>
          </button> */}
      </div>
      <div className="bottom" />
    </div>
  );
}
