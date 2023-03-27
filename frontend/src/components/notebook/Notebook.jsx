/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useState } from 'react';
import NoteBookNav from './PrivateTab/NoteBookNav/NoteBookNav';
import PubNoteNav from './PublicTab/PubNoteNav/PubNoteNav';
import SharedTab from './SharedTab/SharedTabNav/SharedTabNav';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
  const [NoteTab, setNoteTab] = useState(1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [drawerWidth, setDrawerWidth] = useState(isSmallScreen ? 450 : '100%');

  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    setDrawerWidth(newWidth);
  };

  return (
    <Drawer
      anchor={isSmallScreen ? 'right' : 'bottom'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(() => false)}
    >
      <Box height={isSmallScreen ? '' : '600px'} width={drawerWidth}>
        <h1 className="text-center m-1">Notebook</h1>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <h5 className="m-2">Drawer Width:</h5>
          <FormControl>
            <Select
              style={{ fontSize: '20px', height: '40px', minWidth: '120px' }}
              value={drawerWidth}
              onChange={handleWidthChange}
              variant="standard"
              className="m-2"
              label="Width"
            >
              <MenuItem value={450}>Default</MenuItem>
              <MenuItem value="100vw">Full Screen</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="btn-group d-flex flex-row flex-wrap justify-content-center">
          <button
            type="button"
            className="btn btn-danger d-inline-flex flex-grow-0"
            onClick={() => setNoteTab(1)}
          >
            Private
          </button>
          <button
            type="button"
            className="btn btn-success d-inline-flex flex-grow-0"
            onClick={() => setNoteTab(2)}
          >
            Public
          </button>
          <button
            type="button"
            className="btn btn-secondary d-inline-flex flex-grow-0"
            onClick={() => setNoteTab(3)}
          >
            Shared
          </button>
        </div>
        {NoteTab === 1 ? (
          <NoteBookNav />
        ) : NoteTab === 2 ? (
          <PubNoteNav />
        ) : NoteTab === 3 ? (
          <SharedTab />
        ) : (
          ''
        )}
      </Box>
    </Drawer>
  );
}
