import { Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router';

import { CssBaseline } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';

import Pages from './routes/Pages';
import Header from './sections/Header';
import HotKeys from './sections/HotKeys';
import Sidebar from './sections/Sidebar';
import { useStationCache } from './hooks/useStationCache';
import PWAUpdateNotification from './components/PWAUpdateNotification';

function App() {
  // Initialize station cache on app startup
  const { error } = useStationCache();
  
  // Log any errors from station initialization
  useEffect(() => {
    if (error) {
      console.error('Station initialization error:', error);
    }
  }, [error]);
  
  return (
    <Fragment>
      <CssBaseline />
      <HotKeys />
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Pages />
        <PWAUpdateNotification />
      </BrowserRouter>
    </Fragment>
  );
}

const AppWithErrorHandler = withErrorHandler(App, AppErrorBoundaryFallback);
export default AppWithErrorHandler;
