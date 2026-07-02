/* eslint-disable import/no-anonymous-default-export */

//@ts-nocheck
import { BASE_URL, headers } from './CONST';
import { requestNotificationPermission as getFCMTokenFromFirebase, onForegroundMessage } from '../config/firebase';
import { toast } from 'react-toastify';
import { normalizeIncomingCallPayload, dispatchIncomingCall } from './incomingCall';
const websitePushID = 'web.com.eshaafi.push';

// Push Package URLs based on environment
// Safari AUTOMATICALLY appends /v2/pushPackages/{websitePushID}
// So we must provide only the BASE URL
const PUSH_PACKAGE_URLS = {
  production: `${BASE_URL}/prod`,
  staging: 'https://f6l7k20y31.execute-api.us-east-1.amazonaws.com/stage',
};

export function isSafari() {
  return typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function isMacOSSafari() {
  return typeof window !== 'undefined' && 
         /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
         !/iPhone|iPad|iPod/.test(navigator.userAgent);
}

export function isIOS() {
  return typeof window !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent);
}

const isSafari16Plus = () => {
  if (!isSafari()) return false;
  const ua = navigator.userAgent;
  const versionMatch = ua.match(/Version\/(\d+)/);
  if (versionMatch) {
    return parseInt(versionMatch[1]) >= 16;
  }
  return false;
};

export function isSafariPushAvailable() {
  return typeof window !== 'undefined' && 
         typeof (window as any).safari !== 'undefined' && 
         typeof (window as any).safari.pushNotification !== 'undefined';
}


export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!('Notification' in window)) {
      
      return false;
    }

    const currentPermission = Notification.permission;
    if (currentPermission === 'granted') {
      return true;
    }
    if (currentPermission === 'denied') {
      return false;
    }

    // Only request permission if not already decided
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    return false;
  }
};


