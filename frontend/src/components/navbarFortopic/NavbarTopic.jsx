import { HashLink } from 'react-router-hash-link';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

export default function NavbarTopic() {
  return (
    <div className="rounded-pill">
      <BottomNavigation
        sx={{
          border: 3,
          borderColor: 'grey.500',
          height: 55,
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
            borderRight: '3px solid grey',
          }}
          label={
            <span
              style={{
                margin: 0,
                padding: 0,
                verticalAlign: 'middle',
                fontSize: '20px',
              }}
            >
              <HashLink smooth to="#visualizer">
                Visualizer
              </HashLink>
            </span>
          }
        />
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: '3px solid grey',
          }}
          label={
            <span
              style={{
                margin: 0,
                padding: 0,
                verticalAlign: 'middle',
                fontSize: '20px',
              }}
            >
              <HashLink smooth to="#content">
                Content
              </HashLink>
            </span>
          }
        />
        <BottomNavigationAction
          sx={{
            height: 50,
            width: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRight: '3px solid grey',
          }}
          label={
            <span
              style={{
                margin: 0,
                padding: 0,
                verticalAlign: 'middle',
                fontSize: '20px',
              }}
            >
              <HashLink smooth to="#code">
                Code
              </HashLink>
            </span>
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
            <span
              style={{
                margin: 0,
                padding: 0,
                verticalAlign: 'middle',
                fontSize: '20px',
              }}
            >
              <HashLink smooth to="#comments">
                Comments
              </HashLink>
            </span>
          }
        />
      </BottomNavigation>
    </div>
  );
}
