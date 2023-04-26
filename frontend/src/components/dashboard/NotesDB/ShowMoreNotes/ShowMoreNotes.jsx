import './ShowMoreNotes.css';
import { useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Modal,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import NotesPreview from '../NotesPreview/NotesPreview';
import useSearchBar from '../../../../hooks/use-searchBar';

import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import useSortBy from '../../../../hooks/use-sortBy';
import { listUserNotes } from '../../../../services/note';

export default function ShowMoreNotes() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '75%',
    width: '75%',
    bgcolor: 'background.paper',
    border: '1px solid black',
    boxShadow: 24,
    p: 4,
  };
  const {
    status,
    currentPrivateNotePage,
    totalPrivateNotePages,
    updateCurrentPrivateNotePage,
    privateNotes: notes,
  } = useSelector((state) => state.note);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);

  const { lastElementChild: lastNote } = usePaginationWithInfiniteScroll({
    currPage: currentPrivateNotePage,
    totalPages: totalPrivateNotePages,
    updateCurrPage: updateCurrentPrivateNotePage,
    itemId: userId,
    itemName: 'userId',
    fetchFunction: listUserNotes,
    jwtAccessToken,
    status,
  });
  const { handleSearch, searchResults: privateNotes } = useSearchBar({
    searchFrom: notes,
    valueSearched: 'title',
    actionToDispatch: listUserNotes,
    userId,
    jwtAccessToken,
    status,
    debounceTime: 500,
  });

  const { sortBy, handleSortBy } = useSortBy({
    actionToDispatch: listUserNotes,
    userId,
    jwtAccessToken,
    status,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="text-center m-2">
        <Button
          type="button"
          variant="contained"
          className="btn btn-secondary"
          onClick={handleOpen}
        >
          Show More
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style} className="bt">
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', margin: 3, top: 0, right: 0 }}
          >
            <CloseIcon />
          </IconButton>{' '}
          <Typography
            id="modal-modal-title"
            className="m-2"
            variant="h5"
            component="h2"
          >
            Notes
          </Typography>
          <div className="secondline row" style={{ marginLeft: '-5px' }}>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="col-1">
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel sx={{ color: 'black' }}>Sort By</InputLabel>
                <Select
                  label="Sort By"
                  autoWidth
                  sx={{
                    backgroundColor: 'lightblue',
                  }}
                  value={sortBy}
                  onChange={(e) => handleSortBy(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="createdDate">Date</MenuItem>
                  <MenuItem value="Alphabetical">Alphabetically</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="thirdline notes-preview-container mt-2">
            <NotesPreview privateNotes={privateNotes} innerRef={lastNote} />
          </div>
        </Box>
      </Modal>
    </>
  );
}
