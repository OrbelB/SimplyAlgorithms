import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import Report from '../../../report/Report';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPublicNotePage } from '../../../../store/reducers/note-slice';
import { listPublicNotes, savePublicNote } from '../../../../services/note';
import AlertSnackBar from '../../../alert-messages-snackbar/AlertSnackBar';

export default function PubNoteList({ notes }) {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const { currentPublicNotePage, totalPublicNotePages, status } = useSelector(
    (state) => state.note
  );
  const dispatch = useDispatch();
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
  const [noteSaved, setNoteSaved] = useState({ status: false, index: null });
  const [saved, setSaved] = useState(new Array(notes?.length).fill(false));
  useEffect(() => {
    if (status === 'success' && noteSaved.index !== null) {
      const newSaved = [...saved];
      newSaved[noteSaved.index] = !newSaved[noteSaved.index];
      setSaved(newSaved);
      setNoteSaved({ index: null, status: true });
    } else if (status === 'failed' && noteSaved.index !== null) {
      setNoteSaved({ index: null, status: true });
    }
  }, [status, noteSaved, saved]);

  // on click of save note button it will save the note to the user's private notes
  const handleClick = async (index, noteId) => {
    try {
      await dispatch(
        savePublicNote({ jwtAccessToken, noteId, userId })
      ).unwrap();
    } finally {
      setNoteSaved({ status: false, index });
    }
  };

  const alertMessage =
    status === 'success' ? (
      <AlertSnackBar
        passedMessage="You have successfuly save this public note to your records"
        typeMessage="success"
        removeData={() => setNoteSaved({ status: false, index: null })}
      />
    ) : (
      <AlertSnackBar
        passedMessage="Something went wrong. Please try again later."
        typeMessage="error"
        removeData={() => setNoteSaved({ status: false, index: null })}
      />
    );

  const handleNoteBodyHTML = useCallback((noteBody) => {
    let htmlContent = draftToHtml(noteBody);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    const parsedContent = parse(htmlContent);
    return parsedContent;
  }, []);

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  return (
    <>
      {noteSaved.status && alertMessage}
      {notes?.map(({ userNoteDTO }, index) => {
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
                  {handleNoteBodyHTML(userNoteDTO?.noteBody)}
                </div>
                <div className="m-2 mb-0 d-flex justify-content-between">
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleOpenReport}
                  >
                    Report
                  </Button>
                  <Report open={openReport} handleClose={handleCloseReport} />
                  <Button
                    variant="contained"
                    color={saved[index] ? 'error' : 'success'}
                    onClick={() => handleClick(index, userNoteDTO.noteId)}
                    disabled={saved[index]}
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
                {handleNoteBodyHTML(userNoteDTO?.noteBody)}
              </div>
              <div className="m-2 mb-0 d-flex justify-content-between">
                <Report />
                <Button
                  variant="contained"
                  color={saved[index] ? 'error' : 'success'}
                  onClick={() => handleClick(index, userNoteDTO.noteId)}
                  disabled={saved[index]}
                >
                  {saved[index] ? 'Unsave Note' : 'Save Note'}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
