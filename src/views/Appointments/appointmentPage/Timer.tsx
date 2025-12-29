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
  const [pendingAutoJoin, setPendingAutoJoin] = useState(false);

  // Get profile data from Redux
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const { profiles } = useSelector((state: any) => state.getProfilesListReducer);
  const currentProfile = profiles?.[0]; // Assuming first profile is current
  
  const deadline = appointment?.appoint_date;

  // Listen for service worker messages IMMEDIATELY on mount (before appointment loads)
  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      console.log('[Timer] Early service worker message received:', event.data);
      console.log('[Timer] Message type:', event.data?.type);
      console.log('[Timer] Has agoraToken?:', !!event.data?.agoraToken);
      
      const allowedTypes = ['incoming_call', 'accept_call', 'reject_call'];
      if (!event.data || !allowedTypes.includes(event.data.type)) {
        console.log('[Timer] Early message type not allowed:', event.data?.type);
        return;
      }
      
      if (event.data?.type === 'incoming_call') {
        const data = event.data;
        console.log('[Timer] Early incoming_call received, storing data');
        console.log('[Timer] Data:', data);
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        setCallData(data);
        setIncomingCall(true);
      } else if (event.data?.type === 'accept_call') {
        const data = event.data;
        console.log('[Timer] Early accept_call received, setting callData and calling acceptCall');
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        setCallData(data);
        acceptCall();
      } else if (event.data?.type === 'reject_call') {
        console.log('[Timer] Early reject_call received, calling rejectCall');
        rejectCall();
      }
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('message', handleServiceWorkerMessage);
      //console.log('[Timer] Early service worker listener registered');
    }

    return () => {
      if ('serviceWorker' in navigator) {
        window.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, []); // Empty deps - run once on mount

  // Check URL parameter for incoming call
  useEffect(() => {
    if (router.query.incoming === '1') {
      console.log('[Timer] Incoming call detected from URL parameter');
      const shouldAutoJoin = router.query.autoJoin === '1';
      
      // FIRST: Check URL hash for embedded call data (from service worker)
      console.log('[Timer] Checking URL hash for call data, hash:', window.location.hash);
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash;
        console.log('[Timer] Found hash, looking for calldata...');
        
        const calldataMatch = hash.match(/#calldata=([^&]+)/);
        if (calldataMatch) {
          console.log('[Timer] Found calldata in hash');
          try {
            const encodedData = calldataMatch[1];
            console.log('[Timer] Encoded data length:', encodedData.length);
            const decodedData = decodeURIComponent(encodedData);
            console.log('[Timer] Decoded data preview:', decodedData.substring(0, 100) + '...');
            const parsedCallData = JSON.parse(decodedData);
            console.log('[Timer] ✅ Extracted call data from URL hash:', parsedCallData);
            console.log('[Timer] agoraToken present:', !!parsedCallData.agoraToken);
            console.log('[Timer] shouldAutoJoin:', shouldAutoJoin);
            
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
      //console.log('[Timer] SessionStorage incomingCallData:', storedCallData);
      let foundCallData = false;

      if (storedCallData) {
        try {
          const parsedCallData = JSON.parse(storedCallData);
          //console.log('[Timer] Loaded call data from sessionStorage:', parsedCallData);
          //console.log('[Timer] Setting callData state with agoraToken:', parsedCallData.agoraToken);
          setCallData(parsedCallData);
          
          // Auto-join if autoJoin flag is set
          if (shouldAutoJoin && parsedCallData.agoraToken) {
            //console.log('[Timer] Auto-joining call from sessionStorage with token:', parsedCallData.agoraToken);
            setAgoraToken(parsedCallData.agoraToken);
            setShowVideoCall(true);
            setIncomingCall(false);
          } else {
            setIncomingCall(true);
          }
          
          // Clear the stored data
          sessionStorage.removeItem('incomingCallData');
          foundCallData = true;
        } catch (error) {
          //console.error('[Timer] Error parsing stored call data:', error);
        }
      } else {
        //console.warn('[Timer] No call data found in sessionStorage!');
      }

      // If no call data was found but autoJoin is requested, set pending auto join
      if (!foundCallData && shouldAutoJoin) {
        console.log('[Timer] No call data, but autoJoin requested - waiting for call data from service worker');
        setPendingAutoJoin(true);
      }

      // If no call data and not autoJoining, show the incoming snackbar so user can accept manually
      if (!foundCallData && !shouldAutoJoin) {
        setIncomingCall(true);
        // show snackbar with accept/reject so mobile users see it even without callData
        enqueueSnackbar(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Incoming Video Call</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{appointment?.doctorName || 'Doctor'}</div>
            </div>
          </div>,
          {
            variant: 'default',
            persist: true,
            anchorOrigin: { horizontal: 'right', vertical: 'top' },
            action: (key) => (
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button onClick={() => { closeSnackbar(key); acceptCall(); }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Accept</button>
                <button onClick={() => { closeSnackbar(key); rejectCall(); }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
              </div>
            )
          }
        );
      }
      
      // Remove the incoming parameter from URL without reloading
      const { incoming, autoJoin, ...restQuery } = router.query;
      router.replace({ 
        pathname: router.pathname, 
        query: restQuery 
      }, undefined, { shallow: true });
    }
  }, [router.query.incoming]);

  // Handle pending auto join when callData becomes available
  useEffect(() => {
    if (pendingAutoJoin && callData) {
      console.log('[Timer] Call data received, processing pending auto join');
      setPendingAutoJoin(false);
      acceptCall();
    }
  }, [pendingAutoJoin, callData]);

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
      console.log('[Timer] Received message from service worker:', event.data);
      const allowedTypes = ['incoming_call', 'accept_call', 'reject_call'];

      if (!event.data || !allowedTypes.includes(event.data.type)) return;

      const data = event.data;
      console.log('[Timer] Incoming call appointmentId:', data.appointmentId, 'Current appointmentId:', appointmentId);

      // Check if the call is for this appointment
      if (data.appointmentId === appointmentId) {
        console.log('[Timer] Setting callData from service worker:', data);
        setCallData(data);
        
        // Handle different message types
        if (event.data.type === 'accept_call') {
          console.log('[Timer] Received accept_call, calling acceptCall');
          acceptCall();
          return;
        } else if (event.data.type === 'reject_call') {
          console.log('[Timer] Received reject_call, calling rejectCall');
          rejectCall();
          return;
        }
        
        // For incoming_call, check if pending auto join
        if (pendingAutoJoin) {
          console.log('[Timer] Pending auto join detected for incoming_call, skipping incoming call UI');
          return;
        }

        setIncomingCall(true);

        // Also store in sessionStorage as backup
        try { sessionStorage.setItem('incomingCallData', JSON.stringify(data)); } catch (e) { console.warn('[Timer] sessionStorage set failed', e); }

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
      window.addEventListener('message', handleServiceWorkerMessage);
    }
    
    // Listen for custom window events (FCM notifications while app is open)
    window.addEventListener('incoming_call', handleWindowIncomingCall);
    
    return () => {
      if ('serviceWorker' in navigator) {
        window.removeEventListener('message', handleServiceWorkerMessage);
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
      
      // Dispatch call_started event immediately to stop ringtone
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('call_started'));
      }
      
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
      const appointmentId = activeCallData?.appointmentId || appointment?.appointmentId || appointment?.id;
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
    
    // Dispatch call_dismissed event to stop ringtone
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('call_dismissed'));
    }
    
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