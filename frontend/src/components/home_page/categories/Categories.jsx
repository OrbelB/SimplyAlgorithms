/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import './Categories.css';

export default function Categories() {
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
          <NavLink to="/wiki/Main Category">
            <p className="stuff">What Are Algorithms?</p>
          </NavLink>
        </button>
        <div className="row justify-content-center">
          <button type="button" className="topic t1 col-10 col-lg-5">
            <NavLink to="/sorting">
              <p className="stuff">Sorting</p>
            </NavLink>
          </button>
          <button
            type="button"
            className="topic t2 col-10 col-lg-5 text-center"
          >
            <NavLink to="/trees">
              <p className="stuff">Trees</p>
            </NavLink>
          </button>
        </div>
        <div className="row justify-content-center">
          <button type="button" className="topic t3 col-10 col-lg-5">
            <NavLink to="/graphs">
              <p className="stuff">Graphs</p>
            </NavLink>
          </button>
          <button type="button" className="topic t4 col-10 col-lg-5">
            <NavLink to="/datastructures">
              <p className="stuff">Data Structures</p>
            </NavLink>
          </button>
        </div>
      </div>
      <div className="bottom" />
    </div>
  );
}
