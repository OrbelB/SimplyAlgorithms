/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import NotebookAdd from '../NoteBookAdd/NoteBookAdd';
import NotebookHome from '../NoteBookHome/NoteBookHome';

export default function NoteBookNav() {
  function getNotesFromLS() {
    const note = JSON.parse(localStorage.getItem('notes'));
    if (note) {
      return note;
    } else {
      return [];
    }
  }
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState(getNotesFromLS);
  localStorage.setItem('notes', JSON.stringify(notes));

  const [NotePage, setNotePage] = useState(1);

  return (
    <div>
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

      {NotePage === 1 ? (
        <NotebookHome notes={notes} setNotes={setNotes} />
      ) : NotePage === 2 ? (
        <NotebookAdd
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          notes={notes}
          setNotes={setNotes}
        />
      ) : (
        ''
      )}
    </div>
  );
}
