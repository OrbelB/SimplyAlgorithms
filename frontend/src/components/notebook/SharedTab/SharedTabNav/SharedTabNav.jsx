import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SharedNotesList from '../SharedNotesList/SharedNotesList';

export default function SharedTab() {
  return (
    <>
      <div className="d-flex m-2">
        <TextField
          label="Search..."
          varient="standard"
          margin="normal"
          size="small"
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
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Date">Date</MenuItem>
            <MenuItem value="Alphabetical">Alphabetically</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="m-2" sx={{ maxWidth: '100%' }}>
        <SharedNotesList />
      </div>
    </>
  );
}
