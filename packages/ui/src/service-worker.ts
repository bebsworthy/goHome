/// <reference lib="webworker" />
/// <reference lib="es2020" />

/// <reference lib="webworker" />
/// <reference lib="es2020" />

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
/// <reference lib="webworker" />
/// <reference lib="es2020" />

declare let self: ServiceWorkerGlobalScope & typeof globalThis;

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
console.log('Service Worker: Precache manifest:', self.__WB_MANIFEST);
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
console.log('Service Worker: Registering route for regex');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ url }: { request: Request; url: URL }) => {
    // If this is a URL that starts with /api, skip.
    if (url.pathname.startsWith('/api')) {
      return false;
    }
    // If this looks like a URL for a resource, because it contains
    // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL('/index.html'),
);

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
console.log('Service Worker: Registering route for Google Fonts stylesheets');
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  }),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
console.log('Service Worker: Registering route for Google Fonts webfonts');
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  }),
);

// // Handle Web Share Target API requests
// self.addEventListener('fetch', (event) => {
//   if (!(event instanceof FetchEvent)) return;
  
//   if (event.request.url.endsWith('/_share-target') && event.request.method === 'POST') {
//     event.respondWith(
//       (async () => {
//         try {
//           const formData = await event.request.formData();
//           const url = formData.get('url');
//           const files = formData.getAll('file');
          
//           if (url) {
//             // Handle shared URL
//             const response = await fetch('/api/local/events/by-url', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ url }),
//             });

//             if (!response.ok) {
//               throw new Error('Failed to create event from URL');
//             }

//           } else if (files.length > 0) {
//             // Handle shared files (images)
//             for (const file of files) {
//               if (file instanceof File) {
//                 const uploadFormData = new FormData();
//                 uploadFormData.append('file', file);

//                 const response = await fetch('/api/local/events/upload', {
//                   method: 'POST',
//                   body: uploadFormData,
//                 });

//                 if (!response.ok) {
//                   throw new Error('Failed to upload image');
//                 }
//               }
//             }
//           }

//           // Redirect to the events page after processing
//           return Response.redirect('/local-events', 303);
//         } catch (error) {
//           console.error('Share target error:', error);
//           return Response.redirect('/local-events?error=share-failed', 303);
//         }
//       })()
//     );
//   }
// });

// Cache images with a cache-first strategy
console.log('Service Worker: Registering route for images');
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// Handle Web Share Target API
console.log('Service Worker: Registering fetch event listener for Web Share Target');
self.addEventListener('fetch', (event) => {
  if (!(event instanceof FetchEvent)) return;

  const url = new URL(event.request.url);
  if (url.pathname === '/_share-target' && event.request.method === 'POST') {
    event.respondWith(handleShareTarget(event.request));
  }
});

async function handleShareTarget(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();
    const sharedUrl = formData.get('url')?.toString();
    const files = formData.getAll('file');

    if (sharedUrl) {
      // Handle shared URL
      const response = await fetch('/api/local/events/by-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: sharedUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event from URL');
      }
    } else if (files.length > 0) {
      // Handle shared files (images)
      for (const file of files) {
        if (file instanceof File) {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const response = await fetch('/api/local/events/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
        }
      }
    }

    // Redirect to the events page after processing
    return Response.redirect('/local-events', 303);
  } catch (error) {
    console.error('Share target error:', error);
    return Response.redirect('/local-events?error=share-failed', 303);
  }
};

// Cache station data with a cache-first strategy since we're already
// storing this in IndexedDB and it doesn't change often
// console.log('Service Worker: Registering route for station API');
// registerRoute(
//   ({ url }) => url.pathname.startsWith('/api/stations'),
//   new CacheFirst({
//     cacheName: 'station-api-cache',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 24 * 60 * 60, // 24 hours
//       }),
//     ],
//   }),
// );

// Cache journey search results with a network-first strategy
// This ensures users get the most up-to-date train information when online
// but can still access previous search results when offline
// console.log('Service Worker: Registering route for journey API');
// registerRoute(
//   ({ url }) => url.pathname.startsWith('/api/train-journeys'),
//   new NetworkFirst({
//     cacheName: 'journey-api-cache',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 50,
//         maxAgeSeconds: 60 * 60, // 1 hour
//       }),
//     ],
//   }),
// );

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event: MessageEvent) => {
  console.log('Service Worker: Received message:', event.data);
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
// The following is an example of showing a notification when the app
// is updated with a new version
self.addEventListener('install', (): void => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

// Activate the service worker and claim clients so that pages
// load under SW control
clientsClaim();

console.log('Service Worker: Activated');