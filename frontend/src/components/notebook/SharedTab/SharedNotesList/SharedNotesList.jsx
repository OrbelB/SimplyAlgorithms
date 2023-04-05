import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import EditNote from '../../EditNote/EditNote';
import ReadNote from '../../ReadNote/ReadNote';
import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import { updateCurrentSharedNotePage } from '../../../../store/reducers/note-slice';
import { listSharedNotes } from '../../../../services/note';
import ShareNoteCard from '../shareNoteCard';

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

  // renders all notes or a single note which is selected to be read or edited
  const renderNote = useMemo(() => {
    if (toRead === true && selectedNote !== null) {
      return <ReadNote note={selectedNote} onGoBack={handleGoBackRead} />;
    }
    if (toEdit === true && selectedNote !== null) {
      return <EditNote note={selectedNote} onGoBack={handleGoBackEdit} />;
    }
    return notes?.map(({ userNoteDTO, noteShareDTO }, index) => {
      if (notes.length === index + 1) {
        return (
          <ShareNoteCard
            key={noteShareDTO.shareId}
            noteShareDTO={noteShareDTO}
            userNoteDTO={userNoteDTO}
            handleClick={handleClick}
            innerRef={lastSharedNote}
          />
        );
      }
      return (
        <ShareNoteCard
          key={noteShareDTO.shareId}
          noteShareDTO={noteShareDTO}
          userNoteDTO={userNoteDTO}
          handleClick={handleClick}
        />
      );
    });
  }, [toRead, toEdit, selectedNote, notes, lastSharedNote]);

  return renderNote;
}
