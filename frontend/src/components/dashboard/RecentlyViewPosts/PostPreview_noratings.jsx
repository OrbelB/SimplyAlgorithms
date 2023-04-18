import { Card } from 'react-bootstrap';
// import './PostPreview_noratings.css';
import { nanoid } from '@reduxjs/toolkit';
import { CardContent, CardHeader, Typography } from '@mui/material';

const POST_REVIEWS_WITHNORATING = [
  {
    id: 1,
    name: 'Bob',
    title: 'Lorem ipsum dolor sit amet, duo dolore erroribus ut?',
  },
  {
    id: 2,
    name: 'Jimmy',
    title: 'An atqui vocent est, an dicunt iuvaret comprehensam eam?',
  },
  {
    id: 3,
    name: 'Steve',
    title:
      'Quo no quot virtute, te est paulo civibus facilisi, melius hendrerit has at?',
  },
];

export { POST_REVIEWS_WITHNORATING };

export default function PostPreview() {
  return POST_REVIEWS_WITHNORATING.map(({ name, title }) => (
    <Card raised key={nanoid()} className="m-2">
      <CardHeader
        avatar={<img alt="Profile Pic" className="profile-pic" />}
        title={
          <Typography variant="h5" className="preview-username">
            {name}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h5" className="preview-title">
          {title}
        </Typography>
      </CardContent>
    </Card>
  ));
}
