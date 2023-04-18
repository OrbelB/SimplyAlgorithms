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

  const cellStyle = { borderRight: '1px solid #ccc' };
  const rowStyle = { borderBottom: '1px solid #ccc' };

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
                <TableRow sx={rowStyle}>
                  <TableCell sx={cellStyle}>reportId</TableCell>
                  <TableCell sx={cellStyle}>foreignId</TableCell>
                  <TableCell sx={cellStyle}>culpritUser</TableCell>
                  <TableCell sx={cellStyle}>victimUser</TableCell>
                  <TableCell sx={cellStyle}>resolvedBy</TableCell>
                  <TableCell sx={cellStyle}>typeOfForeignId</TableCell>
                  <TableCell sx={cellStyle}>category</TableCell>
                  <TableCell sx={cellStyle}>report</TableCell>
                  <TableCell sx={cellStyle}>resolveNote</TableCell>
                  <TableCell sx={cellStyle}>reportDate</TableCell>
                  <TableCell sx={cellStyle}>resolveDate</TableCell>
                  <TableCell>isResolved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.reportId} sx={rowStyle}>
                    <TableCell sx={cellStyle}>{report.reportId}</TableCell>
                    <TableCell sx={cellStyle}>{report.foreignId}</TableCell>
                    <TableCell sx={cellStyle}>{report.culpritUser}</TableCell>
                    <TableCell sx={cellStyle}>{report.victimUser}</TableCell>
                    <TableCell sx={cellStyle}>{report.resolvedBy}</TableCell>
                    <TableCell sx={cellStyle}>
                      {report.typeOfForeignId}
                    </TableCell>
                    <TableCell sx={cellStyle}>{report.category}</TableCell>
                    <TableCell
                      sx={cellStyle}
                      onClick={() => handleReportClick(report)}
                    >
                      {report.report.substring(0, 50) + ' ...'}
                    </TableCell>
                    <TableCell sx={cellStyle}>{report.resolveNote}</TableCell>
                    <TableCell sx={cellStyle}>{report.reportDate}</TableCell>
                    <TableCell sx={cellStyle}>{report.resolveDate}</TableCell>
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
