
"use client";
import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import moment from "moment/moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL, headers } from "@/helper/CONST";
import style from "../../../styles/appointments.module.scss";
import { isSafari } from "@/helper/notifications";
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
  const [agoraAppId, setAgoraAppId] = useState<string | null>(null);
  const hasClearedUrl = useRef(false);
  const hasProcessedIncoming = useRef(false);
  const hasRetriedJoin = useRef(false);
  const isCurrentlyAccepting = useRef(false);

  // Helper to fix tokens corrupted by URL decoding (spaces instead of +)
  const fixCorruptedToken = (token?: string | null): string | null => {
    if (!token) return null;
    // Replace all spaces with + (common issue where + in URL is decoded to space)
    const fixed = token.replace(/ /g, '+');
    if (fixed !== token) {
      console.log('[Timer] 🔧 Fixed corrupted token (replaced spaces with +)');
    }
    return fixed;
  };

  // Try to derive Agora App ID from an RTC token when the backend or notification
  // doesn't explicitly provide it. RTC token format usually starts with "006" + appId.
  const getAppIdFromToken = (token?: string | null): string | null => {
    if (!token) return null;
    try {
      if (token.startsWith('006') && token.length > 35) {
        // token = '006' + appId(32) + rest
        return token.slice(3, 35);
      }
    } catch (e) {
      
    }
    return null;
  };

  // Ensure the App ID is a 32-character hex string. Returns normalized lowercase ID or null.
  const sanitizeAppId = (raw?: string | null): string | null => {
    if (!raw || typeof raw !== 'string' || raw.trim() === '') return null;
    try {
      // Remove non-hex characters (defensive) and lowercase
      const onlyHex = raw.replace(/[^0-9a-fA-F]/g, '').toLowerCase();
      if (onlyHex.length === 32) return onlyHex;
      // If it's longer but contains the appId at start (common when token-derived), try to take first 32
      if (onlyHex.length > 32) {
        return onlyHex.slice(0, 32);
      }
      // If too short, log warning
      if (onlyHex.length > 0 && onlyHex.length < 32) {
        
      }
    } catch (e) {
      
    }
    return null;
  };

  // Validate token structure to detect truncation or corruption.
  // Agora RTC tokens: '006' + 32-char appId + rest (should be 100+ chars total for valid token)
  const isTokenValid = (token?: string | null): boolean => {
    if (!token) return false;
    try {
      // Must start with '006' and be reasonably long (truncated tokens are often too short)
      if (!token.startsWith('006')) {
        console.warn('[Timer] Token does not start with "006" - likely malformed', { tokenPreview: token.substring(0, 20) });
        return false;
      }
      if (token.length < 100) {
        // Valid Agora RTC tokens are typically 120+ chars; <100 suggests truncation
        console.warn('[Timer] Token appears truncated (too short)', { length: token.length });
        return false;
      }
      // Token looks reasonable - no obvious corruption
      return true;
    } catch (e) {
      
      return false;
    }
  };

  // Get profile data from Redux
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);
  const { profiles } = useSelector((state: any) => state.getProfilesListReducer);
  const currentProfile = profiles?.[0]; // Assuming first profile is current

  const deadline = appointment?.appoint_date;

  const acceptCall = useCallback(async () => {
    // Prevent multiple simultaneous requests using a ref lock
    if (isCurrentlyAccepting.current || showVideoCall) {
      
      return;
    }

    try {
      isCurrentlyAccepting.current = true;
      setIsRequestingToken(true);
      setIncomingCall(false);

      
      console.log('[Timer] 🚀 acceptCall() INITIATED');
      
      console.log('[Timer] Current State:', {
        hasCallData: !!callData,
        showVideoCall,
        agoraTokenPresent: !!agoraToken,
        agoraTokenLength: agoraToken?.length || 0,
        agoraAppId,
        appointmentId: appointment?.appointmentId || appointment?.id
      });

      if (callData) {
        console.log('[Timer] Active callData payload:', JSON.stringify(callData, null, 2));
      }

      // Dispatch call_started event immediately to stop ringtone
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('call_started'));
      }

      // If callData is null, try to load from sessionStorage
      let activeCallData = callData;
      if (!activeCallData) {
        
        const storedData = sessionStorage.getItem('incomingCallData');
        if (storedData) {
          try {
            activeCallData = JSON.parse(storedData);
            
            setCallData(activeCallData);
          } catch (error) {
            
          }
        }
      }

      // Check if we're on the correct appointment page
      const currentAppointmentId = appointment?.appointmentId || appointment?.id;
      const callAppointmentId = activeCallData?.appointmentId;

      if (callAppointmentId && currentAppointmentId !== callAppointmentId) {
        
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
        // Fix potential token corruption (spaces instead of +)
        const fixedToken = fixCorruptedToken(activeCallData.agoraToken);
        if (fixedToken) activeCallData.agoraToken = fixedToken;

        // Validate token to detect truncation/corruption from URL params
        if (!isTokenValid(activeCallData.agoraToken)) {
          
        } else {
          
          setAgoraToken(activeCallData.agoraToken);
          const derived = getAppIdFromToken(activeCallData.agoraToken);
          // Try appId first, but if it's empty/invalid, prefer derived from token
          let finalAppId = activeCallData.appId;
          if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
            finalAppId = derived;
            
          }
          const sanitized = sanitizeAppId(finalAppId);
          if (!sanitized) 
          if (activeCallData.appId && typeof activeCallData.appId === 'string' && activeCallData.appId.trim() !== '' && derived && activeCallData.appId !== derived) {
            
          }
          setAgoraAppId(sanitized);
          setShowVideoCall(true);

          enqueueSnackbar('Connected!', {
            variant: 'success',
            autoHideDuration: 2000
          });
          return;
        }
      }

      

      // Fallback: Request token from backend if not in notification
      const appointmentId = activeCallData?.appointmentId || appointment?.appointmentId || appointment?.id;
      

      const response = await axios.get(
        `${BASE_URL}/appointment/${appointmentId}/startConsultation`,
        { headers: headers() }
      );

      
      
      
      console.log('[Timer] Payload:', JSON.stringify(response.data, null, 2));
      

      if (response.data?.response?.token) {
        const token = fixCorruptedToken(response.data.response.token) as string;
        const backendAppId = response.data.response.appId;
        const derived = getAppIdFromToken(token);
        // Try backendAppId first, but if it's empty/invalid, prefer derived from token
        let finalAppId = backendAppId;
        if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
          finalAppId = derived;
          
        }
        const sanitized = sanitizeAppId(finalAppId);
        if (!sanitized) 
        if (backendAppId && typeof backendAppId === 'string' && backendAppId.trim() !== '' && derived && backendAppId !== derived) {
          
        }
        setAgoraAppId(sanitized);
        setAgoraToken(token);
        setShowVideoCall(true);

        enqueueSnackbar('Connected!', {
          variant: 'success',
          autoHideDuration: 2000
        });
      } else {
        throw new Error('No token received from backend');
      }
    } catch (error: any) {
      
      setIncomingCall(true); // Show modal again

      enqueueSnackbar(
        error?.response?.data?.response?.message || 'Failed to join call. Please try again.',
        { variant: 'error', autoHideDuration: 5000 }
      );
    } finally {
      setIsRequestingToken(false);
      isCurrentlyAccepting.current = false;
    }
  }, [callData, appointment, router, agoraToken, agoraAppId, showVideoCall]);

  // Safari: Listen for hash changes and process call data if present (for notification click when already on page)
  useLayoutEffect(() => {
    if (!isSafari()) return;
    const processHashCallData = () => {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      
      
      
      if (hash) {
        const calldataMatch = hash.match(/#calldata=([^&]+)/);
        if (calldataMatch) {
          try {
            const encodedData = calldataMatch[1];
            
            
            const decodedData = decodeURIComponent(encodedData);
            console.log('[Timer][Safari] Decoded data preview:', decodedData.substring(0, 150) + '...');
            
            const parsedCallData = JSON.parse(decodedData);
            // Fix token corruption
            if (parsedCallData.agoraToken) {
              parsedCallData.agoraToken = fixCorruptedToken(parsedCallData.agoraToken);
            }
            
            
            
            console.log('[Timer][Safari] Payload:', JSON.stringify(parsedCallData, null, 2));
            
            
            console.log('[Timer][Safari] 📊 Detailed data received:', {
              appointmentId: parsedCallData.appointmentId,
              hasAgoraToken: !!parsedCallData.agoraToken,
              agoraTokenLength: parsedCallData.agoraToken?.length,
              agoraTokenStarts: parsedCallData.agoraToken?.substring(0, 20),
              agoraTokenValid: parsedCallData.agoraToken?.startsWith('006'),
              appId: parsedCallData.appId || '(empty)',
              appIdType: typeof parsedCallData.appId,
              appIdLength: parsedCallData.appId?.length,
              doctorName: parsedCallData.doctorName,
              channelName: parsedCallData.channelName,
              profileUrl: parsedCallData.profileUrl ? 'present' : 'missing',
              educationTitle: parsedCallData.educationTitle,
            });
            
            setCallData(parsedCallData);
            sessionStorage.setItem('incomingCallData', JSON.stringify(parsedCallData));
            
            
            // Optionally auto-join if autoJoin=1 in URL search params
            const params = new URLSearchParams(window.location.search);
            const autoJoinValue = params.get('autoJoin');
            
            
            if (params.get('autoJoin') === '1') {
              
              if (parsedCallData.agoraToken) {
                
                console.log('[Timer][Safari] 📌 Token analysis:', {
                  tokenLength: parsedCallData.agoraToken.length,
                  tokenStarts: parsedCallData.agoraToken.substring(0, 20),
                  startsWithPrefix: parsedCallData.agoraToken.startsWith('006'),
                  isValidLength: parsedCallData.agoraToken.length >= 100,
                });
                
                setAgoraToken(parsedCallData.agoraToken);
                
                
                // Derive and set appId for Safari compatibility
                const derived = getAppIdFromToken(parsedCallData.agoraToken);
                console.log('[Timer][Safari] 🔧 Derived appId:', derived, '(length:', derived?.length, ')');
                
                let finalAppId = parsedCallData.appId;
                console.log('[Timer][Safari] 🔍 Backend appId value:', {
                  value: parsedCallData.appId,
                  type: typeof parsedCallData.appId,
                  isEmpty: !parsedCallData.appId,
                  isEmptyString: parsedCallData.appId === '',
                  trimmedEmpty: (typeof parsedCallData.appId === 'string' && parsedCallData.appId.trim() === ''),
                });
                
                if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
                  
                  finalAppId = derived;
                } else {
                  
                }
                
                const sanitized = sanitizeAppId(finalAppId);
                console.log('[Timer][Safari] ✅ Sanitized appId result:', {
                  sanitized: sanitized,
                  isValid: !!sanitized,
                  length: sanitized?.length,
                  isHex: /^[0-9a-f]{32}$/i.test(sanitized || ''),
                });
                
                setAgoraAppId(sanitized);
                
                
                {
                  let finalAppIdSafari = parsedCallData.appId;
                  console.log('[Timer][Safari] Backend appId value:', parsedCallData.appId, '(type:', typeof parsedCallData.appId, ')');
                  
                  if (!finalAppIdSafari || (typeof finalAppIdSafari === 'string' && finalAppIdSafari.trim() === '')) {
                    
                    finalAppIdSafari = derived;
                  } else {
                    
                  }
                  
                  const sanitizedSafari = sanitizeAppId(finalAppIdSafari);
                  console.log('[Timer][Safari] Sanitized appId:', sanitizedSafari, '(valid:', !!sanitizedSafari, ')');
                  
                  setAgoraAppId(sanitizedSafari);
                  
                }
                
                setShowVideoCall(true);
                console.log('[Timer][Safari] setShowVideoCall(true) called');
                
                setIncomingCall(false);
                
              } else {
                
                sessionStorage.setItem('incomingCallData', JSON.stringify(parsedCallData));
                try { acceptCall(); } catch (e) {  }
              }
            } else {
              
              setIncomingCall(true);
            }
            
            // Clear the hash
            
            window.location.hash = '';
          } catch (e: unknown) {
            
            console.error('[Timer][Safari] Error details:', (e as Error).message);
          }
        } else {
          
        }
      } else {
        
      }
    };
    // Run on mount in case hash is already present
    processHashCallData();
    // Listen for hashchange events
    window.addEventListener('hashchange', processHashCallData);
    return () => {
      window.removeEventListener('hashchange', processHashCallData);
    };
  }, [acceptCall]);

  // Listen for service worker messages IMMEDIATELY on mount (before appointment loads)
  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      
      
      
      
      const allowedTypes = ['incoming_call', 'accept_call', 'reject_call'];
      if (!event.data || !allowedTypes.includes(event.data.type)) {
        
        return;
      }
      
      if (event.data?.type === 'incoming_call') {
        const data = event.data;
        
        
        if (isSafari()) {
          console.log('[Timer] Notification payload received from backend:', JSON.stringify(data, null, 2));
        }
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        setCallData(data);
        // Handle auto join from service worker
        if (data.autoJoin && data.agoraToken) {
          
          setAgoraToken(data.agoraToken);
          // Derive and set appId for Safari compatibility
          const derived = getAppIdFromToken(data.agoraToken);
          let finalAppId = data.appId;
          if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
            finalAppId = derived;
          }
          setAgoraAppId(sanitizeAppId(finalAppId));
          setShowVideoCall(true);
          setIncomingCall(false);
        } else {
          
          setIncomingCall(true);
        }
      } else if (event.data?.type === 'accept_call') {
        const data = event.data;
        
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        setCallData(data);
        acceptCall();
      } else if (event.data?.type === 'reject_call') {
        
        rejectCall();
      }
    };

    if ('serviceWorker' in navigator) {
      window.addEventListener('message', handleServiceWorkerMessage);
      //
    }

    return () => {
      if ('serviceWorker' in navigator) {
        window.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, [acceptCall]); // Empty deps - run once on mount

  // Check URL parameter for incoming call (Safari push notification handling)
  useEffect(() => {
    if (hasProcessedIncoming.current) return;

    const appointmentIdForCheck = appointment?.appointmentId || appointment?.id || router.query.appointmentId || router.query.id;
    if (appointmentIdForCheck && sessionStorage.getItem(`safariCallProcessed_${appointmentIdForCheck}`)) {
      hasProcessedIncoming.current = true;
      return;
    }

    if (router.query.incoming === '1' || (isSafari() && (router.query.callData || router.query.appointmentId || router.query.channelName))) {
      // Mark as processed immediately to prevent loop
      hasProcessedIncoming.current = true;
      if (appointmentIdForCheck) {
        sessionStorage.setItem(`safariCallProcessed_${appointmentIdForCheck}`, 'true');
      }

      
      
      
      
      const shouldAutoJoin = router.query.autoJoin === '1';

      // For Safari with hash data, skip here (handled by useLayoutEffect)
      if (isSafari() && typeof window !== 'undefined' && window.location.hash) {
        console.log('[Timer] Safari with hash detected, skipping main useEffect (handled by useLayoutEffect)');
        return;
      }

      const processAndJoinCall = (data: any, shouldAutoJoin: boolean) => {
        // 1. Fix token corruption immediately
        if (data.agoraToken) {
          data.agoraToken = fixCorruptedToken(data.agoraToken);
        }

        // 2. Derive and set appId
        const derived = getAppIdFromToken(data.agoraToken);
        let finalAppId = data.appId;
        if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
          finalAppId = derived;
        }
        const sanitized = sanitizeAppId(finalAppId);
        
        // 3. Update all relevant states
        setCallData(data);
        setAgoraAppId(sanitized || '');
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));

        console.log('[Timer] Call data processed:', {
          appointmentId: data.appointmentId,
          hasToken: !!data.agoraToken,
          appId: sanitized,
          shouldAutoJoin
        });

        // 4. Auto-join if flag is set
        if (shouldAutoJoin) {
          if (data.agoraToken) {
            
            setAgoraToken(data.agoraToken);
            setShowVideoCall(true);
            setIncomingCall(false);
          } else {
            
            try { acceptCall(); } catch (e) {  }
          }
        } else {
          setIncomingCall(true);
        }

        // 5. Clear URL params once processed
        const { incoming, autoJoin, callData, appointmentId, doctorName, agoraToken, appId, channelName, profileUrl, educationTitle, name, token, id, ...restQuery } = router.query;
        if (!hasClearedUrl.current) {
          hasClearedUrl.current = true;
          router.replace({
            pathname: router.pathname,
            query: restQuery
          }, undefined, { shallow: true });
        }
      };

      // Check for call data in URL (Universal: Safari Push or FCM deep links)
      if (router.query.callData) {
        
        try {
          const parsed = JSON.parse(decodeURIComponent(router.query.callData as string));
          processAndJoinCall(parsed, shouldAutoJoin);
          return;
        } catch (error) {
          
        }
      }

      // Check for flat individual query parameters (Universal fallback)
      if (router.query.appointmentId || router.query.channelName || router.query.agoraToken || router.query.token) {
        
        const flatData = {
          appointmentId: router.query.appointmentId as string || router.query.id as string,
          doctorName: router.query.doctorName as string || router.query.name as string || 'Doctor',
          agoraToken: router.query.agoraToken as string || router.query.token as string,
          appId: router.query.appId as string,
          channelName: router.query.channelName as string,
          profileUrl: router.query.profileUrl as string,
          educationTitle: router.query.educationTitle as string
        };
        processAndJoinCall(flatData, shouldAutoJoin);
        return;
      }

      // FIRST: Check URL hash for embedded call data (from service worker) - SKIP FOR SAFARI (handled by useLayoutEffect)
      if (!isSafari()) {
        
        if (typeof window !== 'undefined' && window.location.hash) {
          const hash = window.location.hash;
          

          const calldataMatch = hash.match(/#calldata=([^&]+)/);
          if (calldataMatch) {
            
            try {
              const encodedData = calldataMatch[1];
              
              const decodedData = decodeURIComponent(encodedData);
              console.log('[Timer] Decoded data preview:', decodedData.substring(0, 100) + '...');
              const parsedCallData = JSON.parse(decodedData);
              
              
              

              setCallData(parsedCallData);
              sessionStorage.setItem('incomingCallData', JSON.stringify(parsedCallData));
              setAgoraAppId(parsedCallData.appId || getAppIdFromToken(parsedCallData.agoraToken));

              // Clear the hash
              window.location.hash = '';

              // Auto-join if autoJoin flag is set
              if (shouldAutoJoin) {
                if (parsedCallData.agoraToken) {
                  
                  setAgoraToken(parsedCallData.agoraToken);
                  setShowVideoCall(true);
                  setIncomingCall(false);
                } else {
                  // No token in payload — attempt to accept which will request token from backend.
                  console.log('[Timer] shouldAutoJoin true but no token — calling acceptCall() to request token');
                  // ensure stored so acceptCall can read it
                  sessionStorage.setItem('incomingCallData', JSON.stringify(parsedCallData));
                  try { acceptCall(); } catch (e) {  }
                }
              } else {
                setIncomingCall(true);
              }

              // Remove the incoming parameter from URL
              const { incoming, autoJoin, ...restQuery } = router.query;
              if (!hasClearedUrl.current) {
                hasClearedUrl.current = true;
                router.replace({
                  pathname: router.pathname,
                  query: restQuery
                }, undefined, { shallow: true });
              }

              return; // Data loaded successfully
            } catch (error) {
              
            }
          }
        }
      }

      // FALLBACK: Try to get call data from sessionStorage
      const storedCallData = sessionStorage.getItem('incomingCallData');
      
      let foundCallData = false;

      if (storedCallData) {
        try {
          const parsedCallData = JSON.parse(storedCallData);
          setCallData(parsedCallData);

          // Auto-join if autoJoin flag is set
          if (shouldAutoJoin && parsedCallData.agoraToken) {
            const token = fixCorruptedToken(parsedCallData.agoraToken) as string;
            setAgoraToken(token);
            setAgoraAppId(parsedCallData.appId || getAppIdFromToken(token));
            setShowVideoCall(true);
            setIncomingCall(false);
          } else {
            setIncomingCall(true);
          }
          
          sessionStorage.removeItem('incomingCallData');
          foundCallData = true;
        } catch (error) {
          
        }
      }

      // If no call data was found but autoJoin is requested, set pending auto join
      if (!foundCallData && shouldAutoJoin) {
        
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
  }, [router.query.incoming, router, acceptCall, appointment?.appointmentId, appointment?.doctorName, appointment?.id]);

  // Handle pending auto join when callData becomes available
  useEffect(() => {
    if (pendingAutoJoin && callData) {
      
      setPendingAutoJoin(false);
      acceptCall();
    }
  }, [pendingAutoJoin, callData, acceptCall]);

  // Show incoming call modal/snackbar when incomingCall is true
  useEffect(() => {
    if (incomingCall && callData) {
      
      setTimeout(() => {
        enqueueSnackbar(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
              <Image src={callData.profileUrl || '/images/default-doctor.png'} alt={callData.doctorName} width={50} height={50} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>Incoming Video Call</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{callData.doctorName || 'Doctor'}</div>
              {callData.educationTitle && <div style={{ fontSize: '11px', color: '#6b7280' }}>{callData.educationTitle}</div>}
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
              </div>
            )
          }
        );
      }, 6000);
    }
  }, [incomingCall, callData, acceptCall]);

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
    
    
    // Handler for messages from service worker (background notifications)
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      
      
      console.log('[Timer] Event Data:', JSON.stringify(event.data, null, 2));
      
      
      const allowedTypes = ['incoming_call', 'accept_call', 'reject_call'];

      if (!event.data || !allowedTypes.includes(event.data.type)) return;

      const data = event.data;
      

      // Check if the call is for this appointment
      if (data.appointmentId === appointmentId) {
        
        if (isSafari()) {
          console.log('[Timer] Notification payload received from backend:', JSON.stringify(data, null, 2));
        }
        setCallData(data);
        
        // Handle auto join
        if (data.autoJoin && data.agoraToken) {
          
          setAgoraToken(data.agoraToken);
          // Derive and set appId for Safari compatibility
          const derived = getAppIdFromToken(data.agoraToken);
          let finalAppId = data.appId;
          if (!finalAppId || (typeof finalAppId === 'string' && finalAppId.trim() === '')) {
            finalAppId = derived;
          }
          setAgoraAppId(sanitizeAppId(finalAppId));
          setShowVideoCall(true);
          setIncomingCall(false);
          return;
        }
        
        // Handle different message types
        if (event.data.type === 'accept_call') {
          
          acceptCall();
          return;
        } else if (event.data.type === 'reject_call') {
          
          rejectCall();
          return;
        }
        
        // For incoming_call, check if pending auto join
        if (pendingAutoJoin) {
          
          return;
        }

        setIncomingCall(true);

        // Also store in sessionStorage as backup
        try { sessionStorage.setItem('incomingCallData', JSON.stringify(data)); } catch (e) {  }

        // Show simplified toast notification with Accept/Reject buttons
        enqueueSnackbar(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
              <Image src={data.profileUrl || '/images/default-doctor.png'} alt={data.doctorName} width={50} height={50} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        
      }
    };

    // Handler for custom window events (foreground notifications)
    const handleWindowIncomingCall = (event: any) => {
      
      
      const data = event.detail;
      
      
      // Check if the call is for this appointment
      if (data.appointmentId === appointmentId) {
        
        setCallData(data);
        setIncomingCall(true);
        
        // Also store in sessionStorage as backup
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        
        // Show simplified toast notification with Accept/Reject buttons
        enqueueSnackbar(
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
              <Image src={data.profileUrl || '/images/default-doctor.png'} alt={data.doctorName} width={50} height={50} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
  }, [appointment, acceptCall, pendingAutoJoin]);

  const rejectCall = () => {
    
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
    
    setShowVideoCall(false);
    setIncomingCall(false);
    setCallData(null);
    setAgoraToken(null);
    setAgoraAppId(null);
    
    enqueueSnackbar('Call ended', { 
      variant: 'info',
      autoHideDuration: 3000 
    });
  };

  // If video call is active, show the video call component
  if (showVideoCall && agoraToken && (!isSafari() || agoraAppId)) {
    return (
      <>
        <div className={style.videoCallWrapper}>
          <AgoraVideoCall
            appId={isSafari() ? (agoraAppId as string) : AGORA_CONFIG.APP_ID}
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
