import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { forumActions } from '../../../store/reducers/forum-slice';
import { selectAllViewedForums } from '../../../store/reducers/viewed-forums-slice';

export default function RecentlyViewedPosts() {
  const dispatch = useDispatch();
  const viewedForums = useSelector(selectAllViewedForums);
  const navigate = useNavigate();
  return viewedForums.map(({ pageId, title, userDto }) => (
    <Card
      key={pageId}
      className="preview-sect card m-2 rounded"
      variant="elevation"
    >
      <CardActionArea
        onClick={() => {
          navigate(`/forums/${pageId}`);
          dispatch(forumActions.resetData());
        }}
      >
        <CardContent>
          <Avatar
            alt="Profile Pic"
            loading="lazy"
            src={userDto.profilePicture}
          />
          <Typography variant="h4" className="side-username">
            {userDto?.username}
          </Typography>
          <Typography variant="h5" className="line-two">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
}
