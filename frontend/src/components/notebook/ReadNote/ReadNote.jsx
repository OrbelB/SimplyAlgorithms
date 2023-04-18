/* eslint-disable no-unused-vars */
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
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import FlagIcon from '@mui/icons-material/Flag';
import { timeToExpire } from '../../../utilities/beautify-time';
import Report from '../../report/Report';
import TextEditor from '../../text-editor/TextEditor';

// import ShareIcon from '@mui/icons-material/Share';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AccountCircle from '@mui/icons-material/AccountCircle';

// function createData(user, permissions) {
//   return { user, permissions };
// }
// const rows = [
//   createData('Frozeyoghurt', 'Edit'),
//   createData('Something', 'Read'),
//   createData('Something#2', 'Read'),
// ];
export default function ReadNote({ note, onGoBack }) {
  const [body, setBody] = useState(note?.userNoteDTO?.noteBody);
  const [title, setTitle] = useState(note?.userNoteDTO?.title ?? '');
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
        <h4 className="card-title m-2">{title}</h4>
        <div className="card-text m-2">{parse(draftToHtml(body))}</div>
        <div className="d-flex justify-content-between m-2 mb-0">
          <Button className="m-1" onClick={onGoBack} variant="contained">
            Go Back
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleOpenReport}
            startIcon={<FlagIcon />}
            className="ml-auto"
          >
            Report
          </Button>
          <Report open={openReport} handleClose={handleCloseReport} />
        </div>
      </div>
    </div>
  );
}
