import { useSelector } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SharedNotesList from '../SharedNotesList/SharedNotesList';
import useSortBy from '../../../../hooks/use-sortBy';
import { listSharedNotes } from '../../../../services/note';
import useSearchBar from '../../../../hooks/use-searchBar';

export default function SharedTab() {
  const { status, sharedNotes } = useSelector((state) => state.note);
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const { sortBy, handleSortBy } = useSortBy({
    actionToDispatch: listSharedNotes,
    userId,
    jwtAccessToken,
    status,
  });

  const { handleSearch, searchResults: notes } = useSearchBar({
    status,
    userId,
    jwtAccessToken,
    searchFrom: sharedNotes,
    actionToDispatch: listSharedNotes,
    valueSearched: 'userNoteDTO.title',
    debounceTime: 500,
  });

  return (
    <>
      <div className="d-flex m-2">
        <TextField
          label="Search..."
          varient="standard"
          margin="normal"
          size="small"
          onChange={handleSearch}
          sx={{ marginLeft: '15px', width: '170px' }}
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
            onChange={(e) => {
              handleSortBy(e.target.value);
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="createdDate">Date</MenuItem>
            <MenuItem value="Alphabetical">Alphabetically</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="m-2" sx={{ maxWidth: '100%' }}>
        <SharedNotesList notes={notes} />
      </div>
    </>
  );
}
