"use client";
import { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import style from "../../../styles/appointments.module.scss";
import { AGORA_CONFIG } from "@/components/VideoCall/agoraConfig";

// Dynamically import AgoraVideoCall to avoid SSR issues
const AgoraVideoCall = dynamic(
  () => import("@/components/VideoCall/AgoraVideoCall"),
  { ssr: false }
);


export default function Timer({ appointment }: any) {
  const router = useRouter();
  const [call, setCall] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [incomingCall, setIncomingCall] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [agoraToken, setAgoraToken] = useState<string | null>(null);
  const [callData, setCallData] = useState<any>(null);
  const [isRequestingToken, setIsRequestingToken] = useState(false);

  // Get profile data from Redux
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const { profiles } = useSelector((state: any) => state.getProfilesListReducer);
  const currentProfile = profiles?.[0]; // Assuming first profile is current
  
  const deadline = appointment?.appoint_date;

  // Listen for service worker messages IMMEDIATELY on mount (before appointment loads)
  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      //console.log('[Timer] Early service worker message received:', event.data);
      //console.log('[Timer] Message type:', event.data?.type);
      //console.log('[Timer] Has agoraToken?:', !!event.data?.agoraToken);
      
      if (event.data?.type === 'incoming_call') {
        const data = event.data;
        //console.log('[Timer] ✅ Valid incoming_call message, storing data');
        //console.log('[Timer] Data to store:', data);
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        //console.log('[Timer] Data stored in sessionStorage');
        setCallData(data);
        //console.log('[Timer] callData state updated');
        setIncomingCall(true);
        //console.log('[Timer] incomingCall modal set to true');
      } else {
        //console.log('[Timer] ❌ Not an incoming_call message, ignoring');
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
      //console.log('[Timer] Early service worker listener registered');
    }

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, []); // Empty deps - run once on mount

  // Check URL parameter for incoming call
  useEffect(() => {
    if (router.query.incoming === '1') {
      console.log('[Timer] Incoming call detected from URL parameter');
      const shouldAutoJoin = router.query.autoJoin === '1';
      
      // FIRST: Check URL hash for embedded call data (from service worker)
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash;
        //console.log('[Timer] URL hash found:', hash);
        
        const calldataMatch = hash.match(/#calldata=([^&]+)/);
        if (calldataMatch) {
          try {
            const encodedData = calldataMatch[1];
            const decodedData = decodeURIComponent(encodedData);
            const parsedCallData = JSON.parse(decodedData);
            console.log('[Timer] ✅ Extracted call data from URL hash:', parsedCallData);
            console.log('[Timer] agoraToken:', parsedCallData.agoraToken);
            
            setCallData(parsedCallData);
            sessionStorage.setItem('incomingCallData', JSON.stringify(parsedCallData));
            
            // Clear the hash
            window.location.hash = '';
            
            // Auto-join if autoJoin flag is set
            if (shouldAutoJoin && parsedCallData.agoraToken) {
              console.log('[Timer] Auto-joining call with token:', parsedCallData.agoraToken);
              setAgoraToken(parsedCallData.agoraToken);
              setShowVideoCall(true);
              setIncomingCall(false);
            } else {
              setIncomingCall(true);
            }
            
            // Remove the incoming parameter from URL
            const { incoming, autoJoin, ...restQuery } = router.query;
            router.replace({ 
              pathname: router.pathname, 
              query: restQuery 
            }, undefined, { shallow: true });
            
            return; // Data loaded successfully
          } catch (error) {
            console.error('[Timer] Error parsing URL hash data:', error);
          }
        }
      }
      
      // FALLBACK: Try to get call data from sessionStorage
      const storedCallData = sessionStorage.getItem('incomingCallData');
      console.log('[Timer] SessionStorage incomingCallData:', storedCallData);
      
      if (storedCallData) {
        try {
          const parsedCallData = JSON.parse(storedCallData);
          console.log('[Timer] Loaded call data from sessionStorage:', parsedCallData);
          console.log('[Timer] Setting callData state with agoraToken:', parsedCallData.agoraToken);
          setCallData(parsedCallData);
          
          // Auto-join if autoJoin flag is set
          if (shouldAutoJoin && parsedCallData.agoraToken) {
            console.log('[Timer] Auto-joining call from sessionStorage with token:', parsedCallData.agoraToken);
            setAgoraToken(parsedCallData.agoraToken);
            setShowVideoCall(true);
            setIncomingCall(false);
          } else {
            setIncomingCall(true);
          }
          
          // Clear the stored data
          sessionStorage.removeItem('incomingCallData');
        } catch (error) {
          console.error('[Timer] Error parsing stored call data:', error);
        }
      } else {
        console.warn('[Timer] No call data found in sessionStorage!');
      }
      
      if (!shouldAutoJoin) {
        setIncomingCall(true);
      }
      
      // Remove the incoming parameter from URL without reloading
      const { incoming, autoJoin, ...restQuery } = router.query;
      router.replace({ 
        pathname: router.pathname, 
        query: restQuery 
      }, undefined, { shallow: true });
    }
  }, [router.query.incoming]);

  const getTime = useCallback(() => {
    if (moment(deadline).valueOf() > Date.now()) {
      setCall(true);
      const time = moment(deadline).valueOf() - Date.now();
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    } else {
      if (call) {
        // Appointment time has arrived - show toast notification
        enqueueSnackbar('Appointment time has arrived! Doctor will call you shortly.', {
          variant: 'success',
          autoHideDuration: 5000,
          anchorOrigin: { horizontal: 'right', vertical: 'top' }
        });
      }
      setCall(false);
    }
  }, [deadline, call]);

  useEffect(() => {
    if (appointment?.appoint_date) {
      const interval = setInterval(() => getTime(), 1000);
      return () => clearInterval(interval);
    }
  }, [appointment, getTime]);

  // Listen for incoming call notifications from FCM push notifications
  useEffect(() => {
    const appointmentId = appointment?.appointmentId || appointment?.id;
    console.log('[Timer] FCM listener registered for appointmentId:', appointmentId);
    
    // Handler for messages from service worker (background notifications)
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      console.log('[Timer] Received FCM message from service worker:', event.data);
      
      if (event.data?.type === 'incoming_call') {
        const data = event.data;
        console.log('[Timer] Incoming call appointmentId:', data.appointmentId, 'Current appointmentId:', appointmentId);
        
        // Check if the call is for this appointment
        if (data.appointmentId === appointmentId) {
          console.log('[Timer] Setting callData from service worker:', data);
          setCallData(data);
          setIncomingCall(true);
          
          // Also store in sessionStorage as backup
          sessionStorage.setItem('incomingCallData', JSON.stringify(data));
          
          // Show simplified toast notification with Accept/Reject buttons
          enqueueSnackbar(
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
                <img src={data.profileUrl || '/images/default-doctor.png'} alt={data.doctorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/default-doctor.png'; }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Incoming Video Call</div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{data.doctorName || 'Doctor'}</div>
                {data.educationTitle && <div style={{ fontSize: '11px', color: '#6b7280' }}>{data.educationTitle}</div>}
              </div>
            </div>,
            {
              variant: 'default',
              persist: true,
              anchorOrigin: { horizontal: 'right', vertical: 'top' },
              style: {
                minWidth: '320px',
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '12px 16px',
              },
              action: (key) => (
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button onClick={() => { closeSnackbar(key); acceptCall(); }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Accept</button>
                  <button onClick={() => { closeSnackbar(key); rejectCall(); }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
                  <button onClick={() => closeSnackbar(key)} style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
                </div>
              )
            }
          );
        } else {
          console.log('[Timer] Call is for different appointment, ignoring');
        }
      }
    };

    // Handler for custom window events (foreground notifications)
    const handleWindowIncomingCall = (event: any) => {
      console.log('[Timer] Received FCM message from window event:', event.detail);
      
      const data = event.detail;
      console.log('[Timer] Incoming call appointmentId:', data.appointmentId, 'Current appointmentId:', appointmentId);
      
      // Check if the call is for this appointment
      if (data.appointmentId === appointmentId) {
        console.log('[Timer] Setting callData from window event:', data);
        setCallData(data);
        setIncomingCall(true);
        
        // Also store in sessionStorage as backup
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        
        // Show simplified toast notification with Accept/Reject buttons
        enqueueSnackbar(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
              <img src={data.profileUrl || '/images/default-doctor.png'} alt={data.doctorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/default-doctor.png'; }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Incoming Video Call</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{data.doctorName || 'Doctor'}</div>
              {data.educationTitle && <div style={{ fontSize: '11px', color: '#6b7280' }}>{data.educationTitle}</div>}
            </div>
          </div>,
          {
            variant: 'default',
            persist: true,
            anchorOrigin: { horizontal: 'right', vertical: 'top' },
            style: {
              minWidth: '320px',
              background: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            action: (key) => (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button onClick={() => { closeSnackbar(key); acceptCall(); }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Accept</button>
                <button onClick={() => { closeSnackbar(key); rejectCall(); }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
                <button onClick={() => closeSnackbar(key)} style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
              </div>
            )
          }
        );
      } else {
        console.log('[Timer] Call is for different appointment, ignoring');
      }
    };

    // Listen for messages from service worker (FCM notifications clicked while app closed)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }
    
    // Listen for custom window events (FCM notifications while app is open)
    window.addEventListener('incoming_call', handleWindowIncomingCall);
    
    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
      window.removeEventListener('incoming_call', handleWindowIncomingCall);
    };
  }, [appointment]);

  const acceptCall = async () => {
    if (isRequestingToken) return;
    
    try {
      setIsRequestingToken(true);
      setIncomingCall(false);
      
      console.log('[Call] Accept call triggered');
      console.log('[Call] callData:', callData);
      console.log('[Call] callData.agoraToken:', callData?.agoraToken);
      
      // If callData is null, try to load from sessionStorage
      let activeCallData = callData;
      if (!activeCallData) {
        console.log('[Call] callData is null, checking sessionStorage...');
        const storedData = sessionStorage.getItem('incomingCallData');
        if (storedData) {
          try {
            activeCallData = JSON.parse(storedData);
            console.log('[Call] Loaded callData from sessionStorage:', activeCallData);
            setCallData(activeCallData);
          } catch (error) {
            console.error('[Call] Error parsing sessionStorage data:', error);
          }
        }
      }
      
      // Check if we're on the correct appointment page
      const currentAppointmentId = appointment?.appointmentId || appointment?.id;
      const callAppointmentId = activeCallData?.appointmentId;
      
      if (callAppointmentId && currentAppointmentId !== callAppointmentId) {
        console.log('[Call] Not on correct appointment page, navigating...');
        sessionStorage.setItem('incomingCallData', JSON.stringify(activeCallData));
        router.push(`/appointments/${callAppointmentId}?incoming=1&autoJoin=1`);
        return;
      }
      
      enqueueSnackbar('Connecting to call...', { 
        variant: 'info',
        autoHideDuration: 2000 
      });
      
      // Check if we already have the Agora token from FCM notification
      if (activeCallData?.agoraToken) {
        console.log('[Call] Using Agora token from FCM notification:', activeCallData.agoraToken);
        setAgoraToken(activeCallData.agoraToken);
        setShowVideoCall(true);
        
        enqueueSnackbar('Connected!', { 
          variant: 'success',
          autoHideDuration: 2000 
        });
        return;
      }
      
      console.log('[Call] No token in callData, requesting from backend');
      
      // Fallback: Request token from backend if not in notification
      const appointmentId = appointment?.appointmentId || appointment?.id;
      console.log('[Call] Appointment ID:', appointmentId);
      
      const response = await axios.get(
        `${BASE_URL}/appointment/${appointmentId}/startConsultation`,
        { headers: headers() }
      );
      
      console.log('[Call] Token received from backend:', response.data);
      
      if (response.data?.response?.token) {
        setAgoraToken(response.data.response.token);
        setShowVideoCall(true);
        
        enqueueSnackbar('Connected!', { 
          variant: 'success',
          autoHideDuration: 2000 
        });
      } else {
        throw new Error('No token received from backend');
      }
    } catch (error: any) {
      console.error('[Call] Error accepting call:', error);
      setIncomingCall(true); // Show modal again
      
      enqueueSnackbar(
        error?.response?.data?.response?.message || 'Failed to join call. Please try again.',
        { variant: 'error', autoHideDuration: 5000 }
      );
    } finally {
      setIsRequestingToken(false);
    }
  };

  const rejectCall = () => {
    console.log('[Call] Rejected');
    setIncomingCall(false);
    setCallData(null);
    
    enqueueSnackbar('Call rejected', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  };

  const handleCallEnd = () => {
    console.log('[Call] Ended');
    setShowVideoCall(false);
    setIncomingCall(false);
    setCallData(null);
    setAgoraToken(null);
    
    enqueueSnackbar('Call ended', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  };

  // If video call is active, show the video call component
  if (showVideoCall && agoraToken) {
    return (
      <>
        <div className={style.videoCallWrapper}>
          <AgoraVideoCall
            appId={AGORA_CONFIG.APP_ID}
            channelName={appointment?.appointmentId || appointment?.id}
            token={agoraToken}
            onCallEnd={handleCallEnd}
            profileId={currentProfile?.profileId || userAuth?.uuid || '0'}
            appointmentId={appointment?.appointmentId || appointment?.id || ''}
          />
        </div>
        <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />
      </>
    );
  }

  return (
    <>
      <div
        className={style.consultationTimer}
        style={{ background: !call ? "#D7DDEA" : "#009B94" }}
      >
        {call ? (
          <div className={style.timer} role="timer">
            <div className={style.box}>
              <p id="day" style={{ marginBottom: 0 }} className={style.clock}>
                {days < 10 ? "0" + days : days}
              </p>
              <span className={style.unit}>D</span>
            </div>
            <div className={style.box}>
              <p id="hour" style={{ marginBottom: 0 }} className={style.clock}>
                {hours < 10 ? "0" + hours : hours}
              </p>
              <span className={style.unit}>H</span>
            </div>
            <div className={style.box}>
              <p id="minute" className={style.clock} style={{ marginBottom: 0 }}>
                {minutes < 10 ? "0" + minutes : minutes}
              </p>
              <span className={style.unit}>m</span>
            </div>
            <div
              className={style.box}
              style={{
                color: hours === 0 && minutes < 5 ? "#B00020" : "#fff",
              }}
            >
              <p id="second" className={style.clock} style={{ marginBottom: 0 }}>
                {seconds < 10 ? "0" + seconds : seconds}
              </p>
              <span className={style.unit}>s</span>
            </div>
          </div>
        ) : (
          <div className={style.callReadyContainer}>
            <p style={{ color: "#009b94" }}>Doctor Will Call You Shortly</p>
          </div>
        )}
      </div>
      
      <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />
    </>
  );
}