import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NotebookAdd from '../NoteBookAdd/NoteBookAdd';
import NotebookHome from '../NoteBookHome/NoteBookHome';
import { listUserNotes } from '../../../../services/note';

export default function NoteBookNav() {
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { privateNotes, status, sharedToo } = useSelector(
    (state) => state.note
  );

  useEffect(() => {
    if (status === 'idle' && jwtAccessToken && userId) {
      dispatch(listUserNotes({ jwtAccessToken, userId, page: 0, size: 10 }));
    }
  }, [dispatch, jwtAccessToken, userId, status]);

  const handleAddNote = useCallback((e) => {
    if (e) e.preventDefault();
  }, []);

  const [NotePage, setNotePage] = useState(1);

  const displayNotes = useMemo(() => {
    if (NotePage === 1) {
      return (
        <NotebookHome
          notes={privateNotes}
          setNotes={handleAddNote}
          sharedToo={sharedToo}
        />
      );
    }
    if (NotePage === 2) {
      return (
        <NotebookAdd
          userId={userId}
          setNotePage={setNotePage}
          jwtAccessToken={jwtAccessToken}
        />
      );
    }
    return null;
  }, [
    NotePage,
    privateNotes,
    handleAddNote,
    sharedToo,
    userId,
    jwtAccessToken,
  ]);

  return (
    <div className="container-fluid">
      <button
        type="button"
        className="btn btn-primary m-3"
        onClick={() => setNotePage(1)}
      >
        Home
      </button>
      <button
        type="button"
        className="btn btn-secondary m-1"
        onClick={() => setNotePage(2)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </button>
      {displayNotes}
    </div>
  );
}
