

export const AGORA_CONFIG = {
  // Replace with your actual Agora App ID
  APP_ID: process.env.NEXT_PUBLIC_AGORA_APP_ID || "your-agora-app-id",
  
  // Token server URL (if you have a token server)
  TOKEN_SERVER_URL: process.env.NEXT_PUBLIC_AGORA_TOKEN_SERVER_URL || "",
  
  // Default channel settings
  CHANNEL_PREFIX: "eshaafi-consultation-",
  
  // Video encoding configurations
  VIDEO_ENCODER_CONFIG: {
    width: 640,
    height: 480,
    frameRate: 15,
    bitrateMin: 600,
    bitrateMax: 1000,
  },
  
  // Audio encoding configuration
  AUDIO_ENCODER_CONFIG: "music_standard" as const,
};

export const generateChannelName = (appointmentId: string, profileId: string): string => {
  return `${AGORA_CONFIG.CHANNEL_PREFIX}${appointmentId}-${profileId}`;
};


export const generateAgoraToken = async (
  channelName: string,
  uid: number,
  role: 'publisher' | 'subscriber' = 'publisher'
): Promise<string | null> => {
  try {
    if (!AGORA_CONFIG.TOKEN_SERVER_URL) {

      console.warn("No token server URL configured. Using no token (development only)");
      return null;
    }

    const response = await fetch(`${AGORA_CONFIG.TOKEN_SERVER_URL}/generate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channelName,
        uid,
        role,
        expireTime: 3600, // 1 hour
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate token');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error generating Agora token:', error);
    return null;
  }
};

/**
 * Validate Agora configuration
 */
export const validateAgoraConfig = (): boolean => {
  if (!AGORA_CONFIG.APP_ID || AGORA_CONFIG.APP_ID === "your-agora-app-id") {
    console.error("Please set your Agora App ID in the environment variables (NEXT_PUBLIC_AGORA_APP_ID)");
    return false;
  }
  return true;
};

/**
 * WebPush notification payload for doctor
 */
export interface CallNotificationPayload {
  appointmentId: string;
  profileId: string;
  channelName: string;
  patientName: string;
  message: string;
}

/**
 * Send webpush notification to doctor
 */
export const sendCallNotification = async (payload: CallNotificationPayload): Promise<boolean> => {
  try {
    const response = await fetch('/api/notifications/call-start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send call notification:', error);
    return false;
  }
};

export default AGORA_CONFIG;