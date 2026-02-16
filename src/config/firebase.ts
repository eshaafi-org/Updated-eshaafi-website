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
    // Detect Safari / macOS Safari and Safari 16+ to avoid registering Firebase
    const ua = navigator.userAgent || '';
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    const isMacOSSafari = isSafari && !/iPhone|iPad|iPod/.test(ua);
    const versionMatch = ua.match(/Version\/(\d+)/);
    const isSafari16Plus = versionMatch ? parseInt(versionMatch[1], 10) >= 16 : false;

    if (isMacOSSafari || isSafari16Plus) {
      console.log('[Firebase] Skipping Firebase messaging on macOS Safari / Safari16+ to avoid SW conflicts');
      messaging = null;
    } else {
      try {
        messaging = getMessaging(app);
      } catch (messagingError) {
        // Safari and some browsers don't support Firebase messaging
        const errorMessage = messagingError instanceof Error ? messagingError.message : String(messagingError);
        console.warn('[Firebase] Messaging not supported in this browser:', errorMessage);
        messaging = null;
      }
    }
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
      
      try {
        // Register our custom service worker for FCM
        console.log('[Firebase] Registering service worker at /firebase-messaging-sw.js');
        const swRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/'
        });
        console.log('[Firebase] Service worker registered successfully:', swRegistration);
        
        // Wait for service worker to be ready with timeout
        console.log('[Firebase] Waiting for service worker to be ready...');
        await Promise.race([
          navigator.serviceWorker.ready,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Service worker ready timeout')), 5000)
          )
        ]);
        console.log('[Firebase] Service worker ready');
        
        // Get FCM token using our custom service worker
        console.log('[Firebase] Getting FCM token...');
        const currentToken = await getToken(messaging, { 
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: swRegistration
        });
        
        if (currentToken) {
          console.log('FCM Token:', currentToken);
          return currentToken;
        } else {
          console.log('No registration token available.');
          return null;
        }
      } catch (swError) {
        console.error('[Firebase] Service worker error:', swError);
        console.log('[Firebase] Attempting to get token without service worker registration...');
        
        // Fallback: try to get token anyway
        try {
          const currentToken = await getToken(messaging, { 
            vapidKey: VAPID_KEY
          });
          if (currentToken) {
            console.log('[Firebase] Got token via fallback:', currentToken);
            return currentToken;
          }
        } catch (fallbackError) {
          console.error('[Firebase] Fallback token retrieval failed:', fallbackError);
        }
        
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
  if (!messaging) {
    console.log('[Firebase] Messaging not available, skipping foreground message listener');
    return;
  }
  
  try {
    onMessage(messaging, (payload: any) => {
      console.log('Foreground message received:', payload);
      callback(payload);
    });
  } catch (error) {
    // Silently handle Safari/unsupported browser errors
    console.warn('[Firebase] Could not set up foreground message listener:', error);
  }
};

export { messaging };
