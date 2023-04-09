import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { MdWhatshot } from 'react-icons/md';

export default function DayStreak() {
  const { dashboardInfo } = useSelector((state) => state.user);
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
        titleTypographyProps={{ variant: 'h5', align: 'center' }}
      />
      <CardContent className="daystreak-body">
        <Typography variant="h2" align="center">
          {dashboardInfo.dayStreak}
          <MdWhatshot style={{ marginBottom: 10, marginLeft: 5 }} />
        </Typography>
      </CardContent>
    </Card>
  );
}
