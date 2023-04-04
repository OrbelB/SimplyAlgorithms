/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@mui/material';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import Report from '../../../report/Report';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPublicNotePage } from '../../../../store/reducers/note-slice';
import { listPublicNotes } from '../../../../services/note';

export default function PubNoteList({ notes }) {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const { currentPublicNotePage, totalPublicNotePages, status } = useSelector(
    (state) => state.note
  );
  const { lastElementChild: lastPublicNote } = usePaginationWithInfiniteScroll({
    totalPages: totalPublicNotePages,
    currentPage: currentPublicNotePage,
    updateCurrPage: updateCurrentPublicNotePage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: listPublicNotes,
    jwtAccessToken,
    status,
  });

  const [saved, setSaved] = useState(new Array(notes?.length).fill(false));

  const handleClick = (index) => {
    const newSaved = [...saved];
    newSaved[index] = !newSaved[index];
    setSaved(newSaved);
  };

  return notes?.map(({ userNoteDTO }, index) => {
    if (index + 1 === notes.length) {
      return (
        <div
          key={userNoteDTO.noteId}
          ref={lastPublicNote}
          className="card m-3 mb-4"
        >
          <div className="card-body">
            <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
            <div className="card-text m-2">
              {parse(draftToHtml(userNoteDTO?.noteBody))}
            </div>
            <div className="m-2 mb-0">
              <Report />
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <Button
                variant="contained"
                color={saved[index] ? 'error' : 'success'}
                onClick={() => handleClick(index)}
              >
                {saved[index] ? 'Unsave Note' : 'Save Note'}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={userNoteDTO.noteId} className="card m-3 mb-4">
        <div className="card-body">
          <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
          <div className="card-text m-2">
            {parse(draftToHtml(userNoteDTO?.noteBody))}
          </div>
          <div className="m-2 mb-0">
            <Report />
          </div>
          <div className="position-absolute top-0 end-0 m-3">
            <Button
              variant="contained"
              color={saved[index] ? 'error' : 'success'}
              onClick={() => handleClick(index)}
            >
              {saved[index] ? 'Unsave Note' : 'Save Note'}
            </Button>
          </div>
        </div>
      </div>
    );
  });
}
