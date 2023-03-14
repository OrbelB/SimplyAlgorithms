import { NavLink } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import { Alert, Box, Button } from '@mui/material';
import './ForumPreview.css';

export default function ForumPreview() {
  return (
    <Box sx={{ bgcolor: '#FDFCF4' }} className="forum-section text-center p-5">
      <h4>
        Need more clarification on this topic, dont be afraid to ask in the
        Forum.
        <br />
        <br />
        <Alert
          sx={{
            display: 'flex',
            textAlign: 'center',
            width: '23%',
            margin: 'auto',
          }}
          variant="filled"
          severity="info"
          color="warning"
        >
          You need an <strong>account</strong> to use the forum
        </Alert>
        <br />
        <NavLink className="link-warning" to="/forums">
          <Button
            size="large"
            variant="contained"
            sx={{ bgcolor: 'info.main' }}
            startIcon={<ForumIcon />}
          >
            Forum
          </Button>
        </NavLink>
      </h4>
    </Box>
  );
}
