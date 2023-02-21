import { Box, Drawer, Typography } from '@mui/material';

import NotebookDrawer from './NotebookDrawer/NoteBookDrawer';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <>
      <Typography textAlign="center">Notebook</Typography>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(() => false)}
      >
        <Box width="400px">
          <NotebookDrawer />
        </Box>
      </Drawer>
    </>
  );
}
