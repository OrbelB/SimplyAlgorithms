import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import './Report.css';
import { createReport } from '../../services/universalReport';
import LoadingBackdrop from '../loading/LoadingBackdrop';

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

function useReport({
  foreignId,
  typeOfForeignId,
  victumUserId,
  culpritUserId,
  category,
  report,
}) {
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const [reportFinished, setReportFinished] = useState(false);
  const dispatch = useDispatch();

  const submitReport = async () => {
    try {
      await dispatch(
        createReport({
          universalReportDTO: {
            foreignId,
            typeOfForeignId,
            victimUser: victumUserId,
            culpritUser: culpritUserId,
            catagory: category,
            report,
          },
          jwtAccessToken,
        })
      ).unwrap();
    } finally {
      setReportFinished(true);
    }
  };

  return {
    reportFinished,
    submitReport,
    setReportFinished,
  };
}

export default function BasicModal({
  open,
  handleClose,
  foreignId,
  typeOfForeignId,
  victumUserId,
  culpritUserId,
}) {
  const { status } = useSelector((state) => state.report);
  const [selectedReason, setSelectedReason] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [, setTheReport] = useState([]);
  const { submitReport } = useReport({
    foreignId,
    typeOfForeignId,
    victumUserId,
    culpritUserId,
    category: selectedReason,
    report: reportDesc,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTheReport((oldArray) => [
      ...oldArray,
      {
        id: new Date().getTime(),
        reason: selectedReason,
        description: reportDesc,
      },
    ]);
    try {
      await submitReport();
    } finally {
      setSelectedReason('');
      setReportDesc('');
      handleClose();
    }
  };

  const handleClear = () => {
    setSelectedReason('');
    setReportDesc('');
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="reportModal" sx={style}>
          {status === 'loading' && <LoadingBackdrop />}
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', margin: 3, top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Reporting something? We&apos;re here to help. Please follow the
            instructions below based on the type of report you need to make.
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={status === 'loading'}
            >
              submit
            </Button>
            <Button
              onClick={handleClear}
              sx={{ marginLeft: '1rem' }}
              variant="outlined"
            >
              Reset
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
