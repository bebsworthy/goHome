import welcome from '@/utils/welcome';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';

// `root` contains the main dependencies and providers of the base app
//  - React, ReactDom, Jotai, ThemeProvider, etc.)
// App contains the main structure of the base app

// These are the two main chunks that are used to render the core structure of the app
// Importing them with Promise.all (by using HTTP/2/3 multiplexing) we can load them in parallel
// and achieve the best possible performance

Promise.all([import('@/root'), import('@/App')]).then(([{ default: render }, { default: App }]) => {
  render(App);
});

// welcome message for users in the console
welcome();

// Register service worker for PWA support
serviceWorkerRegistration.register({
  onUpdate: () => {
    console.log('New version available!');
    // The update notification will be handled by the PWAUpdateNotification component
  },
  onSuccess: () => {
    console.log('Content is now available offline!');
  },
});
