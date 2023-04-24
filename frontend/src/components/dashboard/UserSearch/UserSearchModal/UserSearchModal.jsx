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
  TableFooter,
  TablePagination,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import styles from './UserSearchModal.module.css';
import { reportActions } from '../../../../store/reducers/report-slice';
import { listReportByIndividual } from '../../../../services/universalReport';

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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function ReportTable({
  reports,
  open,
  handleClose,
  usernameOrId,
  individual,
}) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { currentPage, totalPages, totalElements } = useSelector(
    (state) => state.report
  );
  const [fetchPage, setFetchPage] = useState(false);
  const { jwtAccessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  useEffect(() => {
    if (currentPage + 1 <= totalPages && fetchPage) {
      dispatch(
        listReportByIndividual({
          page: currentPage,
          size: rowsPerPage,
          userIdOrUsername: usernameOrId,
          individual,
          jwtAccessToken,
        })
      );
      setFetchPage(false);
    }
  }, [
    currentPage,
    dispatch,
    fetchPage,
    individual,
    jwtAccessToken,
    rowsPerPage,
    totalPages,
    usernameOrId,
  ]);
  const handleDialogClose = () => {
    setSelectedReport(null);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(reportActions.updateCurrentPage(newPage));
    setFetchPage(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    dispatch(reportActions.updateCurrentPage(0));
  };

  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - reports.length)
      : 0;

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
                {(rowsPerPage > 0
                  ? reports.slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                  : reports
                ).map((report) => (
                  <TableRow key={report.reportId} sx={rowStyle}>
                    <TableCell sx={cellStyle}>{report.reportId}</TableCell>
                    <TableCell sx={cellStyle}>{report.foreignId}</TableCell>
                    <TableCell sx={cellStyle}>
                      {report.culpritUser?.username ?? ''}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {report.victimUser?.username ?? ''}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {report.resolvedBy?.username ?? ''}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {report.typeOfForeignId}
                    </TableCell>
                    <TableCell sx={cellStyle}>{report.catagory}</TableCell>
                    <TableCell
                      sx={cellStyle}
                      onClick={() => handleReportClick(report)}
                    >
                      {report.report.substring(0, 50) + ' ...'}
                    </TableCell>
                    <TableCell sx={cellStyle}>{report.resolveNote}</TableCell>
                    <TableCell sx={cellStyle}>{report?.reportDate}</TableCell>
                    <TableCell sx={cellStyle}>{report?.resolveDate}</TableCell>
                    <TableCell>{report.isResolved}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className={styles.innerP}
                    rowsPerPageOptions={[3, 5, 10]}
                    colSpan={12}
                    count={totalElements ?? 0}
                    page={currentPage ?? 0}
                    rowsPerPage={rowsPerPage ?? 5}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
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
