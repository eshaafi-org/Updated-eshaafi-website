

// Safari Service Worker for Push Notifications
console.log('[SW] 🚀 Safari service worker loading...');
console.log('[SW] Service worker URL:', self.location.href);
console.log('[SW] User agent:', navigator.userAgent);

self.addEventListener('install', (evt) => {
  console.log('[SW] 📦 Install event triggered');
  console.log('[SW] install event - skipping waiting');
  evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (evt) => {
  console.log('[SW] ⚡ Activate event triggered');
  console.log('[SW] activate event - claiming clients');
  evt.waitUntil(self.clients.claim());
});

// IMPORTANT: Safari Push DOES trigger 'push' events in Safari 16+
// Uncomment this for Safari push handling
self.addEventListener('push', event => {
  console.log('[SW] 📲 Safari push event received!');
  console.log('[SW] Push event data:', event.data?.text());

  try {
    const data = event.data ? JSON.parse(event.data.text()) : {};
    console.log('[SW] Parsed push data:', data);

    // Extract call data from push payload
    const callData = {
      appointmentId: data.appointmentId || data.channelName,
      doctorName: data.doctorName || data.name || 'Doctor',
      agoraToken: data.agoraToken || data.token,
      appId: data.appId,
      channelName: data.channelName,
      profileUrl: data.profileUrl,
      educationTitle: data.educationTitle
    };

    console.log('[SW] Created callData from push:', callData);

    // Send message to ALL clients
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      console.log('[SW] Broadcasting push to', clients.length, 'clients');
      clients.forEach(client => {
        client.postMessage({
          type: 'incoming_call',
          ...callData
        });
      });
    });

    // Show notification
    const notificationOptions = {
      body: data.body || 'Doctor is calling you',
      icon: data.icon || '/eshaafilogo.svg',
      badge: '/icons/icon-72x72.png',
      tag: 'incoming-call',
      requireInteraction: true,
      data: data
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Incoming Video Call', notificationOptions)
    );

  } catch (e) {
    console.error('[SW] Push event error:', e);
  }
});


self.addEventListener('notificationclick', event => {
  console.log('[SW] 🔔 Safari notification click - this may not trigger for APNs push!');
  console.log('[SW] If you see this log, the notification is coming from web push, not APNs');
  console.log('[SW] For APNs (Safari push), the backend should send a URL that opens directly');

  // This code may never execute for Safari APNs notifications
  // Safari APNs notifications open URLs directly instead of triggering service worker events

  event.notification.close();
});


self.addEventListener('message', event => {
  if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
    console.log('[SW] Received SKIP_WAITING message.');
    self.skipWaiting();
  }
});