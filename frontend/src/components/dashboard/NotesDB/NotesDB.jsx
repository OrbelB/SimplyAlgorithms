import { useSelector } from 'react-redux';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import NotesPreview from './NotesPreview/NotesPreview';
import useSearchBar from '../../../hooks/use-searchBar';
import { listUserNotes } from '../../../services/note';
import useSortBy from '../../../hooks/use-sortBy';

export default function NotesDB() {
  const { privateNotes: notes, status } = useSelector((state) => state.note);
  const { jwtAccessToken, userId } = useSelector((state) => state.auth);
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

  return (
    <div>
      <div className="secondline-comments row p-2">
        <div className="col-5">
          <div className="input-group">
            <input
              type="search"
              onChange={handleSearch}
              id="form1"
              className="form-control"
              placeholder="Search..."
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
              value={sortBy.get('sortBy') ?? ''}
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="createdDate">Date</MenuItem>
              <MenuItem value="Alphabetical">Alphabetically</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="thirdline-comments">
        <NotesPreview privateNotes={privateNotes?.slice(0, 5)} />
      </div>
    </div>
  );
}
