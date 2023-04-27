import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPublicNotePage } from '../../../../store/reducers/note-slice';
import { listPublicNotes, savePublicNote } from '../../../../services/note';
import AlertSnackBar from '../../../alert-messages-snackbar/AlertSnackBar';
import PubNoteCard from './PubNoteCard';

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
      {notes?.length === 0 ? (
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title"> Message: </h5>
            <p className="card-text"> There are no public notes available.</p>
          </div>
        </div>
      ) : (
        notes?.map(({ userNoteDTO, publicShareId }, index) => {
          if (index + 1 === notes.length) {
            return (
              <PubNoteCard
                key={publicShareId}
                userNoteDTO={userNoteDTO}
                handleClick={handleClick}
                handleCloseReport={handleCloseReport}
                handleOpenReport={handleOpenReport}
                index={index}
                lastPublicNote={lastPublicNote}
                openReport={openReport}
                userId={userId}
                saved={saved}
              />
            );
          }
          return (
            <PubNoteCard
              key={publicShareId}
              userNoteDTO={userNoteDTO}
              handleClick={handleClick}
              handleCloseReport={handleCloseReport}
              handleOpenReport={handleOpenReport}
              index={index}
              openReport={openReport}
              userId={userId}
              saved={saved}
            />
          );
        })
      )}
    </>
  );
}
