import { Box, Drawer } from '@mui/material';
import { useState } from 'react';
import NotebookDrawer from './NotebookDrawer/NoteBookDrawer';

export default function Notebook() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="drawer_size_min">
        <button
          type="button"
          className="btn btn-link"
          onClick={() => setIsDrawerOpen(true)}
        >
          Notebook
        </button>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box width="400px">
          <NotebookDrawer />
        </Box>
      </Drawer>
    </>
  );
}
