import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import './Report.css';

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

const reasons = [
  {
    value: 'Profanity',
    label: 'Profanity',
  },
  {
    value: 'Incorrect Information',
    label: 'Incorrect Information',
  },
  {
    value: 'Error',
    label: 'Error',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedReason, setSelectedReason] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [theReport, setTheReport] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTheReport((oldArray) => [
      ...oldArray,
      {
        id: new Date().getTime(),
        reason: selectedReason,
        description: reportDesc,
      },
    ]);
    console.log(theReport);
    setSelectedReason('');
    setReportDesc('');
    handleClose();
  };

  const handleClear = () => {
    setSelectedReason('');
    setReportDesc('');
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Report
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="reportModal" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Did you want to report something you saw. Well you are at the right
            place. Follow the instructions below.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className="mt-3"
              id="filled-select-reason"
              select
              label="Select"
              defaultValue=""
              helperText="Select Reason for Report"
              variant="filled"
              value={selectedReason}
              onChange={(e) => {
                setSelectedReason(e.target.value);
              }}
              required
            >
              {reasons.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              className="mt-3 mb-3"
              label="Description"
              variant="filled"
              type="text"
              multiline
              rows={5}
              value={reportDesc}
              onChange={(e) => setReportDesc(e.target.value)}
              fullWidth
              required
            />
            <br />
            <Button type="submit" variant="contained" color="primary">
              submit
            </Button>
            <Button onClick={handleClear} variant="outlined">
              Reset
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
