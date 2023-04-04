/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import Report from '../../../report/Report';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPublicNotePage } from '../../../../store/reducers/note-slice';
import { listPublicNotes } from '../../../../services/note';

export default function PubNoteList() {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const { publicNotes, currentPublicNotePage, totalPublicNotePages, status } =
    useSelector((state) => state.note);
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

  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return publicNotes?.map(({ userNoteDTO }, index) => {
    if (index + 1 === publicNotes.length) {
      return (
        <div
          key={userNoteDTO.noteId}
          ref={lastPublicNote}
          className="card m-3 mb-4"
        >
          <div className="card-body">
            <h4 className="card-title m-2">{userNoteDTO?.noteTitle}</h4>
            <div className="card-text m-2">
              {parse(draftToHtml(userNoteDTO?.noteBody))}
            </div>
            <div className="m-2 mb-0">
              <Report />
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
                disabled={saved}
              >
                {saved ? 'Note Saved' : 'Save Note'}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={userNoteDTO.noteId} className="card m-3 mb-4">
        <div className="card-body">
          <h4 className="card-title m-2">{userNoteDTO?.noteTitle}</h4>
          <div className="card-text m-2">
            {parse(draftToHtml(userNoteDTO?.noteBody))}
          </div>
          <div className="m-2 mb-0">
            <Report />
          </div>
          <div className="position-absolute top-0 end-0 m-3">
            <Button>Save Note</Button>
          </div>
        </div>
      </div>
    );
  });
}
