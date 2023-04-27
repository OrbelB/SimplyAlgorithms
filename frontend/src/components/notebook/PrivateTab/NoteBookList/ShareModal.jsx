import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { timeToExpire } from '../../../../utilities/beautify-time';
import AreYouSureModal from '../../../AreYourSureModal/AreYouSureModal';
import {
  updateEditPermission,
  updateExpireDateOnSharedNotes,
  unShareNote,
  shareNote,
} from '../../../../services/note';

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

export default function ShareModal({ open, handleClose, sharedToo, element }) {
  const [shareTo, setShareTo] = useState('');
  const [sharePermission, setSharePermission] = useState('Read');
  const [shareDays, setShareDays] = useState(15);
  const dispatch = useDispatch();
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const [sharePermissions, setSharePermissions] = useState(() => {
    const initialPermissions = {};
    sharedToo?.forEach((item) => {
      initialPermissions[item.shareId] = item.canEdit ? 'Edit' : 'Read';
    });
    return initialPermissions;
  });

  const [expireDays, setExpireDays] = useState(() =>
    Object.fromEntries(sharedToo?.map((item) => [item.shareId, 0]) ?? [])
  );
  const [shareErr, setShareErr] = useState(false);

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
    } catch (err) {
      setShareErr(true);
    } finally {
      setShareTo('');
      setSharePermission('Read');
    }
  };

  const handleSaveSharedChanges = async (shareId) => {
    // Implement save changes logic here
    const canEdit = sharePermissions[shareId] === 'Edit';
    const amountOfDays = expireDays[shareId];
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

  // removes users from the note share list; in other words unshare the note to the user
  const handleRemoveClick = async (shareId) => {
    // Implement remove logic here
    dispatch(unShareNote({ shareId, jwtAccessToken }));
  };

  const handleShareNumber = (event) => {
    const value = event.target.valueAsNumber;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    setShareDays(parsed);
  };

  const handleExpireNumber = (event, shareId) => {
    const value = event.target.valueAsNumber;
    const parsed = parseInt(value, 10);
    if (Number.isNaN(parsed)) return;
    setExpireDays((prev) => ({
      ...prev,
      [shareId]: parsed,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', margin: 3, top: 0, right: 0 }}
        >
          <CloseIcon />
        </IconButton>
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
            value={sharePermission}
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
            onChange={handleShareNumber}
            sx={{ marginRight: '20px', width: '150px' }}
            inputProps={{
              min: 1,
              max: 365,
            }}
          />
          <Button
            className="mt-2"
            type="submit"
            variant="contained"
            color="primary"
            style={{ display: 'block', marginTop: '20px' }}
          >
            Add User
          </Button>
          <AreYouSureModal
            open={shareErr}
            onClose={() => setShareErr(false)}
            onConfirm={() => setShareErr(false)}
            title="ERROR: User not found! Check your spelling"
          />
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
                      value={sharePermissions[userShared.shareId]}
                      onChange={(event) => {
                        setSharePermissions((prev) => ({
                          ...prev,
                          [userShared.shareId]: event.target.value,
                        }));
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
                        min: 1,
                        max: 365,
                      }}
                      value={expireDays[userShared.shareId]}
                      onChange={(e) =>
                        handleExpireNumber(e, userShared.shareId)
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
  );
}
