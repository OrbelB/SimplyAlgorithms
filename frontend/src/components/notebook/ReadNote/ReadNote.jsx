/* eslint-disable react/self-closing-comp */
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
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircle from '@mui/icons-material/AccountCircle';

function createData(user, permissions) {
  return { user, permissions };
}
const rows = [
  createData('Frozeyoghurt', 'Edit'),
  createData('Something', 'Read'),
  createData('Something#2', 'Read'),
];
export default function ReadNote({ note, onGoBack }) {
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
  return (
    <div className="card m-3 mb-4">
      <div className="card-header">
        Expires: <strong>{note.expires} days</strong> &emsp; Permissions:{' '}
        <strong>{note.permissions}</strong>
      </div>
      <div className="card-body">
        <h4 className="card-title m-2">{note.title}</h4>
        <p className="card-text m-2">{note.description}</p>
        <div className="d-flex m-0 mb-0">
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
          </Modal>
          <Button onClick={onGoBack}>Go Back</Button>
        </div>
      </div>
    </div>
  );
}
