// Firebase Configuration for FCM Push Notifications
// TODO: Get these values from your backend team (same Firebase project used for Android)

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration - Updated to match backend Firebase project
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

// VAPID Key for Web Push - GET THIS FROM FIREBASE CONSOLE: Project Settings > Cloud Messaging > Web Push certificates
const VAPID_KEY = "BPGO6oIB5SgKIPvqtRJWDJXC3laLFVlRbnARGjdgU03sQsnHLQxyhlE_W1OFNG0Qa8KO0zggGDQxKSefIZg9kGU";

// Initialize Firebase
let app;
let messaging: any = null;

try {
  app = initializeApp(firebaseConfig);
  
  // Check if messaging is supported (not in all browsers)
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

/**
 * Request notification permission and get FCM token
 */
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    if (!messaging) {
      console.warn("Firebase messaging not supported in this browser");
      return null;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      // console.log('Notification permission granted.');
      
      // Register our custom service worker for FCM
      const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/'
      });
      
      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;
      
      // Get FCM token using our custom service worker
      const currentToken = await getToken(messaging, { 
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swRegistration
      });
      
      if (currentToken) {
        // console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        // console.log('No registration token available.');
        return null;
      }
    } else {
      // console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Listen for foreground messages
 */
export const onForegroundMessage = (callback: (payload: any) => void) => {
  if (!messaging) return;
  
  onMessage(messaging, (payload: any) => {
    console.log('Foreground message received:', payload);
    callback(payload);
  });
};

export { messaging };
