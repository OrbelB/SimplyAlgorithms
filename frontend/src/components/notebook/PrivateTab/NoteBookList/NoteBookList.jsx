/* eslint-disable no-nested-ternary */
import { useState, useMemo } from 'react';
import { Button, Typography, Chip } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../text-editor/TextEditor';
import {
  deleteNote,
  listSharedToo,
  privateNote,
  publicizeNote,
  updateUserNote,
} from '../../../../services/note';
// import { updateSharedEditPermission } from '../../../../store/reducers/note-slice';
import useJwtPermssionExists from '../../../../hooks/use-jwtPermission';
import AreYouSureModal from '../../../AreYourSureModal/AreYouSureModal';
import ShareModal from './ShareModal';

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

export default function NoteBookList({ element, sharedToo, innerRef }) {
  const dispatch = useDispatch();
  const isStudent = useJwtPermssionExists({ permission: 'ROLE_STUDENT' });

  const { status } = useSelector((state) => state.note);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const [editPage, setEditPage] = useState(false);
  const body = useMemo(() => {
    let htmlContent = draftToHtml(element?.noteBody);
    htmlContent = htmlContent.replace(
      /<img([^>]+)>/gi,
      `<img$1 class="img-fluid" loading="lazy">`
    );
    const parsedContent = parse(htmlContent);
    return parsedContent;
  }, [element?.noteBody]);

  const [noteTitle, setNoteTitle] = useState(element?.title ?? '');

  const [noteBody, setNoteBody] = useState(element?.noteBody ?? content);
  const [isPublic, setIsPublic] = useState(element?.isPublic === 1);
  const removeHandler = async () => {
    try {
      dispatch(
        deleteNote({ noteId: element.noteId, userId, jwtAccessToken })
      ).unwrap();
    } finally {
      // future logic
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    try {
      await dispatch(
        listSharedToo({
          userId,
          jwtAccessToken,
          noteId: element.noteId,
          page: 0,
          size: 40,
        })
      ).unwrap();
    } finally {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  // handles updating the note private/public status
  const handleUpdatingIsPublic = async () => {
    const userNoteDTO = {
      noteId: element.noteId,
      title: noteTitle,
      noteBody,
      isPublic: isPublic ? 1 : 0,
      createdBy: {
        userId,
      },
    };
    const currentPublic = !isPublic;
    if (currentPublic && element?.isPublic === 0) {
      try {
        await dispatch(
          publicizeNote({
            noteId: element.noteId,
            userNoteDTO,
            jwtAccessToken,
          })
        ).unwrap();
      } finally {
        setIsPublic((prev) => !prev);
      }
    } else if (!currentPublic && element?.isPublic === 1) {
      try {
        await dispatch(
          privateNote({
            userNoteDTO,
            jwtAccessToken,
          })
        ).unwrap();
      } finally {
        setIsPublic((prev) => !prev);
      }
    }
  };

  const inputHandlerDescription = (e) => {
    setNoteBody(e);
  };

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userNoteDTO = {
      noteId: element.noteId,
      title: noteTitle,
      noteBody,
      isPublic: isPublic ? 1 : 0,
      createdBy: {
        userId,
      },
    };
    try {
      await dispatch(updateUserNote({ userNoteDTO, jwtAccessToken })).unwrap();
    } finally {
      setEditPage(false);
    }
  };

  const [openDel, setOpenDel] = useState(false);
  const messageDel =
    'This action is irreversible! It cannot be undone. Only a magic genie could restore it!';

  const handleOpenDel = () => {
    setOpenDel(true);
  };

  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleConfirmDel = async () => {
    await removeHandler(element.id);
    setOpenDel(false);
  };

  const [openAUS, setOpenAUS] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenAUS = () => {
    if (isPublic === true) {
      setMessage(
        'The public will lose access to your notes once you confirm. However, after that, you can share with others privately.'
      );
    } else if (isPublic === false) {
      setMessage(
        'Your notes will now be publicly accessible when you confirm. However, you will no longer be able to share your Note privately.'
      );
    }
    setOpenAUS(true);
  };

  const handleCloseAUS = () => {
    setOpenAUS(false);
  };

  const handleConfirmAUS = async () => {
    if (isPublic === true) {
      await handleUpdatingIsPublic();
    } else if (isPublic === false) {
      await handleUpdatingIsPublic();
    }
    setOpenAUS(false);
  };

  return editPage === false ? (
    <div className="card m-3 mb-4">
      <div className="card-body" ref={innerRef}>
        <Chip
          className="m-1"
          label={isPublic ? 'Public' : 'Private'}
          color={isPublic ? 'success' : 'error'}
        />
        <h4 className="card-title m-2">{noteTitle}</h4>
        <div className="card-text m-2">{body}</div>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={handleOpenDel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
        <AreYouSureModal
          open={openDel}
          onClose={handleCloseDel}
          onConfirm={handleConfirmDel}
          title="Are you sure you want to delete this note?"
          message={messageDel}
        />
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={() => {
            setEditPage(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : editPage === true ? (
    <div className="card m-3 mb-4">
      <div className="card-body">
        <Chip
          className="m-3"
          label={isPublic ? 'Public' : 'Private'}
          color={isPublic ? 'success' : 'error'}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group m-3">
            <Typography variant="label">Title: </Typography>
            <input
              type="text"
              className="form-control"
              id="edittitle"
              placeholder="Enter title"
              onChange={handleTitleChange}
              value={noteTitle}
            />
          </div>
          <Button
            type="button"
            variant="contained"
            className="m-3"
            disabled={isPublic}
            startIcon={<ShareIcon />}
            onClick={handleOpen}
          >
            Share
          </Button>
          <ShareModal
            handleClose={handleClose}
            element={element}
            open={open}
            sharedToo={sharedToo}
          />
          <Button
            type="button"
            variant="contained"
            disabled={status === 'pending' || isStudent}
            color={isPublic ? 'success' : 'error'}
            onClick={handleOpenAUS}
          >
            {isPublic ? 'Public' : 'Private'}
          </Button>
          <AreYouSureModal
            open={openAUS}
            onClose={handleCloseAUS}
            onConfirm={handleConfirmAUS}
            title="Are you sure?"
            message={message}
          />
          <div className="form-group m-3">
            <Typography variant="label">Description: </Typography>
            <TextEditor
              type="text"
              className="form-control"
              toolbar="editor-toolbar"
              wrapper="editor-wrapper"
              editor="editor-title"
              id="note-description"
              value={noteBody}
              setter={inputHandlerDescription}
            />
          </div>
          <div className="form-group m-3 d-flex justify-content-between">
            <Button
              variant="contained"
              color="info"
              type="button"
              className="edit-form-control"
              onClick={() => setEditPage(false)}
            >
              Return
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="edit-form-control btn btn-primary"
            >
              Save Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
