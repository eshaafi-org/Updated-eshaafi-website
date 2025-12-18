"use client";
import { useState, useEffect, useCallback } from "react";
import AgoraRTC, {
  ILocalVideoTrack,
  ILocalAudioTrack,
  IRemoteVideoTrack,
  IRemoteAudioTrack,
  IAgoraRTCRemoteUser,
  ILocalTrack,
} from "agora-rtc-sdk-ng";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import styles from "./VideoCall.module.scss";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaPhoneSlash } from "react-icons/fa";

interface AgoraVideoCallProps {
  appId: string;
  channelName: string;
  token: string | null;
  onCallEnd: () => void;
  profileId: string;
  appointmentId: string;
}

const AgoraVideoCall: React.FC<AgoraVideoCallProps> = ({
  appId,
  channelName,
  token,
  onCallEnd,
  profileId,
  appointmentId,
}) => {
  const [client] = useState(() => AgoraRTC.createClient({ mode: "rtc", codec: "h264" }));
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | null>(null);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isJoined) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isJoined]);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUserJoined = useCallback((user: IAgoraRTCRemoteUser) => {
    setRemoteUsers(prev => [...prev, user]);
    toast.success("Doctor has joined the call", {
      position: "top-right",
      autoClose: 3000,
    });
  }, []);

  const handleUserLeft = useCallback((user: IAgoraRTCRemoteUser) => {
    setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    toast.info("Doctor has left the call", {
      position: "top-right",
      autoClose: 3000,
    });
  }, []);

  const handleUserPublished = useCallback(async (user: IAgoraRTCRemoteUser, mediaType: "video" | "audio") => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
      remoteVideoTrack?.play(`remote-video-${user.uid}`);
      console.log('[Agora] Remote video track playing');
    }
    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
      if (remoteAudioTrack) {
        remoteAudioTrack.setVolume(100); // Set to maximum volume
        remoteAudioTrack.play();
        console.log('[Agora] Remote audio track playing, volume set to 100');
      }
    }
  }, [client]);

  const handleUserUnpublished = useCallback(async (user: IAgoraRTCRemoteUser, mediaType: "video" | "audio") => {
    if (mediaType === "video") {
      const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
      remoteVideoTrack?.stop();
    }
  }, []);

  useEffect(() => {
    // Register event listeners
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    return () => {
      // Clean up event listeners
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
    };
  }, [client, handleUserJoined, handleUserLeft, handleUserPublished, handleUserUnpublished]);

  const joinCall = async () => {
    try {
      setIsConnecting(true);
      // Create local tracks
      const [videoTrack, audioTrack] = await Promise.all([
        AgoraRTC.createCameraVideoTrack({
          encoderConfig: {
            width: 640,
            height: 480,
            frameRate: 15,
            bitrateMin: 600,
            bitrateMax: 1000,
          }
        }),
        AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: "music_standard",
        }),
      ]);

      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);

      // Join channel
      await client.join(appId, channelName, token, parseInt(profileId));

      // Publish local tracks
      await client.publish([videoTrack, audioTrack]);

      // Play local video
      videoTrack.play("local-video");

      setIsJoined(true);
      setIsConnecting(false);
      //setRingtoneAudio(null); // Stop ringtone if playing

      // Send webpush notification to doctor
      await sendWebPushNotification();

      // Dispatch call_started event to stop ringtone
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('call_started'));
      }

      toast.success("Successfully joined the call! Waiting for doctor to join...", {
        position: "top-right",
        autoClose: 5000,
      });

    } catch (error) {
      console.error("Failed to join call:", error);
      setIsConnecting(false);
      toast.error("Failed to join the call. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const leaveCall = async () => {
    try {
      // Stop and close local tracks
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
        setLocalVideoTrack(null);
      }
      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
        setLocalAudioTrack(null);
      }

      // Stop remote video tracks
      remoteUsers.forEach(user => {
        if (user.videoTrack) {
          user.videoTrack.stop();
        }
      });

      // Leave channel
      await client.leave();
      setIsJoined(false);
      setRemoteUsers([]);
      setCallDuration(0);
      
      onCallEnd();

      toast.info("Call ended successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Failed to leave call:", error);
      toast.error("Error ending the call", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const toggleVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setEnabled(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setEnabled(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const sendWebPushNotification = async () => {
    try {
      // This would typically call your backend API to send push notification to doctor
      // Based on the appointment and profile data
      const response = await fetch('/api/notifications/call-start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId,
          profileId,
          channelName,
          message: 'Patient is ready for video consultation',
        }),
      });

      if (!response.ok) {
        console.warn('Failed to send webpush notification');
      }
    } catch (error) {
      console.warn('Error sending webpush notification:', error);
    }
  };

  return (
    <div className={styles.videoCallContainer}>
      <div className={styles.videoCallHeader}>
        <h3>Video Consultation</h3>
        {isJoined && (
          <div className={styles.callDuration}>
            <span className={styles.callTime}>{formatDuration(callDuration)}</span>
          </div>
        )}
      </div>

      <div className={styles.videoContainer}>
        {/* Local Video */}
        <div className={styles.localVideo}>
          <div
            id="local-video"
            className={`${styles.videoPlayer} ${!isVideoEnabled ? styles.videoDisabled : ''}`}
          />
          <div className={styles.videoLabel}>You</div>
          {!isVideoEnabled && (
            <div className={styles.videoPlaceholder}>
              {/* <FaVideoSlash size={48} /> */}
            </div>
          )}
        </div>

        {/* Remote Videos */}
        {remoteUsers.length > 0 ? (
          <div className={styles.remoteVideos}>
            {remoteUsers.map(user => (
              <div key={user.uid} className={styles.remoteVideo}>
                <div
                  id={`remote-video-${user.uid}`}
                  className={styles.videoPlayer}
                />
                <div className={styles.videoLabel}>Doctor</div>
              </div>
            ))}
          </div>
        ) : isJoined ? (
          <div className={styles.waitingForDoctor}>
            <div className={styles.waitingMessage}>
              <div className={styles.loadingSpinner}></div>
              <p>Waiting for doctor to join...</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className={styles.controlsContainer}>
        {!isJoined ? (
          <Button
            variant="contained"
            onClick={joinCall}
            disabled={isConnecting}
            className={styles.joinButton}
          >
            {isConnecting ? (
              <>
                <div className={styles.buttonSpinner}></div>
                Connecting...
              </>
            ) : (
              <>
                <FaVideo />
                Join Video Call
              </>
            )}
          </Button>
        ) : (
          <div className={styles.callControls}>
            <button
              onClick={toggleAudio}
              className={`${styles.controlButton} ${!isAudioEnabled ? styles.disabled : ''}`}
              title={isAudioEnabled ? "Mute" : "Unmute"}
            >
              {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>

            <button
              onClick={toggleVideo}
              className={`${styles.controlButton} ${!isVideoEnabled ? styles.disabled : ''}`}
              title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
              {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
            </button>

            <button
              onClick={leaveCall}
              className={`${styles.controlButton} ${styles.endCall}`}
              title="End call"
            >
              <FaPhoneSlash />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgoraVideoCall;