/* eslint-disable import/no-anonymous-default-export */

//@ts-nocheck
import { BASE_URL, headers } from './CONST';
import { requestNotificationPermission as getFCMTokenFromFirebase, onForegroundMessage } from '../config/firebase';
import { toast } from 'react-toastify';

const websitePushID = 'web.eshaafi.patientApp';

function isSafari() {
  return typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}


export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
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
    console.error('Error requesting notification permission:', error);
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
    console.log('[notifications] registerDeviceToken start', { userId, phoneNumber, osName, tokenSnippet: token?.slice(0, 12) });
    const response = await fetch(`${BASE_URL}/auth/deviceToken`, {
      method: 'POST',
      headers: {
        ...headers(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_no: phoneNumber || '',
        os_name: osName,
        token: token,
        Id: userId,
      }),
    });

    console.log('[notifications] registerDeviceToken response status', response.status);
    if (!response.ok) {
      throw new Error(`Failed to register device token: ${response.status}`);
    }

    const data = await response.json();
    console.log('[notifications] device token registered successfully', data);
    return data.responseCode === 200;
  } catch (error) {
    console.error('Error registering device token:', error);
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
      console.warn('Service workers are not supported in this browser');
      return null;
    }

    // For Safari, skip automatic push initialization - requires user gesture
    if (browserIsSafari) {
      console.log('[notifications] Safari detected - push permission requires user gesture, skipping auto-init');
      return null;
    }

    // Handle FCM for other browsers (automatic initialization allowed)
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        console.warn('Notification permission denied');
        return null;
      }

      let tokenToUse = providedToken;
      if (!tokenToUse) {
        tokenToUse = await getFCMTokenFromFirebase();
      }

      console.log('[notifications] FCM token selected', { provided: !!providedToken, tokenSnippet: tokenToUse?.slice(0, 12) });

      if (tokenToUse) {
        const registered = await registerDeviceToken(tokenToUse, userId, phoneNumber, 'web');
        console.log('[notifications] FCM token registered?', registered);
        
        if (registered) {
          localStorage.setItem('fcm_token', tokenToUse);
          return tokenToUse;
        }
      }
    }

  
catch (error) {
    console.error('Error initializing messaging:', error);
    return null;
  }
};

// Separate function for Safari push - must be called from user gesture
export const initializeSafariPush = async (
  userId: string,
  phoneNumber?: string
): Promise<string | null> => {
  try {
    if (!isSafari()) {
      console.warn('initializeSafariPush called on non-Safari browser');
      return null;
    }

    console.log('[notifications] Initializing Safari push from user gesture');

    // Request Safari push permission and register token
    (window as any).safari.pushNotification.requestPermission(
      'https://beta.eshaafi.com', // Replace with your actual domain/push endpoint
      websitePushID,
      { userId: phoneNumber || '' },
      async (permissionData: any) => {
        if (permissionData.permission === 'granted') {
          const token = permissionData.deviceToken;
          console.log('[notifications] Safari token obtained:', token?.slice(0, 12));

          const registered = await registerDeviceToken(token, userId, phoneNumber, 'safari');
          console.log('[notifications] Safari token registered?', registered);

          if (registered) {
            localStorage.setItem('safari_token', token);
            return token;
          }
        } else {
          console.warn('Safari push permission denied');
        }
      }
    );
    return null; // Safari is async, so return null for now
  } catch (error) {
    console.error('Error initializing Safari push:', error);
    return null;
  }
};

export const getSafariToken = (): string | null => {
  return localStorage.getItem('safari_token');
};

// Check if Safari push notifications are supported and available
export const isSafariPushAvailable = (): boolean => {
  return isSafari() && typeof (window as any).safari !== 'undefined' && 
         typeof (window as any).safari.pushNotification !== 'undefined';
};

export const initializeDeviceToken = initializeFirebaseMessaging;

export const getFCMToken = (): string | null => {
  return localStorage.getItem('fcm_token');
};


