/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { Button } from '@mui/material';
import { useState } from 'react';
import Report from '../../../report/Report';
import EditNote from '../../EditNote/EditNote';
import ReadNote from '../../ReadNote/ReadNote';
import { timeToExpire } from '../../../../utilities/beautify-time';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentSharedNotePage } from '../../../../store/reducers/note-slice';
import { listSharedNotes } from '../../../../services/note';

export default function SharedNotesList({ notes }) {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const { currentSharedNotePage, totalSharedNotePages, status } = useSelector(
    (state) => state.note
  );

  const { lastElementChild: lastSharedNote } = usePaginationWithInfiniteScroll({
    totalPages: totalSharedNotePages,
    currentPage: currentSharedNotePage,
    updateCurrPage: updateCurrentSharedNotePage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: listSharedNotes,
    jwtAccessToken,
    status,
  });
  const [toRead, setToRead] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const handleClick = (noteShareDTO, userNoteDTO) => {
    if (!noteShareDTO.canEdit) {
      // Render the ReadNote component if user has 'Read' permissions
      setSelectedNote({ userNoteDTO, noteShareDTO });
      setToRead(true);
    } else if (noteShareDTO.canEdit) {
      // Render the EditNote component if user has 'Edit' permissions
      setSelectedNote({ userNoteDTO, noteShareDTO });
      setToEdit(true);
    } else {
      // Handle other permissions as necessary
      setSelectedNote(null);
      setToRead(false);
    }
  };

  const handleGoBackRead = () => {
    setToRead(false);
    setSelectedNote(null);
  };
  const handleGoBackEdit = () => {
    setToEdit(false);
    setSelectedNote(null);
  };

  return (
    <>
      {toRead === true && selectedNote !== null ? (
        <ReadNote note={selectedNote} onGoBack={handleGoBackRead} />
      ) : toEdit === true && selectedNote !== null ? (
        <EditNote note={selectedNote} onGoBack={handleGoBackEdit} />
      ) : (
        <div>
          {notes?.map(({ userNoteDTO, noteShareDTO }, index) => {
            if (notes.length === index + 1) {
              return (
                <div
                  key={noteShareDTO.shareId}
                  ref={lastSharedNote}
                  className="card m-3 mb-4"
                >
                  <div className="card-header">
                    Expires:{' '}
                    <strong>
                      {timeToExpire(noteShareDTO?.expireDate)} days
                    </strong>{' '}
                    &emsp; Permissions:{' '}
                    <strong>{noteShareDTO.canEdit ? 'Edit' : 'Read'}</strong>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
                    <div className="card-text m-2">
                      {parse(draftToHtml(userNoteDTO?.noteBody))}
                    </div>
                    <div className="d-flex m-2 mb-0">
                      <Report />
                      <Button
                        onClick={() => handleClick(noteShareDTO, userNoteDTO)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div key={noteShareDTO.shareId} className="card m-3 mb-4">
                <div className="card-header">
                  Expires:{' '}
                  <strong>{timeToExpire(noteShareDTO?.expireDate)} days</strong>{' '}
                  &emsp; Permissions:{' '}
                  <strong>{noteShareDTO.canEdit ? 'Edit' : 'Read'}</strong>
                </div>
                <div className="card-body">
                  <h4 className="card-title m-2">{userNoteDTO?.title}</h4>
                  <div className="card-text m-2">
                    {parse(draftToHtml(userNoteDTO?.noteBody))}
                  </div>
                  <div className="d-flex m-2 mb-0">
                    <Report />
                    <Button
                      onClick={() => handleClick(noteShareDTO, userNoteDTO)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
