/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FlagIcon from '@mui/icons-material/Flag';
import Report from '../../report/Report';
import { timeToExpire } from '../../../utilities/beautify-time';
import TextEditor from '../../text-editor/TextEditor';
import { updateSharedUserNote } from '../../../services/note';

export default function EditNote({ note, onGoBack }) {
  const dispatch = useDispatch();
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const [body, setBody] = useState(note?.userNoteDTO?.noteBody);
  const [title, setTitle] = useState(note?.userNoteDTO?.title ?? '');
  const inputHandlerDescription = (e) => {
    setBody(e);
  };

  const handleUpdateSharedNote = (e) => {
    e.preventDefault();
    // Implement update logic here
    const fullShareNoteDTO = {
      noteShareDTO: {
        ...note.noteShareDTO,
      },
      userNoteDTO: {
        ...note.userNoteDTO,
        noteBody: body,
        title,
      },
    };

    try {
      dispatch(updateSharedUserNote({ fullShareNoteDTO, jwtAccessToken }));
    } finally {
      onGoBack();
    }
  };

  const [openReport, setOpenReport] = useState(false);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  return (
    <div className="card m-3 mb-4">
      <div className="card-header">
        Expires:{' '}
        <strong>{timeToExpire(note?.noteShareDTO?.expireDate)} days</strong>{' '}
        &emsp; Permissions:{' '}
        <strong>{note?.noteShareDTO?.canEdit ? 'Edit' : 'Read'}</strong>
      </div>
      <div className="card-body">
        <form onSubmit={handleUpdateSharedNote}>
          <div className="form-group m-3">
            <label htmlFor="notetitle">
              Title:
              <input
                type="text"
                className="form-control"
                id="edittitle"
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
          </div>
          <div className="form-group m-3">
            <label htmlFor="note-description">
              Description:
              <TextEditor
                type="text"
                className="form-control"
                toolbar="editor-toolbar"
                wrapper="editor-wrapper"
                editor="editor-title"
                id="note-description"
                value={body}
                setter={inputHandlerDescription}
              />
            </label>
          </div>
          <div className="d-flex justify-content-between m-2 mb-0">
            <div className="d-flex">
              <Button className="m-1" onClick={onGoBack} variant="contained">
                Go Back
              </Button>
              <Button
                className="m-1"
                variant="contained"
                color="success"
                type="submit"
              >
                Save
              </Button>
            </div>
            <Button
              type="button"
              variant="contained"
              onClick={handleOpenReport}
              startIcon={<FlagIcon />}
              className="m-1"
            >
              Report
            </Button>
            <Report
              open={openReport}
              handleClose={handleCloseReport}
              culpritUserId={note.userNoteDTO?.createdBy.userId}
              foreignId={note.noteShareDTO.shareId}
              victumUserId={userId}
              typeOfForeignId="share note"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
