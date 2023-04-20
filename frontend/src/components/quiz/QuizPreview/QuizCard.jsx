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
import { beautifyTime } from '../../../utilities/beautify-time';
import defualtimage from '../../../assets/quiz.png';

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
  createdDate,
  lastElementChild,
}) {
  const imageTitle = 'Quiz image for ' + title;
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
          title={imageTitle}
          component="img"
          height="450"
          loading="lazy"
          image={picture ?? defualtimage}
          alt="quiz"
          sx={{
            padding: '0em 4.5em 0em 4.5em',
            objectFit: 'contain',
            bgcolor: '#D8D8D8',
          }}
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
            <br />
            Created: {beautifyTime({ createdDate })}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom noWrap>
            {truncatedText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
}
