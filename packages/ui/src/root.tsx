import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// from MUI's toolpad we only use Notifications
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { Provider as JotaiProvider } from 'jotai';

import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const queryClient = new QueryClient();

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <NotificationsProvider>
                <App />
              </NotificationsProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

export default render;
