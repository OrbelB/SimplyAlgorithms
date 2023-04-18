/* eslint-disable no-unused-vars */
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { styled } from '@mui/system';
import { quizActions } from '../../../store/reducers/quiz-slice';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: 'auto',
  background: '#F8F4E3',
  boxShadow: theme.shadows[3],
  borderRadius: 8,
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
  '& img': {
    objectFit: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiTypography-h5': {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  '& .MuiTypography-heading': {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  '& .MuiTypography-body2': {
    marginBottom: theme.spacing(2),
  },
  '& .row': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function QuizCard({
  title,
  createdBy,
  score,
  quizId,
  description,
  picture,
  lastElementChild,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    dispatch(quizActions.resetData());
    navigate(`${quizId}`);
  };
  return (
    <StyledCard ref={lastElementChild} variant="elevation">
      <CardActionArea onClick={handleNavigate}>
        <CardMedia
          component="img"
          height="450"
          loading="lazy"
          image={picture}
          alt="quiz"
        />
        <CardContent>
          <Typography variant="h5" component="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle2" component="p" gutterBottom>
            Created by: {createdBy.username}
            <p>Max Score: {score}</p>
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {description}
          </Typography>
          {/* <div className="row">
            <div className="col-5">
              <CircularProgressbar
                value={score}
                percentage={score}
                text={`${score}%`}
                strokeWidth="10"
                styles={buildStyles({
                  strokeLinecap: 'round',
                  textSize: '18px',
                  width: '50px',
                  height: '50px',
                  pathColor: `#0000FF`,
                  textColor: 'black',
                  trailColor: 'darkgray',
                })}
              />
            </div>
          </div> */}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}
