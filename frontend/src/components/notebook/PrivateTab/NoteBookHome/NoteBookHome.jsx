import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import NoteBookList from '../NoteBookList/NoteBookList';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentPrivateNotePage } from '../../../../store/reducers/note-slice';
import { listUserNotes } from '../../../../services/note';

export default function NotebookHome({ notes, setNotes, sharedToo }) {
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const { currentPrivateNotePage, totalPrivateNotePages, status } = useSelector(
    (state) => state.note
  );
  const { lastElementChild: lastNote } = usePaginationWithInfiniteScroll({
    currPage: currentPrivateNotePage,
    totalPages: totalPrivateNotePages,
    updateCurrPage: updateCurrentPrivateNotePage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: listUserNotes,
    jwtAccessToken,
    status,
  });
  return (
    <div className="form-outline">
      <TextField
        label="Search..."
        varient="standard"
        size="small"
        sx={{ marginLeft: '15px', width: '170px' }}
      />
      {notes.length === 0 ? (
        <div className="card m-3">
          <div className="card-body">
            <h5 className="card-title"> Message: </h5>
            <p className="card-text"> There are no notes available.</p>
          </div>
        </div>
      ) : (
        notes.map((element, index) => {
          if (index + 1 === notes.length) {
            return (
              <NoteBookList
                innerRef={lastNote}
                sharedToo={sharedToo}
                element={element}
                key={element.noteId}
                notes={notes}
                setNotes={setNotes}
              />
            );
          }
          return (
            <NoteBookList
              sharedToo={sharedToo}
              element={element}
              key={element.noteId}
              notes={notes}
              setNotes={setNotes}
            />
          );
        })
      )}
    </div>
  );
}
