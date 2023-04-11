import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Card, CardContent, Typography } from '@mui/material';

import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { listUserNotes } from '../../../../services/note';

export default function HighlightsPreview({ privateNotes, innerRef }) {
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId && jwtAccessToken) {
      dispatch(listUserNotes({ page: 0, size: 5, userId, jwtAccessToken }));
    }
  }, [userId, jwtAccessToken, dispatch]);

  const handleNoteBodyHTML = useCallback((noteBody) => {
    let htmlContent = draftToHtml(noteBody);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    const parsedContent = parse(htmlContent);
    return parsedContent;
  }, []);

  const noComments = (
    <div className="d-flex justify-content-center align-items-center">
      <Typography variant="h5" className="text-center">
        No notes to display
      </Typography>
    </div>
  );

  const comment = ({ title, noteBody, lastNode }) => (
    <Card
      key={nanoid()}
      ref={lastNode}
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
        <Typography
          variant="body1"
          component="div"
          className="preview-description"
        >
          {handleNoteBodyHTML(noteBody)}
        </Typography>
      </CardContent>
    </Card>
  );
  return privateNotes.length === 0
    ? noComments
    : privateNotes?.map(({ title, noteBody }, index) => {
        if (index + 1 === privateNotes.length) {
          comment({ title, noteBody, innerRef });
        }
        return comment({ title, noteBody });
      });
}
