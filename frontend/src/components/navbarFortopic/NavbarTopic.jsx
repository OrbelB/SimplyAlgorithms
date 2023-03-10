import { HashLink } from 'react-router-hash-link';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

export default function NavbarTopic() {
  return (
    <div className="rounded-pill">
      <BottomNavigation
        sx={{
          border: 3,
          borderColor: 'grey.500',
        }}
        className="rounded-pill"
        showLabels
      >
        <BottomNavigationAction
          sx={{ fontWeight: 'bold' }}
          label={
            <HashLink smooth to="#visualizer">
              Visualizer
            </HashLink>
          }
        />
        <BottomNavigationAction
          sx={{ fontWeight: 'bold' }}
          label={
            <HashLink smooth to="#content">
              Content
            </HashLink>
          }
        />
        <BottomNavigationAction
          sx={{ fontWeight: 'bold' }}
          label={
            <HashLink smooth to="#code">
              Code
            </HashLink>
          }
        />
        <BottomNavigationAction
          sx={{ fontWeight: 'bold' }}
          label={
            <HashLink smooth to="#comments">
              Comments
            </HashLink>
          }
        />
      </BottomNavigation>
    </div>
  );
}
