import './ShowMoreNotes.css';
import { useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import NotesPreview from '../NotesPreview/NotesPreview';
import useSearchBar from '../../../../hooks/use-searchBar';

import usePaginationWithInfiniteScroll from '../../../../hooks/use-pagination';
import useSortBy from '../../../../hooks/use-sortBy';
import { listUserNotes } from '../../../../services/note';

export default function ShowMoreNotes() {
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

  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <div className="text-center m-2">
        <Button
          type="button"
          variant="contained"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#backdrop2"
        >
          Show More
        </Button>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="backdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bt">
            <div className="modal-header">
              <h2 className="modal-title" id="staticBackdropLabel">
                Notes
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="secondline row">
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
              <div className="thirdline">
                <NotesPreview privateNotes={privateNotes} innerRef={lastNote} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
