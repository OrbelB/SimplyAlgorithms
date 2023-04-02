import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forumActions } from '../../../store/reducers/forum-slice';

export default function ReportModal() {
  const { reportId } = useSelector((state) => state.forum);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(forumActions.removeSingleReportId());
    setOpen(false);
  };
  if (reportId && !open) setOpen(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Your report has been processed. The report id is {reportId}
      </Alert>
    </Snackbar>
  );
}
