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
  minHeight: 690,
  width: '100%',
  background: 'white',
  boxShadow: theme.shadows[3],
  borderRadius: 8,
  marginTop: 0,
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
  description = '',
  picture,
  lastElementChild,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    dispatch(quizActions.resetData());
    navigate(`${quizId}`);
  };
  const truncatedText =
    description != null
      ? description.substring(
          0,
          description.length > 256 ? 256 : description.length
        ) + '...'
      : 'missing description';
  return (
    <StyledCard ref={lastElementChild} variant="elevation">
      <CardActionArea
        onClick={handleNavigate}
        sx={{ minHeight: 690, marginTop: 0, paddingTop: 0 }}
      >
        <CardMedia
          component="img"
          height="450"
          loading="lazy"
          image={
            picture ??
            'https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg'
          }
          alt="quiz"
        />
        <CardContent>
          <Typography variant="h5" component="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle2" component="p" gutterBottom>
            Created by: {createdBy.username}
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Max Score: {score}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom noWrap>
            {truncatedText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}
