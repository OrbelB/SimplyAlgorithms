import './DayStreak.css';

const DAY_STREAK = [
  {
    days: '5',
  },
];

export default function DayStreak() {
  return (
    <div>
      {DAY_STREAK.map(({ index, days }) => {
        return (
          <div key={index}>
            <div className="card daystreak">
              <div className="card-header">
                <h5 className="text-center">Login Day Streak</h5>
              </div>
              <div className="daystreak-body">
                <h2 className="text-center">
                  {days}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bi bi-fire mb-1"
                    width="23"
                    height="23"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                  </svg>
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
