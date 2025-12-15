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
  console.log('[ServiceWorker] ==================== NOTIFICATION CLICK ====================');
  console.log('[ServiceWorker] Event action:', event.action);
  console.log('[ServiceWorker] Notification title:', event.notification.title);
  console.log('[ServiceWorker] Notification body:', event.notification.body);
  console.log('[ServiceWorker] Notification tag:', event.notification.tag);
  console.log('[ServiceWorker] Notification data:', event.notification.data);
  console.log('[ServiceWorker] Notification keys:', event.notification.data ? Object.keys(event.notification.data) : 'NO DATA');
  
  event.notification.close();
  
  const notificationData = event.notification.data || {};
  
  console.log('[ServiceWorker] Extracted notificationData keys:', Object.keys(notificationData));
  console.log('[ServiceWorker] channelName:', notificationData.channelName);
  console.log('[ServiceWorker] appointmentId:', notificationData.appointmentId);
  
  const appointmentId = notificationData.channelName || notificationData.appointmentId;
  
  console.log('[ServiceWorker] Final appointmentId:', appointmentId);
  
  // Validate appointmentId exists
  if (!appointmentId) {
    console.error('[ServiceWorker]  NO APPOINTMENTID - Cannot proceed!');
    console.error('[ServiceWorker] Full notification data:', JSON.stringify(notificationData));
    console.error('[ServiceWorker] This will prevent navigation - notification will be closed');
    return; // Don't open window without appointmentId
  }
  
  // Always use appointments page URL (use absolute URL to improve compatibility on mobile)
  const relativeUrl = `/appointments/${appointmentId}?incoming=1&autoJoin=1`;
  const absoluteUrl = `${self.location.origin}${relativeUrl}`;

  console.log('[ServiceWorker]  Will open URL (absolute):', absoluteUrl);
  console.log('[ServiceWorker] ===============================================================');
  
  if (event.action === 'accept' || !event.action) {
    // Open or focus the app window with incoming call (both Accept click and default click)
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Check if app is already open
          for (const client of clientList) {
            if (client.url.includes(appointmentId) && 'focus' in client) {
              return client.focus().then((client) => {
                // Send accept message to the client
                client.postMessage({
                  type: 'accept_call',
                  ...notificationData
                });
                return client;
              });
            }
          }
          
          // If not open, open new window
          if (clients.openWindow) {
            // Store call data in a way the new window can access it
            const callDataKey = `call_data_${appointmentId}`;
            const callData = {
              type: 'incoming_call',
              appointmentId: notificationData.channelName || notificationData.appointmentId,
              doctorName: notificationData.name || notificationData.doctorName,
              agoraToken: notificationData.token || notificationData.agoraToken,
              appId: notificationData.appId,
              channelName: notificationData.channelName,
              profileUrl: notificationData.profileUrl,
              educationTitle: notificationData.educationTitle
            };
            
            console.log('[ServiceWorker] Storing call data with key:', callDataKey);
            
            // Store in indexedDB-like structure that persists
            // We'll use a hack: encode data in URL fragment that won't cause navigation
            const encodedData = encodeURIComponent(JSON.stringify(callData));
            const urlWithData = `${absoluteUrl}#calldata=${encodedData}`;
            
            console.log('[ServiceWorker] Opening absolute URL with embedded data');
            
            return clients.openWindow(urlWithData).then((client) => {
              if (client) {
                console.log('[ServiceWorker] New window opened');
                // Also send via postMessage as backup
                setTimeout(() => client.postMessage(callData), 100);
                setTimeout(() => client.postMessage(callData), 500);
                setTimeout(() => client.postMessage(callData), 1000);
                setTimeout(() => client.postMessage(callData), 2000);
              }
              return client;
            });
          }
        })
    );
  } else if (event.action === 'reject') {
    // Send reject message to backend (optional)
    console.log('[ServiceWorker] Call rejected');
    
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then((clientList) => {
          clientList.forEach((client) => {
            client.postMessage({
              type: 'reject_call',
              appointmentId: appointmentId
            });
          });
        })
    );
  } else {
    // Default click - open the app WITH CALL DATA
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url.includes(appointmentId) && 'focus' in client) {
              return client.focus().then((client) => {
                // Send call data to the focused client
                client.postMessage({
                  type: 'incoming_call',
                  appointmentId: notificationData.channelName || notificationData.appointmentId,
                  doctorName: notificationData.name || notificationData.doctorName,
                  agoraToken: notificationData.token || notificationData.agoraToken,
                  appId: notificationData.appId,
                  channelName: notificationData.channelName,
                  profileUrl: notificationData.profileUrl,
                  educationTitle: notificationData.educationTitle
                });
                return client;
              });
            }
          }
          
          if (clients.openWindow) {
            // Encode call data in URL hash (same as accept action)
            const callData = {
              type: 'incoming_call',
              appointmentId: notificationData.channelName || notificationData.appointmentId,
              doctorName: notificationData.name || notificationData.doctorName,
              agoraToken: notificationData.token || notificationData.agoraToken,
              appId: notificationData.appId,
              channelName: notificationData.channelName,
              profileUrl: notificationData.profileUrl,
              educationTitle: notificationData.educationTitle
            };
            
            const encodedData = encodeURIComponent(JSON.stringify(callData));
            const urlWithData = `${absoluteUrl}#calldata=${encodedData}`;
            
            return clients.openWindow(urlWithData).then((client) => {
              if (client) {
                // Also send via postMessage as backup
                setTimeout(() => client.postMessage(callData), 100);
                setTimeout(() => client.postMessage(callData), 500);
                setTimeout(() => client.postMessage(callData), 1000);
                setTimeout(() => client.postMessage(callData), 2000);
              }
              return client;
            });
          }
        })
    );
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
