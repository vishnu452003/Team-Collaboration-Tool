import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarNotification = ({ open, handleClose, severity, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={5000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarNotification;
