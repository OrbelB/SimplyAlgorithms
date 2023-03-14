import { HashLink } from 'react-router-hash-link';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

export default function NavbarTopic() {
  return (
    <div className="rounded-pill">
      <BottomNavigation
        sx={{
          border: 3,
          borderColor: 'grey.500',
          height: 50,
          width: 550,
        }}
        className="rounded-pill"
        showLabels
      >
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          label={
            <h4 sx={{ margin: 0, padding: 0, verticalAlign: 'middle' }}>
              <HashLink smooth to="#visualizer">
                Visualizer
              </HashLink>
            </h4>
          }
        />
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          label={
            <h4 sx={{ margin: 0, padding: 0, verticalAlign: 'middle' }}>
              <HashLink smooth to="#content">
                Content
              </HashLink>
            </h4>
          }
        />
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          label={
            <h4 sx={{ margin: 0, padding: 0, verticalAlign: 'middle' }}>
              <HashLink smooth to="#code">
                Code
              </HashLink>
            </h4>
          }
        />
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          label={
            <h4
              sx={{
                margin: 0,
                padding: 0,
                verticalAlign: 'middle',
              }}
            >
              <HashLink smooth to="#comments">
                Comments
              </HashLink>
            </h4>
          }
        />
      </BottomNavigation>
    </div>
  );
}
