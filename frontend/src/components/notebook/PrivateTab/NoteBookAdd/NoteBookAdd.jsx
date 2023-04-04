import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { createUserNote } from '../../../../services/note';
import TextEditor from '../../../text-editor/TextEditor';

const content = {
  blocks: [
    {
      key: '637gr',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

export default function NotebookAdd({ userId, jwtAccessToken, setNotePage }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(content);
  const dispatch = useDispatch();
  const inputHandlerTitle = (e) => {
    setTitle(e.target.value);
  };

  const inputHandlerDescription = (e) => {
    setDescription(e);
  };

  const addNotesHandler = (e) => {
    e.preventDefault();
    if (title !== '' && description !== '') {
      try {
        dispatch(
          createUserNote({
            title,
            noteBody: description,
            jwtAccessToken,
            userId,
          })
        );
      } finally {
        setTitle('');
        setNotePage(1);
        setDescription('');
      }
    }
  };

  return (
    <form onSubmit={addNotesHandler}>
      <div className="form-group m-3">
        <Typography variant="label" htmlFor="note-title">
          Title:
          <input
            type="text"
            className="form-control"
            id="note-title"
            placeholder="Enter title"
            value={title}
            onChange={inputHandlerTitle}
          />
        </Typography>
      </div>
      <div className="form-group m-3">
        <Typography variant="label">
          Description:
          <TextEditor
            type="text"
            className="form-control"
            toolbar="editor-toolbar"
            wrapper="editor-wrapper"
            editor="editor-title"
            id="note-description"
            value={content}
            setter={inputHandlerDescription}
          />
        </Typography>
      </div>
      <div className="form-group m-3">
        <button type="submit" className="form-control btn btn-primary">
          Save Note
        </button>
      </div>
    </form>
  );
}
