import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';

const creditUser = {
  author: 'Username',
  dateofPublished: '03/10/2023',
  numOfTopicsPost: '3',
  numOfCommentsPost: '5',
  numOfForumPost: '3',
  numOfQuizzesMade: '6',
};

export default function Credit() {
  return (
    <Container sx={{ mt: 5, mb: 5 }} maxWidth="md">
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={`${creditUser.author} profile`}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {creditUser.author}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Joined since {creditUser.dateofPublished}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Credits
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1">Topics Posted</Typography>
            <Typography variant="h5" gutterBottom>
              {creditUser.numOfTopicsPost}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1">Comments Posted</Typography>
            <Typography variant="h5" gutterBottom>
              {creditUser.numOfCommentsPost}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1">Forum Posts</Typography>
            <Typography variant="h5" gutterBottom>
              {creditUser.numOfForumPost}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1">Quizzes Made</Typography>
            <Typography variant="h5" gutterBottom>
              {creditUser.numOfQuizzesMade}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
