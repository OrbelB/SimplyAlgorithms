/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { timeToExpire } from '../../../utilities/beautify-time';
import TextEditor from '../../text-editor/TextEditor';
import { updateSharedUserNote } from '../../../services/note';
// import TextEditor from '../../../text-editor/TextEditor';

// function createData(user, permissions) {
//   return { user, permissions };
// }
// const rows = [
//   createData('Frozeyoghurt', 'Edit'),
//   createData('Something', 'Read'),
//   createData('Something#2', 'Read'),
// ];
export default function EditNote({ note, onGoBack }) {
  const dispatch = useDispatch();
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const [body, setBody] = useState(note?.userNoteDTO?.noteBody);
  const [title, setTitle] = useState(note?.userNoteDTO?.title ?? '');
  const inputHandlerDescription = (e) => {
    setBody(e);
  };
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 500,
  //   bgcolor: 'background.paper',
  //   border: '1px solid black',
  //   boxShadow: 24,
  //   p: 4,
  // };
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const permissions = [
  //   {
  //     value: 'Read',
  //     label: 'Read',
  //   },
  //   {
  //     value: 'Edit',
  //     label: 'Edit',
  //   },
  // ];
  // const handleRemoveClick = (user) => {
  //   // Implement remove logic here
  //   console.log(`Remove user ${user}`);
  // };
  // const handlePermissionChange = (user, event) => {
  //   // Implement permission change logic here
  //   console.log(`Change permission for user ${user} to ${event.target.value}`);
  // };

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
            <label htmlFor="notetitle">Title: </label>
            <input
              type="text"
              className="form-control"
              id="edittitle"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/* <Button
            variant="contained"
            className="m-3"
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
              <form className="mt-2">
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
                  variant="standard"
                  margin="normal"
                  required
                />
                <TextField
                  select
                  label="Permissions"
                  defaultValue="Edit"
                  variant="standard"
                  margin="normal"
                  sx={{ width: '100px' }}
                  required
                >
                  {permissions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <Button
                  className="mt-2"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add User
                </Button>
              </form>
              <hr />
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Permissions</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.user}>
                        <TableCell component="th" scope="row">
                          {row.user}
                        </TableCell>
                        <Select
                          className="m-3"
                          value={row.permissions}
                          onChange={(event) =>
                            handlePermissionChange(row.user, event)
                          }
                        >
                          {permissions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>

                        <TableCell>
                          <IconButton
                            onClick={() => handleRemoveClick(row.user)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Modal> */}
          <div className="form-group m-3">
            <label htmlFor="notedescription">Description: </label>
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
          </div>
          <div className="d-flex justify-content-between m-2 mb-0">
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
        </form>
      </div>
    </div>
  );
}
