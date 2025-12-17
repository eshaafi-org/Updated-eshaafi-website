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
const SW_VERSION = 'v2.0.3';
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
          // Clear old caches
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
    return; // Don't show notification without appointmentId
  }
  
  const notificationTitle = notification.title || 'Incoming Video Call';
  const notificationOptions = {
    body: notification.body || 'Doctor is calling you',
    icon: notification.icon || '/eshaafilogo.svg/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'incoming-call',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: notificationData,
    actions: [
      { action: 'accept', title: 'Accept', icon: '/icons/accept-call.png' },
      { action: 'reject', title: 'Reject', icon: '/icons/reject-call.png' }
    ]
  };

  console.log('[ServiceWorker] Showing notification for appointment:', appointmentIdForValidation);
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click event - user clicks on notification

self.addEventListener('notificationclick', (event) => {
  const notificationData = event.notification.data || {};
  const appointmentId = notificationData.channelName || notificationData.appointmentId;
  if (!appointmentId) {
    event.notification.close();
    return;
  }
  const url = `/appointments/${appointmentId}?incoming=1&autoJoin=1`;
  const absoluteUrl = `${self.location.origin}${url}`;
  event.notification.close();

  // Helper: focus or open the appointment page
  function focusOrOpen(urlToOpen, postMsgType) {
    return clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(appointmentId) && 'focus' in client) {
          return client.focus().then(focusedClient => {
            if (postMsgType) {
              focusedClient.postMessage({ type: postMsgType, ...notificationData });
            }
            return focusedClient;
          });
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen).then(newClient => {
          if (postMsgType && newClient) {
            setTimeout(() => newClient.postMessage({ type: postMsgType, ...notificationData }), 100);
            setTimeout(() => newClient.postMessage({ type: postMsgType, ...notificationData }), 500);
          }
          return newClient;
        });
      }
    });
  }

  if (event.action === 'accept') {
    event.waitUntil(focusOrOpen(absoluteUrl, 'accept_call'));
  } else if (event.action === 'reject') {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
        clientList.forEach(client => {
          client.postMessage({ type: 'reject_call', ...notificationData });
        });
      })
    );
  } else {
    // Default click: open/focus and send incoming_call
    event.waitUntil(focusOrOpen(absoluteUrl, 'incoming_call'));
  }
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Message received from client:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[ServiceWorker] Loaded');