export const unregisterDeviceToken = async (userId: string): Promise<boolean> => {
  try {
    const token = getFCMToken();
    if (!token) return true;

    const response = await fetch(`${BASE_URL}/auth/deviceToken`, {
      method: 'DELETE',
      headers: {
        ...headers(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'device-id': getDeviceId(),
      },
      body: JSON.stringify({
        Id: userId,
        token: token,
      }),
    });

    if (response.ok) {
      localStorage.removeItem('fcm_token');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error unregistering device token:', error);
    return false;
  }
};


export const subscribeToAppointmentNotifications = async (
  appointmentId: string,
  userId: string
): Promise<boolean> => {
  try {
    const token = getFCMToken();
    
    if (!token) {
      console.warn('No FCM token available');
      return false;
    }

    
    const response = await fetch(`${BASE_URL}/appointments/${appointmentId}/subscribe`, {
      method: 'POST',
      headers: {
        ...headers(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        deviceToken: token,
        deviceType: 'web',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error subscribing to appointment notifications:', error);
    return false;
  }
};

// Listen for foreground FCM messages and show toast (only once)
// Robust foreground notification: show persistent toast until call is started or dismissed

let _fcmToastListenerSet = false;
let _activeCallToastId = null;
let _ringtoneAudio = null;
if (typeof window !== 'undefined' && !_fcmToastListenerSet) {
  _fcmToastListenerSet = true;
  onForegroundMessage((payload) => {
    const data = payload?.data || {};
    const appointmentId = data.appointmentId || data.channelName;

    if (appointmentId) {
      const callData = {
        type: 'incoming_call',
        appointmentId: appointmentId,
        doctorName: data.doctorName || data.name || payload?.notification?.title || 'Doctor',
        agoraToken: data.agoraToken || data.token,
        profileUrl: data.profileUrl,
        educationTitle: data.educationTitle,
        body: payload?.notification?.body || ''
      };
      try {
        sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
      } catch (e) {
        console.warn('[notifications] sessionStorage.setItem failed', e);
      }

      // Only show one persistent notification for the current call
      if (_activeCallToastId) {
        toast.dismiss(_activeCallToastId);
        _activeCallToastId = null;
      }
      _activeCallToastId = toast(
        `Incoming video call from ${callData.doctorName}`,
        {
          type: 'info',
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          toastId: `incoming_call_${appointmentId}`,
          onClose: () => {
            _activeCallToastId = null;
          },
        }
      );

      // Play ringtone (ensure only one instance)
      try {
        if (_ringtoneAudio) {
          _ringtoneAudio.pause();
          _ringtoneAudio.currentTime = 0;
        }
        _ringtoneAudio = new window.Audio('/ringtone.mp3'); 
        _ringtoneAudio.loop = true;
        _ringtoneAudio.volume = 1.0;
        _ringtoneAudio.play().catch(() => {}); 
      } catch (e) {
        console.warn('[notifications] Could not play ringtone', e);
      }

      // Listen for call started or dismissed events to clear the toast and stop ringtone
      const clearToastAndRingtone = () => {
        if (_activeCallToastId) {
          toast.dismiss(_activeCallToastId);
          _activeCallToastId = null;
        }
        if (_ringtoneAudio) {
          _ringtoneAudio.pause();
          _ringtoneAudio.currentTime = 0;
          _ringtoneAudio = null;
        }
        window.removeEventListener('call_started', clearToastAndRingtone);
        window.removeEventListener('call_dismissed', clearToastAndRingtone);
      };
      window.addEventListener('call_started', clearToastAndRingtone);
      window.addEventListener('call_dismissed', clearToastAndRingtone);

      // Dispatch custom event for in-app UI
      window.dispatchEvent(new CustomEvent('incoming_call', { detail: callData }));
      return;
    }

    // Fallback: show simple toast for non-appointment notifications
    if (payload?.notification?.body) {
      toast(payload.notification.body, { type: 'info' });
    } else {
      toast('You have a new notification!', { type: 'info' });
    }
  });
}

export default {
  requestNotificationPermission,
  registerDeviceToken,
  initializeFirebaseMessaging,
  initializeSafariPush,
  initializeDeviceToken,
  getFCMToken,
  unregisterDeviceToken,
  subscribeToAppointmentNotifications,
  getDeviceId,
};
