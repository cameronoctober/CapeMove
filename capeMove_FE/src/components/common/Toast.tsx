import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { popToast } from '../../slices/uiSlice';

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const queue = useAppSelector((s) => s.ui.toastQueue);
  const current = queue.length > 0 ? queue[0] : null;

  const handleClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(popToast());
  };

  return (
    <>
      {current && (
        <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={handleClose}>
          <Alert onClose={handleClose} severity={current.severity} sx={{ width: '100%' }}>
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Toast;
