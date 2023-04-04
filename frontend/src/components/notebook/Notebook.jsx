/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
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
import {
  listPublicNotes,
  listSharedNotes,
  listUserNotes,
} from '../../services/note';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
  const [NoteTab, setNoteTab] = useState(1);
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const [drawerWidth, setDrawerWidth] = useState(isSmallScreen ? 450 : '100%');
  const dispatch = useDispatch();
  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    setDrawerWidth(newWidth);
  };

  const handleTabChange = async (newValue) => {
    switch (newValue) {
      case 1:
        if (NoteTab === 1) break;
        try {
          await dispatch(
            listUserNotes({ userId, jwtAccessToken, page: 0, size: 10 })
          ).unwrap();
        } finally {
          setNoteTab(newValue);
        }
        break;
      case 2:
        if (NoteTab === 2) break;
        try {
          await dispatch(
            listPublicNotes({ userId, jwtAccessToken, page: 0, size: 10 })
          ).unwrap();
        } finally {
          setNoteTab(newValue);
        }
        break;
      case 3:
        if (NoteTab === 3) break;
        try {
          await dispatch(
            listSharedNotes({
              userId,
              jwtAccessToken,
              page: 0,
              size: 10,
            })
          ).unwrap();
        } finally {
          setNoteTab(newValue);
        }
        break;
      default:
        setNoteTab(1);
    }
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
            onClick={() => handleTabChange(1)}
          >
            Private
          </button>
          <button
            type="button"
            className="btn btn-success d-inline-flex flex-grow-0"
            onClick={() => handleTabChange(2)}
          >
            Public
          </button>
          <button
            type="button"
            className="btn btn-secondary d-inline-flex flex-grow-0"
            onClick={() => handleTabChange(3)}
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
        ) : null}
      </Box>
    </Drawer>
  );
}
