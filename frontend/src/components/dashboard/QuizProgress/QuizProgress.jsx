import './QuizProgress.css';
import { nanoid } from '@reduxjs/toolkit';
import Chart from 'react-apexcharts';
import { currentUserInfo } from '../../../pages/UserProfilePage';
import QuizDB from './QuizDB/QuizDB';

const linechar = [
  {
    qname: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5', 'Quiz 6'],
    dtachart: [90, 90, 20, 50, 20, 12],
  },
];

export default function QuizProgress() {
  return (
    <div>
      {currentUserInfo.map(({ index }) => {
        return (
          <div key={index} className="container-fluid w-100">
            <div className="row">
              <div className="col text-center">
                <h5 className="text-center m-4">Scores</h5>
                <div className="row">
                  <div className="col-3">
                    {linechar.map(({ qname, dtachart }) => (
                      <Chart
                        key={nanoid()}
                        type="line"
                        width={300}
                        height={300}
                        series={[
                          {
                            name: 'Quiz Score',
                            data: [
                              dtachart[0],
                              dtachart[1],
                              dtachart[2],
                              dtachart[3],
                              dtachart[4],
                              dtachart[5],
                            ],
                          },
                        ]}
                        options={{
                          xaxis: {
                            categories: [
                              qname[0],
                              qname[1],
                              qname[2],
                              qname[3],
                              qname[4],
                              qname[5],
                            ],
                          },
                          title: {
                            text: 'Quiz Scores',
                          },
                        }}
                      >
                        {' '}
                      </Chart>
                    ))}
                  </div>
                  <div className="col">
                    {linechar.map(({ dtachart }) => (
                      <Chart
                        key={nanoid()}
                        type="radialBar"
                        width={300}
                        height={300}
                        series={[
                          (dtachart[0] +
                            dtachart[1] +
                            dtachart[2] +
                            dtachart[3] +
                            dtachart[4] +
                            dtachart[5]) /
                            dtachart.length,
                        ]}
                        options={{
                          labels: ['Score'],
                          title: {
                            text: 'Average Quiz Score',
                          },
                        }}
                      >
                        {' '}
                      </Chart>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <h5 className="m-4 text-center">Recently Taken Quizzes</h5>
              <QuizDB />
            </div>
            <div className="row">
              <h5 className=" m-4 text-center">Assigned Quizzes</h5>
              <QuizDB />
            </div>
            <div className="mb-5"> </div>
          </div>
        );
      })}
    </div>
  );
}
