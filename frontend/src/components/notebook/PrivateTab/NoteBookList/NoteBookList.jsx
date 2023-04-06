/* eslint-disable no-nested-ternary */
import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircle from '@mui/icons-material/AccountCircle';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { useDispatch, useSelector } from 'react-redux';
import TextEditor from '../../../text-editor/TextEditor';
import {
  deleteNote,
  listSharedToo,
  privateNote,
  publicizeNote,
  shareNote,
  unShareNote,
  updateEditPermission,
  updateExpireDateOnSharedNotes,
  updateUserNote,
} from '../../../../services/note';
// import { updateSharedEditPermission } from '../../../../store/reducers/note-slice';
import { timeToExpire } from '../../../../utilities/beautify-time';
import useJwtPermssionExists from '../../../../hooks/use-jwtPermission';

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
  const [shareDays, setShareDays] = useState(15);
  const { status } = useSelector((state) => state.note);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
  const [editPage, setEditPage] = useState(false);
  const body = useMemo(() => {
    return parse(draftToHtml(element?.noteBody));
  }, [element?.noteBody]);

  const [shareTo, setShareTo] = useState('');
  const [sharePermission, setSharePermission] = useState('Read');
  const [noteTitle, setNoteTitle] = useState(element?.title ?? '');
  // eslint-disable-next-line no-unused-vars
  const [sharePermissions, setSharePermissions] = useState(
    () =>
      new Map(
        sharedToo?.map((item) => [
          item.shareId,
          item.canEdit ? 'Edit' : 'Read',
        ]) ?? []
      )
  );
  const [expireDays, setExpireDays] = useState(
    () => new Map(sharedToo?.map((item) => [item.shareId, 0]) ?? [])
  );
  const [noteBody, setNoteBody] = useState(element?.noteBody ?? content);
  const [isPublic, setIsPublic] = useState(element?.isPublic === 1);
  const removeHandler = () => {
    try {
      dispatch(
        deleteNote({ noteId: element.noteId, userId, jwtAccessToken })
      ).unwrap();
    } finally {
      // future logic
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid black',
    boxShadow: 24,
    p: 4,
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
  const permissions = [
    {
      value: 'Read',
      label: 'Read',
    },
    {
      value: 'Edit',
      label: 'Edit',
    },
  ];

  const handleRemoveClick = async (shareId) => {
    // Implement remove logic here
    dispatch(unShareNote({ shareId, jwtAccessToken }));
  };

  // const handlePermissionChange = (shareId, user, event) => {
  //   // Implement permission change logic here
  //   dispatch(
  //     updateSharedEditPermission({ shareId, canEdit: event.target.value })
  //   );
  // };

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

  const handleShareNote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const noteShareDTO = {
      shareToUserName: shareTo,
      canEdit: sharePermission === 'Edit',
      numberOfDaysToShare: shareDays,
    };
    const userNoteDTO = {
      noteId: element.noteId,
    };
    try {
      await dispatch(
        shareNote({ noteShareDTO, userNoteDTO, jwtAccessToken })
      ).unwrap();
    } finally {
      setShareTo('');
      setSharePermission('Read');
    }
  };

  const handleSaveSharedChanges = async (shareId) => {
    // Implement save changes logic here
    const canEdit = sharePermissions.get(shareId) === 'Edit';
    const amountOfDays = expireDays.get(shareId);
    const noteShareDTO = {
      shareToUserName: shareTo,
      shareId,
      canEdit,
      numberOfDaysToShare: amountOfDays,
    };

    if (
      canEdit !== sharedToo.find((item) => item.shareId === shareId).canEdit
    ) {
      dispatch(updateEditPermission({ userId, shareId, jwtAccessToken }));
    }
    if (amountOfDays === undefined || amountOfDays === 0) return;
    dispatch(updateExpireDateOnSharedNotes({ noteShareDTO, jwtAccessToken }));
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
          onClick={() => {
            removeHandler(element.id);
          }}
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Share
              </Typography>
              <form
                className="mt-2"
                onSubmit={handleShareNote}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <TextField
                  id="input-with-icon-textfield"
                  label="Username"
                  sx={{ marginRight: '20px', width: '200px' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={shareTo}
                  onChange={(e) => setShareTo(e.target.value)}
                  variant="standard"
                  margin="normal"
                  required
                />
                <TextField
                  select
                  label="Permissions"
                  defaultValue={sharePermission}
                  variant="standard"
                  margin="normal"
                  sx={{ marginRight: '20px', width: '100px' }}
                  required
                  onChange={(e) => setSharePermission(e.target.value)}
                >
                  {permissions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Set Days to Share"
                  variant="standard"
                  type="number"
                  margin="normal"
                  value={shareDays}
                  onChange={(e) => setShareDays(e.target.value)}
                  sx={{ marginRight: '20px', width: '150px' }}
                  inputProps={{
                    min: 1,
                    max: 365,
                  }}
                >
                  {/* set number of days left to expire here */}
                </TextField>
                <Button
                  className="mt-2"
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ display: 'block', marginTop: '20px' }}
                >
                  Add User
                </Button>
              </form>
              <hr />
              <TableContainer component={Paper} key={sharedToo.length}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Permissions</TableCell>
                      <TableCell>Expires (Days)</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sharedToo?.map((userShared) => (
                      <TableRow key={userShared.shareId}>
                        <TableCell component="th" scope="row">
                          {userShared.shareToUserName}
                        </TableCell>
                        <TableCell>
                          <TextField
                            select
                            className="m-3 w-100"
                            label={userShared.canEdit ? 'Edit' : 'Read'}
                            onChange={(event) => {
                              setSharePermissions((prev) => {
                                return prev.set(
                                  userShared.shareId,
                                  event.target.value
                                );
                              });
                            }}
                          >
                            {permissions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            label={timeToExpire(userShared.expireDate)}
                            inputProps={{
                              min:
                                0 - Number(timeToExpire(userShared.expireDate)),
                              max: 365,
                            }}
                            onChange={(e) =>
                              setExpireDays((prev) => {
                                return prev.set(
                                  userShared.shareId,
                                  e.target.value
                                );
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            type="button"
                            onClick={() =>
                              handleRemoveClick(
                                userShared.shareId,
                                userShared.shareToUserName
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            type="button"
                            onClick={() =>
                              handleSaveSharedChanges(userShared.shareId)
                            }
                          >
                            <SaveIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Modal>
          <Button
            type="button"
            variant="contained"
            disabled={status === 'pending' || isStudent}
            color={isPublic ? 'success' : 'error'}
            onClick={handleUpdatingIsPublic}
          >
            {isPublic ? 'Public' : 'Private'}
          </Button>
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
