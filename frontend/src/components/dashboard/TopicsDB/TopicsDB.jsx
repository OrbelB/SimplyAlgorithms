import './TopicsDB.css';
import { nanoid } from '@reduxjs/toolkit';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const topicsdb = [
  {
    topicname: 'Binary Search',
    topic_completion: '100',
  },
  {
    topicname: 'Topological Sort',
    topic_completion: '75',
  },
  {
    topicname: 'Array',
    topic_completion: '60',
  },
  {
    topicname: 'Selection Sort',
    topic_completion: '15',
  },
];
export default function TopicsDB() {
  return (
    <div className="container-fluid w-100">
      <div className="row">
        {topicsdb.map((item) => (
          <div key={() => nanoid()} className="col">
            <CircularProgressbar
              className="m-5  mb-0 w-75"
              value={item.topic_completion}
              text={`${item.topic_completion}%`}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: 'round',
                textSize: '16px',
                pathColor: `#0000FF`,
                textColor: 'black',
                trailColor: 'darkgray',
              })}
            />
            <h4 className="m-4 text-center">{item.topicname}</h4>
          </div>
        ))}
      </div>
      <div className="text-center m-2">
        <button type="button" className="btn btn-secondary" disabled>
          Load More
        </button>
      </div>
    </div>
  );
}
