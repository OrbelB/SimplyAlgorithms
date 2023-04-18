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
      raised
      key={pageId}
      sx={{ height: '100%', borderRadius: '5px' }}
      className="m-2"
    >
      <CardActionArea
        onClick={() => {
          navigate(`/forums/${pageId}`);
          dispatch(forumActions.resetData());
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'left' }}>
            <Avatar
              alt="Profile Pic"
              loading="lazy"
              src={userDto.profilePicture}
              sx={{ marginRight: '10px' }}
            />
            <Typography variant="h5" className="side-username">
              {userDto?.username}
            </Typography>
          </div>
          <Typography sx={{ display: 'block' }} variant="h5">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
}
