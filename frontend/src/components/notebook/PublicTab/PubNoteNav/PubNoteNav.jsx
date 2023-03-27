import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import PubNoteList from '../PubNotesList/PubNotesList';

export default function PubNoteNav() {
  const [open, setOpen] = useState(true);
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
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
              <MenuItem value="Alphabetical">Alphabetically</MenuItem>
            </Select>
          </FormControl>
          <br />
        </div>
        <div className="mt-3" sx={{ width: '100%' }}>
          <FormGroup sx={{ maxWidth: '100%', marginLeft: '10px' }}>
            <FormControlLabel control={<Checkbox />} label="Filter" />
          </FormGroup>
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
        <PubNoteList />
      </div>
    </>
  );
}
