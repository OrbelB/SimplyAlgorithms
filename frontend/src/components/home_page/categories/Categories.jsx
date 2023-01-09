/* eslint-disable react/prop-types */
import { nanoid } from '@reduxjs/toolkit';
import './Categories.css';
import TypeAlgorithms from './TypeAlgorithms';

export default function Categories({ typesTopics }) {
  return (
    <div className="wrap-collabsible">
      <h1 className="head">CATEGORIES</h1>
      {typesTopics.map((typeTopic, index) => (
        <TypeAlgorithms key={nanoid()} typeTopic={typeTopic} index={index} />
      ))}
      <div className="bottom" />
    </div>
  );
}
