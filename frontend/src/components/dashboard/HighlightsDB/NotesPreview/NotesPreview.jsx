import { nanoid } from '@reduxjs/toolkit';
import { Card, CardContent, Typography } from '@mui/material';

const NOTES_PREVIEWS = [
  {
    id: 1,
    title: 'Splay Tree',
    description:
      'Nulla mauris elit, iaculis sit amet imperdiet dapibus, interdum sit amet mauris.',
  },
  {
    id: 2,
    title: 'Splay Tree',
    description:
      'Phasellus ut varius nisl. Phasellus vulputate neque sed neque consectetur, non aliquam risus condimentum.',
  },
  {
    id: 3,
    title: 'Splay Tree',
    description:
      ' Etiam eros lorem, commodo pulvinar tincidunt a, ullamcorper sit amet neque.',
  },
];

export default function HighlightsPreview() {
  return NOTES_PREVIEWS.map(({ title, description }) => (
    <Card
      key={nanoid()}
      sx={{
        height: '100%',
        border: 2,
        borderColor: 'black',
        borderRadius: '20px',
        backgroundColor: '#d3d3d3',
        boxShadow: 3,
      }}
      className="m-2"
    >
      <CardContent>
        <Typography variant="h5" className="preview-title" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" className="preview-description">
          {description}
        </Typography>
      </CardContent>
    </Card>
  ));
}
