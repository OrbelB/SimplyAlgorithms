/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux';
import { Box, Drawer, Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';
import image from '../../assets/escapebutton.jpg';
import NoteBookNav from './PrivateTab/NoteBookNav/NoteBookNav';
import PubNoteNav from './PublicTab/PubNoteNav/PubNoteNav';
import SharedTab from './SharedTab/SharedTabNav/SharedTabNav';
import {
  listPublicNotes,
  listSharedNotes,
  listUserNotes,
} from '../../services/note';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
  const [selectedTab, setSelectedTab] = useState(1);
  const [NoteTab, setNoteTab] = useState(1);
  const { userId, jwtAccessToken } = useSelector((state) => state.auth);
  const [drawerWidth, setDrawerWidth] = useState('45vw');
  const dispatch = useDispatch();
  const handleToggle = () => {
    if (drawerWidth === '45vw') {
      setDrawerWidth('100vw');
    } else {
      setDrawerWidth('45vw');
    }
  };

  const handleTabChange = async (newValue) => {
    setSelectedTab(newValue);
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
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(() => false)}
    >
      <Box width={drawerWidth} style={{ overflowY: 'scroll' }}>
        <Box display="flex" justifyContent="space-between" className="m-1">
          <h6 className="text-left m-2">
            To close the notebook, use the
            <img src={image} alt="escape button" height="50" width="50" />
          </h6>
          <Button
            style={{ fontSize: '18px', height: '35px', minWidth: '100px' }}
            variant="contained"
            className="m-3"
            onClick={handleToggle}
          >
            {drawerWidth === '45vw' ? 'Default' : 'Full Screen'}
          </Button>
        </Box>
        <h1 className="text-center">Notebook</h1>
        <ButtonGroup className="btn-group d-flex flex-row flex-wrap justify-content-center">
          <Button
            type="button"
            className={`btn btn-danger d-inline-flex flex-grow-0 ${
              selectedTab === 1 ? 'text-decoration-underline fw-bold' : ''
            }`}
            variant="contained"
            color="error"
            style={{ fontSize: '20px', height: '40px', minWidth: '100px' }}
            onClick={() => handleTabChange(1)}
          >
            Private
          </Button>
          <Button
            type="button"
            className={`btn btn-success d-inline-flex flex-grow-0 ${
              selectedTab === 2 ? 'text-decoration-underline fw-bold' : ''
            }`}
            variant="contained"
            color="success"
            style={{ fontSize: '20px', height: '40px', minWidth: '100px' }}
            onClick={() => handleTabChange(2)}
          >
            Public
          </Button>
          <Button
            type="button"
            className={`btn btn-secondary d-inline-flex flex-grow-0 ${
              selectedTab === 3 ? 'text-decoration-underline fw-bold' : ''
            }`}
            variant="contained"
            color="secondary"
            style={{ fontSize: '20px', height: '40px', minWidth: '100px' }}
            onClick={() => handleTabChange(3)}
          >
            Shared
          </Button>
        </ButtonGroup>
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
