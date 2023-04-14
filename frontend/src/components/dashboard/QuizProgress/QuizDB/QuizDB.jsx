import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import Chart from 'react-apexcharts';
import { useState } from 'react';

export default function QuizDB({ userHistory }) {
  const [showAll, setShowAll] = useState(false);

  const displayUserHistory = showAll ? userHistory : userHistory.slice(0, 6);

  const handleShowAll = () => setShowAll(true);

  return (
    <Grid container spacing={4}>
      {displayUserHistory.length ? (
        displayUserHistory.map(
          ({
            createdBy,
            quizDTO,
            averageScore,
            attempts,
            highestScore,
            lowestSore,
          }) => (
            <Grid key={nanoid()} item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  height: '100%',
                  border: 2,
                  borderColor: 'black',
                  borderRadius: '20px',
                  backgroundColor: '#d3d3d3',
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {quizDTO.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Created By {createdBy.username}
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                      <Chart
                        type="radialBar"
                        width={225}
                        height={225}
                        series={[Number(averageScore)]}
                        options={{
                          labels: ['Score'],
                          title: {
                            text: '',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="body1">
                        Attempts: {attempts}
                      </Typography>
                      <Typography variant="body1">
                        Highest Score: {highestScore}
                      </Typography>
                      <Typography variant="body1">
                        Lowest Score: {lowestSore}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )
        )
      ) : (
        <Grid item xs={12}>
          <Typography variant="body1">No quizzes to display.</Typography>
        </Grid>
      )}
      {!showAll && userHistory.length > 6 && (
        <Grid item xs={12}>
          <Button onClick={handleShowAll} variant="contained">
            Show All
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
