import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  darken,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MdWhatshot } from 'react-icons/md';

export default function DayStreak() {
  const { dayStreak } = useSelector((state) => state.user);
  return (
    <Card
      className="daystreak"
      sx={{
        border: 2,
        backgroundColor: 'var(--color-bg-main)',
      }}
    >
      <CardHeader
        title="Login Day Streak"
        sx={{
          bgcolor: darken('#97F9FF', 0.05),
          textAlign: 'center',
        }}
        className="mb-3"
        titleTypographyProps={{ variant: 'h5', align: 'center' }}
      />
      <CardContent className="daystreak-body">
        <Typography variant="h2" align="center">
          {dayStreak}
          <MdWhatshot style={{ marginBottom: 10, marginLeft: 5 }} />
        </Typography>
      </CardContent>
    </Card>
  );
}
