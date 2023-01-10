/* eslint-disable camelcase */
const TOPICS_PROGRESS = [
  {
    topics_complete: '1',
    topics_inprogress: '5',
  },
];

export default function TopicsProgress() {
  return (
    <div>
      {TOPICS_PROGRESS.map(({ topics_complete, topics_inprogress }) => {
        return (
          <>
            <div className="first">
              <h4 className="text-center">Completed Topics</h4>
              <h2 className="num1">{topics_complete}</h2>
            </div>
            <div className="second">
              <h4 className="text-center">Topics in Progress</h4>
              <h2 className="num2">{topics_inprogress}</h2>
            </div>
          </>
        );
      })}
    </div>
  );
}
