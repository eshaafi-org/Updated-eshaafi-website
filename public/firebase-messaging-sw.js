/**
 * Service Worker for eShaafi Patient Web App
 * Handles Firebase Cloud Messaging (FCM) push notifications for incoming video calls
 */

// Import Firebase scripts for FCM in service worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByvE8Kv_8XYdp8UEhPGdO2xFymuKSHHXM",
  authDomain: "eshaafi-patientapp.firebaseapp.com",
  databaseURL: "https://eshaafi-patientapp-default-rtdb.firebaseio.com",
  projectId: "eshaafi-patientapp",
  storageBucket: "eshaafi-patientapp.appspot.com",
  messagingSenderId: "651637779464",
  appId: "1:651637779464:web:2bddd162aecec797b8f5bd",
  measurementId: "G-5N3GPS35R3"
};

// Initialize Firebase in service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Service Worker Version - increment this to force update
const SW_VERSION = 'v2.0.4';
console.log('[ServiceWorker] Version:', SW_VERSION);

// Install event
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing version', SW_VERSION);
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating version', SW_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return clients.claim();
    })
  );
});

// Handle background FCM messages
messaging.onBackgroundMessage((payload) => {
  console.log('[ServiceWorker] FCM background message received:', payload);
  console.log('[ServiceWorker] Payload keys:', Object.keys(payload));
  console.log('[ServiceWorker] Payload.data:', payload.data);
  console.log('[ServiceWorker] Payload.notification:', payload.notification);

  // Extract data from payload - could be in data or notification
  const notificationData = payload.data || {};
  const notification = payload.notification || {};

  console.log('[ServiceWorker] Notification data:', notificationData);

  // Send message to all clients immediately (for foreground app)
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
    console.log('[ServiceWorker] Found', clients.length, 'open windows');
    clients.forEach(client => {
      console.log('[ServiceWorker] Posting message to client:', client.url);
      client.postMessage({
        type: 'incoming_call',
        appointmentId: notificationData.channelName || notificationData.appointmentId,
        doctorName: notificationData.name || notificationData.doctorName || notification.title || 'Doctor',
        agoraToken: notificationData.token || notificationData.agoraToken,
        appId: notificationData.appId,
        channelName: notificationData.channelName,
        profileUrl: notificationData.profileUrl,
        educationTitle: notificationData.educationTitle
      });
    });
  });

  // Validate that we have an appointmentId before showing notification
  const appointmentIdForValidation = notificationData.channelName || notificationData.appointmentId;
  if (!appointmentIdForValidation) {
    console.error('[ServiceWorker] Cannot show notification - no appointmentId in data:', notificationData);
    return;
  }

  const notificationTitle = notification.title || 'Incoming Video Call';
  const notificationOptions = {
    body: notification.body || 'Doctor is calling you',
    icon: notification.icon || '/eshaafilogo.svg/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'incoming-call',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: {
      ...notificationData,
      // Store the target URL explicitly in notification data
      targetUrl: `/appointments/${appointmentIdForValidation}?incoming=1&autoJoin=1`,
      appointmentId: appointmentIdForValidation
    },
    actions: [
      { action: 'accept', title: 'Accept', icon: '/icons/accept-call.png' },
      { action: 'reject', title: 'Reject', icon: '/icons/reject-call.png' }
    ]
  };

  console.log('[ServiceWorker] Showing notification for appointment:', appointmentIdForValidation);
  console.log('[ServiceWorker] Target URL:', notificationOptions.data.targetUrl);
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Helper function to build the correct appointment URL
function getAppointmentUrl(notificationData) {
  const appointmentId = notificationData.appointmentId ||
                        notificationData.channelName ||
                        notificationData.appointmentId;

  if (!appointmentId) {
    console.error('[ServiceWorker] No appointmentId found in notification data:', notificationData);
    return null;
  }

  // Use stored targetUrl if available, otherwise construct it
  const path = notificationData.targetUrl || `/appointments/${appointmentId}?incoming=1&autoJoin=1`;
  const absoluteUrl = new URL(path, self.location.origin).href;

  console.log('[ServiceWorker] Constructed URL:', absoluteUrl);
  return absoluteUrl;
}

