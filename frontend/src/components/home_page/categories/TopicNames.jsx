/* eslint-disable react/prop-types */
import './Categories.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { forumActions } from '../../../store/reducers/forum-slice';

export default function TopicNames({ topicNames, topicLink }) {
  const dispatch = useDispatch();

  return (
    <>
      {/* change it to a navlink */}
      {topicNames.map((topicName, index) => (
        <NavLink
          key={nanoid()}
          className="topic"
          to={topicLink[index]}
          onClick={() => {
            dispatch(forumActions.resetData());
          }}
        >
          {topicName}
        </NavLink>
      ))}
    </>
  );
}
