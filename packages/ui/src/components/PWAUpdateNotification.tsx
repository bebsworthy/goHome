import { useEffect, useState } from 'react';

import { Alert, Button, Snackbar } from '@mui/material';

import { applyUpdates } from '../serviceWorkerRegistration';

/**
 * Component that shows a notification when a new version of the app is available
 * and provides a button to update
 */
export default function PWAUpdateNotification() {
  const [open, setOpen] = useState(false);

  // Check for updates periodically
  useEffect(() => {
    // Initial check
    if (window.__PWA_UPDATE_AVAILABLE) {
      setOpen(true);
    }

    // Set up periodic checks
    const checkInterval = setInterval(() => {
      if (window.__PWA_UPDATE_AVAILABLE) {
        setOpen(true);
        clearInterval(checkInterval);
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    applyUpdates();
    setOpen(false);
  };

  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" onClick={handleUpdate}>
            UPDATE
          </Button>
        }
        onClose={handleClose}
      >
        A new version is available!
      </Alert>
    </Snackbar>
  );
}