// Helper function to check if a client is on the appointment page
function isClientOnAppointmentPage(client, appointmentId) {
  try {
    const clientUrl = new URL(client.url);
    const pathMatch = clientUrl.pathname.includes(`/appointments/${appointmentId}`);
    console.log('[ServiceWorker] Client URL check:', {
      clientUrl: client.url,
      pathname: clientUrl.pathname,
      appointmentId,
      matches: pathMatch
    });
    return pathMatch;
  } catch (e) {
    console.error('[ServiceWorker] Error checking client URL:', e);
    return false;
  }
}

// Notification click event - user clicks on notification
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification clicked');
  console.log('[ServiceWorker] Event action:', event.action);
  console.log('[ServiceWorker] Notification data:', event.notification.data);

  const notificationData = event.notification.data || {};
  const appointmentId = notificationData.appointmentId ||
                        notificationData.channelName ||
                        notificationData.appointmentId;

  console.log('[ServiceWorker] Extracted appointmentId:', appointmentId);

  if (!appointmentId) {
    console.error('[ServiceWorker] No appointmentId - closing notification');
    event.notification.close();
    return;
  }

  // Get the target URL
  const targetUrl = getAppointmentUrl(notificationData);

  if (!targetUrl) {
    console.error('[ServiceWorker] Could not construct target URL');
    event.notification.close();
    return;
  }

  console.log('[ServiceWorker] Target URL for navigation:', targetUrl);

  // Close the notification
  event.notification.close();

  // Helper: focus existing window or open new one
  async function focusOrOpenWindow(url, messageType) {
    console.log('[ServiceWorker] focusOrOpenWindow called with:', { url, messageType });

    try {
      const clientList = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });

      console.log('[ServiceWorker] Found', clientList.length, 'client windows');

      // First, try to find an existing window with the appointment page
      for (const client of clientList) {
        console.log('[ServiceWorker] Checking client:', client.url);

        if (isClientOnAppointmentPage(client, appointmentId)) {
          console.log('[ServiceWorker] Found matching client, focusing...');

          if ('focus' in client) {
            const focusedClient = await client.focus();

            if (messageType) {
              console.log('[ServiceWorker] Sending message to focused client:', messageType);
              focusedClient.postMessage({
                type: messageType,
                ...notificationData
              });
            }

            return focusedClient;
          }
        }
      }

      // If no matching window found, open a new one
      console.log('[ServiceWorker] No matching window found, opening new window...');

      if (clients.openWindow) {
        const newClient = await clients.openWindow(url);

        if (newClient && messageType) {
          // Send message multiple times to ensure it's received
          console.log('[ServiceWorker] Sending messages to new window');

          setTimeout(() => {
            newClient.postMessage({ type: messageType, ...notificationData });
          }, 100);

          setTimeout(() => {
            newClient.postMessage({ type: messageType, ...notificationData });
          }, 500);

          setTimeout(() => {
            newClient.postMessage({ type: messageType, ...notificationData });
          }, 1000);
        }

        return newClient;
      }
    } catch (error) {
      console.error('[ServiceWorker] Error in focusOrOpenWindow:', error);
    }
  }

  // Handle different actions
  if (event.action === 'accept') {
    console.log('[ServiceWorker] Accept action - opening call page');
    event.waitUntil(focusOrOpenWindow(targetUrl, 'accept_call'));
  }
  else if (event.action === 'reject') {
    console.log('[ServiceWorker] Reject action - sending reject message');
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        console.log('[ServiceWorker] Sending reject to', clientList.length, 'clients');
        clientList.forEach(client => {
          client.postMessage({ type: 'reject_call', ...notificationData });
        });
      })
    );
  }
  else {
    // Default click: open/focus the appointment page
    console.log('[ServiceWorker] Default click - opening call page');
    event.waitUntil(focusOrOpenWindow(targetUrl, 'incoming_call'));
  }
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Message received from client:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[ServiceWorker] Loaded successfully');
