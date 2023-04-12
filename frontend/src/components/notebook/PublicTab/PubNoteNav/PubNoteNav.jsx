import { useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import useSortBy from '../../../../hooks/use-sortBy';
import { listPublicNotes } from '../../../../services/note';
import PubNoteList from '../PubNotesList/PubNotesList';
import useSearchBar from '../../../../hooks/use-searchBar';

export default function PubNoteNav() {
  const [open, setOpen] = useState(true);
  const { status, publicNotes } = useSelector((state) => state.note);
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const { handleSearch, searchResults: notes } = useSearchBar({
    status,
    userId,
    jwtAccessToken,
    searchFrom: publicNotes,
    actionToDispatch: listPublicNotes,
    valueSearched: 'userNoteDTO.title',
    debounceTime: 500,
  });
  const { sortBy, handleSortBy } = useSortBy({
    actionToDispatch: listPublicNotes,
    jwtAccessToken,
    status,
    userId,
  });

  return (
    <>
      <div
        className="m-3"
        style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '100%' }}
      >
        <div className="d-flex">
          <TextField
            label="Search..."
            varient="standard"
            margin="normal"
            size="small"
            onChange={handleSearch}
            sx={{ marginLeft: '10px', width: '170px' }}
          />
          <FormControl sx={{ m: 2, minWidth: 120 }} size="small">
            <InputLabel sx={{ color: 'black' }}>Sort By</InputLabel>
            <Select
              label="Sort By"
              autoWidth
              sx={{
                backgroundColor: 'lightblue',
              }}
              value={sortBy.get('sortBy') ?? ''}
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="createdDate">Date</MenuItem>
              <MenuItem value="Alphabetical">Alphabetically</MenuItem>
            </Select>
          </FormControl>
          <br />
        </div>
        <div sx={{ width: '100%' }}>
          <Collapse in={open}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ m: 1 }}
            >
              Once you have a note selected it will be saved to the Private Tab
            </Alert>
          </Collapse>
        </div>
      </div>
      <div className="m-2" sx={{ maxWidth: '100%' }}>
        <PubNoteList notes={notes} />
      </div>
    </>
  );
}