export const registerDeviceToken = async (
  token: string,
  userId: string,
  phoneNumber?: string,
  osName: 'web' | 'safari' = 'web'
): Promise<boolean> => {
  try {
    const url = `${BASE_URL}/auth/deviceToken`;
    const requestBody = {
      phone_no: phoneNumber || '',
      os_name: osName,
      token: token,
      Id: userId,
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to register device token: ${response.status}`);
    }

    const data = await response.json();
    return data.responseCode === 200;
  } catch (error) {
    return false;
  }
};


export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('device_id');
  
  if (!deviceId) {
   
    deviceId = generateDeviceId();
    localStorage.setItem('device_id', deviceId);
  }
  
  return deviceId;
};

const generateDeviceId = (): string => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


export const initializeFirebaseMessaging = async (
  userId: string,
  phoneNumber?: string,
  providedToken?: string // use backend-provided web push/FCM token when available
): Promise<string | null> => {
  try {
    const browserIsSafari = isSafari();
    console.log('[notifications] Browser detection:', browserIsSafari ? 'Safari' : 'Web (FCM)');

    if (!('serviceWorker' in navigator) && !browserIsSafari) {
      
      return null;
    }

    // For Safari, skip automatic push initialization - requires user gesture
    if (browserIsSafari) {
      
      return null;
    }

    // Handle FCM for other browsers (automatic initialization allowed)
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        return null;
      }

      let tokenToUse = providedToken;
      if (!tokenToUse) {
        try {
          tokenToUse = await getFCMTokenFromFirebase();
        } catch (fcmError) {
          return null;
        }
      }

      if (tokenToUse) {
        const registered = await registerDeviceToken(tokenToUse, userId, phoneNumber, 'web');
        
        if (registered) {
          localStorage.setItem('fcm_token', tokenToUse);
          return tokenToUse;
        }
      }
    }

  
catch (error) {
    return null;
  }
};

// Get push package endpoint based on environment
const getPushPackageEndpoint = (): string => {
  if (typeof window === 'undefined') {
    return PUSH_PACKAGE_URLS.production; // Default to production on server
  }

  const hostname = window.location.hostname;
  
  // Determine environment from hostname
  if (hostname === 'localhost' || hostname.includes('beta')) {
    return PUSH_PACKAGE_URLS.staging;
  }
  
  return PUSH_PACKAGE_URLS.production;
};

// Separate function for Safari push - must be called from user gesture
export const initializeSafariPush = (
  userId: string,
  phoneNumber?: string
): Promise<string | null> => {
  return new Promise((resolve) => {
    
    
    
    
    if (!isSafari()) {
      
      console.error('User-Agent test result:', /^((?!chrome|android).)*safari/i.test(navigator.userAgent));
      resolve(null);
      return;
    }
    
    

    // Check if Safari 16+ for standard Web Push
    if (isSafari16Plus()) {
      
    }

    // Always use legacy Safari push API for all Safari versions
    // Safari 16+ Web Push API is not fully compatible and lacks VAPID support
    

    // Check Safari push API availability
    if (typeof (window as any).safari === 'undefined') {
      
      resolve(null);
      return;
    }
    
    if (typeof (window as any).safari.pushNotification === 'undefined') {
      
      resolve(null);
      return;
    }
    
    

    // Check current permission status
    
    const currentPermission = getSafariPushPermissionStatus();
    
    

    if (currentPermission === 'granted') {
      
      
      const existingToken = getSafariToken();
      if (existingToken) {
        console.log('[Safari Push] ✅ Found existing token (preview):', existingToken.slice(0, 20) + '...');
        resolve(existingToken);
        return;
      }
    } else if (currentPermission === 'denied') {
      
      
      
      
      
      
      
      
      return null;
    }

    // Request Safari push permission and register token
    const pushPackageEndpoint = getPushPackageEndpoint();
    const userInfoData = { userId: phoneNumber || userId || 'anonymous' };
    // Safari automatically appends /v2/pushPackages/{websitePushID}
    // We log the constructed URL here for debugging purposes
    const fullUrl = `${pushPackageEndpoint}/v2/pushPackages/${websitePushID}`;
    
    
    
    
    
    
    
    
    
    console.log('Safari will POST with body:', JSON.stringify(userInfoData));
    console.log('Environment detected:', pushPackageEndpoint.includes('execute-api') ? 'STAGING' : 'PRODUCTION');
    console.log('Timestamp:', new Date().toISOString());
    
    
    console.log('🔍 SYSTEM-LEVEL DIAGNOSTIC COMMAND (Run on your Mac terminal):');
    
    
    
    
    console.log('1. Open browser DevTools (Command+Option+I on Mac, F12 on Windows)');
    
    
    
    
    console.log('6. If NO request appears in Network tab → Safari is not calling backend (client-side issue)');
    
    
    
    const requestStartTime = performance.now();
    console.log(`[Safari Push] Calling safari.pushNotification.requestPermission() at ${requestStartTime}ms`);
    
    (window as any).safari.pushNotification.requestPermission(
      pushPackageEndpoint,
      websitePushID,
      userInfoData,
      async (permissionData: any) => {
        const callbackTimestamp = new Date().toISOString();
        // 
        // 
        // 
        // 
        // 
        // 
        // console.log('Device Token (preview):', permissionData.deviceToken?.slice(0, 50) + '...');
        // console.log('Full Permission Data:', JSON.stringify(permissionData, null, 2));
        // console.log('Permission Object Keys:', Object.keys(permissionData));
        // 
        // 
        // 

        if (permissionData.permission === 'granted') {
          const token = permissionData.deviceToken;
          // 
          // 
          // 
          // console.log('Token obtained (preview):', token?.slice(0, 20) + '...');
          // 
          // 
          // 
          // 

          if (token) {
            
            try {
              const registered = await registerDeviceToken(token, userId, phoneNumber, 'safari');
              
              
              
              if (registered) {
                
                localStorage.setItem('safari_token', token);
                
                
                console.log('Timestamp:', new Date().toISOString());
                
                resolve(token);
              } else {
                
                
                
                
                resolve(null);
              }
            } catch (error) {
              
              
              
              
              
              
              console.error('Full error object:', JSON.stringify(error, null, 2));
              
              resolve(null);
            }
          } else {
            
            
            
            
            
            
            
            
            
            
            
          }
        } else if (permissionData.permission === 'denied') {
    
          // console.error('REASON 2: BACKEND RETURNED HTTP ERROR (Most Common)');
          // console.error('   - Environment:', pushPackageEndpoint.includes('execute-api') ? 'STAGING' : 'PRODUCTION');
          // console.error('   - Timestamp:', new Date().toISOString()); 
          resolve(null);
        } else if (permissionData.permission === 'default') {
          // console.error('   - Environment:', pushPackageEndpoint.includes('execute-api') ? 'STAGING' : 'PRODUCTION');
          // console.error('4. Check response status code (should be 200)');
          // console.error('5. Check response headers (Content-Type should be application/zip)');
          resolve(null);
        } else {
          console.error('Full response object:', JSON.stringify(permissionData, null, 2));
          resolve(null);
        }
      }
    );

  });
};
export const getSafariToken = (): string | null => {
  return localStorage.getItem('safari_token');
};

// Check current Safari push permission status
export const getSafariPushPermissionStatus = (): string => {
  if (typeof window === 'undefined') return 'unsupported';
  if (!isSafari()) return 'unsupported';
  if (!isSafariPushAvailable()) return 'unsupported';

  try {
    const permissionData = (window as any).safari.pushNotification.permission(websitePushID);
    return permissionData.permission || 'default';
  } catch (error) {
    
    return 'error';
  }
};

export const initializeDeviceToken = initializeFirebaseMessaging;

export const getFCMToken = (): string | null => {
  return localStorage.getItem('fcm_token');
};


export const unregisterDeviceToken = async (userId: string): Promise<boolean> => {
  try {
    const token = getFCMToken();
    if (!token) {
      
      return true;
    }

    const url = `${BASE_URL}/auth/deviceToken`;
    const requestBody = {
      Id: userId,
      token: token,
    };
    const requestHeaders = {
      ...headers(),
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'device-id': getDeviceId(),
    };
    const response = await fetch(url, {
      method: 'DELETE',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });

    // console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      
      
      localStorage.removeItem('fcm_token');
      return true;
    }
    const errorText = await response.text();
    return false;
  } catch (error) {

    return false;
  }
};




// Listen for foreground FCM messages and show toast (only once)
// Robust foreground notification: show persistent toast until call is started or dismissed

// Foreground FCM listener.
//
// This handler is intentionally "dumb": it only normalizes the FCM payload into
// an `incoming_call` window event (with dedup) and lets GlobalIncomingHandler own
// the entire in-app UI (popup + ringtone). Keeping the popup/ringtone in a single
// place is what prevents the "too many / stuck" notifications.
let _fcmForegroundListenerSet = false;
if (typeof window !== 'undefined' && !_fcmForegroundListenerSet) {
  _fcmForegroundListenerSet = true;
  try {
    onForegroundMessage((payload) => {
    const callData = normalizeIncomingCallPayload(payload);

    if (callData) {
      try {
        sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
      } catch (e) {
        /* ignore */
      }

      // Single source of truth for the popup + ringtone: GlobalIncomingHandler.
      dispatchIncomingCall(callData);
      return;
    }

    // Fallback: show simple toast for non-appointment notifications
    if (payload?.notification?.body) {
      toast(payload.notification.body, { type: 'info' });
    } else {
      toast('You have a new notification!', { type: 'info' });
    }
    });
  } catch (error) {
    // Safari or unsupported browsers - FCM not available

  }
}

// Global service worker message handler for ALL pages (homepage, profile, etc.).
//
// This now ONLY normalizes service-worker messages into the deduplicated
// `incoming_call` event. The popup + ringtone are owned exclusively by
// GlobalIncomingHandler, so there's a single UI regardless of how many raw
// messages the service worker sends (it intentionally posts several times).
export const setupGlobalNotificationListener = () => {
  if (typeof window === 'undefined') return;

  const handleServiceWorkerMessage = (event: MessageEvent) => {
    const data: any = event.data;
    if (!data || (data.type !== 'incoming_call' && data.type !== 'accept_call')) return;

    const callData = normalizeIncomingCallPayload(data);
    if (!callData) return;

    // Carry through autoJoin intent from an "accept" click.
    if (data.type === 'accept_call') callData.autoJoin = true;

    try {
      sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
    } catch (e) {
      /* ignore */
    }

    // Dedup guarantees a single popup even across the SW's repeated posts.
    dispatchIncomingCall(callData);
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
  }

  // Return unsubscribe function
  return () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
    }
  };
};

export default {
  requestNotificationPermission,
  registerDeviceToken,
  initializeFirebaseMessaging,
  initializeSafariPush,
  initializeDeviceToken,
  getFCMToken,
  unregisterDeviceToken,
  getDeviceId,
  setupGlobalNotificationListener,
  isSafariPushAvailable,
  isMacOSSafari,
  isIOS,
};
