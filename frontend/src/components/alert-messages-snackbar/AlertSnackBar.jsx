import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

export default function AlertSnackBar({ typeMessage, passedMessage, removeData = () => {} }) {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    removeData();
    setOpen(false);
  };
  if (!open) setOpen(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={60}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={typeMessage}
        sx={{ width: "100%" }}
      >
        {passedMessage}
      </Alert>
    </Snackbar>
  );
}
