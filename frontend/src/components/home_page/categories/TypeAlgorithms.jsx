/* eslint-disable react/prop-types */
import cx from 'classnames';
import TopicNames from './TopicNames';
import './Categories.css';

export default function TypeAlgorithms({ typeTopic, index }) {
  return (
    <>
      <div className="space" />
      <div className="input-space">
        <input
          id={`collapsible${index + 1}`}
          className={cx('row', `toggle cat${index + 1}`)}
          type="checkbox"
        />
        <label
          htmlFor={`collapsible${index + 1}`}
          className={`lbl-toggle cat${index + 1}`}
        >
          {typeTopic?.type}
        </label>
        <div className="collapsible-content">
          <div className="content-inner">
            <TopicNames
              topicLink={typeTopic?.topicLink}
              topicNames={typeTopic?.topicName}
              index={index}
            />
          </div>
        </div>
      </div>
      <div className="space" />
    </>
  );
}
