/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

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
  Select,
  Chip,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
// import TextEditor from '../../../text-editor/TextEditor';

function createData(user, permissions) {
  return { user, permissions };
}
const rows = [
  createData('Frozeyoghurt', 'Edit'),
  createData('Something', 'Read'),
  createData('Something#2', 'Read'),
];

export default function NoteBookList({ element, notes, setNotes }) {
  const [editPage, setEditPage] = useState(false);

  const removeHandler = (id) => {
    const newNotes = notes.filter((elm) => {
      if (elm.id !== id) {
        return elm;
      }
    });
    setNotes(newNotes);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid black',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
  const handleRemoveClick = (user) => {
    // Implement remove logic here
    console.log(`Remove user ${user}`);
  };
  const handlePermissionChange = (user, event) => {
    // Implement permission change logic here
    console.log(`Change permission for user ${user} to ${event.target.value}`);
  };
  const [isPublic, setIsPublic] = useState(false);

  const handleButtonClick = () => {
    setIsPublic(!isPublic);
  };

  return (
    <>
      {editPage === false ? (
        <>
          <div className="card m-3 mb-4">
            <div className="card-body">
              <Chip
                className="m-1"
                label={isPublic ? 'Public' : 'Private'}
                color={isPublic ? 'success' : 'error'}
              />
              <h4 className="card-title m-2">{element.title}</h4>
              <p className="card-text m-2">{element.description}</p>
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
        </>
      ) : editPage === true ? (
        <>
          <div className="card m-3 mb-4">
            <div className="card-body">
              <Chip
                className="m-3"
                label={isPublic ? 'Public' : 'Private'}
                color={isPublic ? 'success' : 'error'}
              />
              <form>
                <div className="form-group m-3">
                  <label htmlFor="notetitle">Title: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edittitle"
                    placeholder="Enter title"
                    value={element.title}
                  />
                </div>
                <Button
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
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
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
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
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
                </Modal>
                <Button
                  variant="contained"
                  color={isPublic ? 'success' : 'error'}
                  onClick={handleButtonClick}
                >
                  {isPublic ? 'Public' : 'Private'}
                </Button>
                <div className="form-group m-3">
                  <label htmlFor="notedescription">Description: </label>
                  <textarea
                    type="text"
                    className="form-control"
                    toolbar="editor-toolbar"
                    wrapper="editor-wrapper"
                    editor="editor-title"
                    id="editdescription"
                    placeholder="Enter description"
                    rows="8"
                  >
                    {element.description}
                  </textarea>
                </div>
                <div className="form-group m-3">
                  <button
                    type="button"
                    className="edit-form-control btn btn-primary"
                    onClick={() => {
                      setEditPage(false);
                    }}
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}
