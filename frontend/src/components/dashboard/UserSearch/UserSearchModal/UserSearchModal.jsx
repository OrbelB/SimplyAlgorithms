import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '1px solid black',
  boxShadow: 24,
  p: 4,
};

export default function ReportTable({ reports, open, handleClose }) {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const handleDialogClose = () => {
    setSelectedReport(null);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', margin: 2, top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>
          <TableContainer component={Paper} sx={{ marginTop: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>reportId</TableCell>
                  <TableCell>foreignId</TableCell>
                  <TableCell>culpritUser</TableCell>
                  <TableCell>victimUser</TableCell>
                  <TableCell>resolvedBy</TableCell>
                  <TableCell>typeOfForeignId</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>report</TableCell>
                  <TableCell>resolveNote</TableCell>
                  <TableCell>reportDate</TableCell>
                  <TableCell>resolveDate</TableCell>
                  <TableCell>isResolved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.reportId}>
                    <TableCell>{report.reportId}</TableCell>
                    <TableCell>{report.foreignId}</TableCell>
                    <TableCell>{report.culpritUser}</TableCell>
                    <TableCell>{report.victimUser}</TableCell>
                    <TableCell>{report.resolvedBy}</TableCell>
                    <TableCell>{report.typeOfForeignId}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell onClick={() => handleReportClick(report)}>
                      {report.report.substring(0, 50) + ' ...'}
                    </TableCell>
                    <TableCell>{report.resolveNote}</TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>{report.resolveDate}</TableCell>
                    <TableCell>{report.isResolved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Dialog open={!!selectedReport} onClose={handleDialogClose} maxWidth="md">
        <DialogTitle>Report Description</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedReport?.report}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
