/* eslint-disable import/no-anonymous-default-export */
/**
 * Notification and Device Token Management
 * Handles Firebase Cloud Messaging (FCM) and push notifications
 */

import { BASE_URL, headers } from './CONST';
import { requestNotificationPermission as getFCMTokenFromFirebase } from '../config/firebase';

/**
 * Request notification permission from browser
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

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
  phoneNumber?: string
): Promise<boolean> => {
  try {
    console.log('[notifications] registerDeviceToken start', { userId, phoneNumber, tokenSnippet: token?.slice(0, 12) });
    const response = await fetch(`${BASE_URL}/auth/deviceToken`, {
      method: 'POST',
      headers: {
        ...headers(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'app-version': '2.2.3-web',
        // 'device-type': 'We',
        // 'device-id': getDeviceId(),
      },
      body: JSON.stringify({
        phone_no: phoneNumber || '',
        os_name: 'web',
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
   
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported in this browser');
      return null;
    }

    
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.warn('Notification permission denied');
      return null;
    }

    let tokenToUse = providedToken;
    if (!tokenToUse) {
      tokenToUse = await getFCMTokenFromFirebase();
    }

    console.log('[notifications] initializeFirebaseMessaging token selected', { provided: !!providedToken, tokenSnippet: tokenToUse?.slice(0, 12) });

    if (tokenToUse) {
      const registered = await registerDeviceToken(tokenToUse, userId, phoneNumber);
      console.log('[notifications] initializeFirebaseMessaging registered?', registered);
      
      if (registered) {
        localStorage.setItem('fcm_token', tokenToUse);
        return tokenToUse;
      }
    }

    return null;
  } catch (error) {
    console.error('Error initializing Firebase Messaging:', error);
    return null;
  }
};




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

export const initializeDeviceToken = initializeFirebaseMessaging;


export default {
  requestNotificationPermission,
  registerDeviceToken,
  initializeFirebaseMessaging,
  initializeDeviceToken,
  getFCMToken,
  unregisterDeviceToken,
  subscribeToAppointmentNotifications,
  getDeviceId,
};
