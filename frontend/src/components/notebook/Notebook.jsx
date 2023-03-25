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
import NoteBookNav from './NoteBookNav/NoteBookNav';

export default function Notebook({ isDrawerOpen, setIsDrawerOpen }) {
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
        <NoteBookNav />
      </Box>
    </Drawer>
  );
}
