import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export default function LoadingBackdrop() {
  return (
    <Backdrop
      sx={{ color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress />
    </Backdrop>
  );
}
