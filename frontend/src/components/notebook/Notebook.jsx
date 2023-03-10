import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';

import NotebookDrawer from './NotebookDrawer/NoteBookDrawer';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Drawer
      anchor={isSmallScreen ? 'right' : 'bottom'}
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(() => false)}
    >
      <Box
        height={isSmallScreen ? '' : '600px'}
        width={isSmallScreen ? '450px' : 'auto'}
      >
        <NotebookDrawer />
      </Box>
    </Drawer>
  );
}
