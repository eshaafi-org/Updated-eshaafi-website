import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Footer from "@/views/Footer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Script from "next/script";
import Providers from "../redux/provider";
import { useEffect } from "react";
import { initializeDeviceToken } from "@/helper/notifications";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';
// import { Urbanist } from 'next/font/google';
import Finalfooter from "@/views/Footer/Finalfooter";
import GlobalIncomingHandler from '@/components/Notifications/GlobalIncomingHandler';
import NotificationPermissionDialog from '@/components/NotificationPermissionDialog';
import { onForegroundMessage } from '@/config/firebase';



// import LocoMotiveScroll from "locomotive-scroll";

// rendering header as a client component
const NoSSRHeader = dynamic(() => import("../views/Header/index"), {
  ssr: false,
});

// import urbanist font
// const urbanist = Urbanist({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700']
// });

// import Context from "@/contextAPI";
export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();

  // Register device token on app load if user is logged in
  useEffect(() => {
    const initializeDeviceTokenOnLoad = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const userId = user.uuid || user.IdToken;
          const phoneNumber = user.phone_no || user.phoneNumber || user.phone;
          if (userId) {
            // console.log('[App] User logged in, registering device token');
            await initializeDeviceToken(userId, phoneNumber);
          }
        }
      } catch (error) {
        console.error('[App] Device token initialization error:', error);
      }
    };

    initializeDeviceTokenOnLoad();
  }, []);

  // Listen for foreground FCM messages
  useEffect(() => {
    const handleForegroundMessage = (payload: any) => {
      console.log('[App] Foreground FCM message received:', payload);
      
      // Extract data from payload
      const notificationData = payload.data || {};
      const notification = payload.notification || {};

      // Extract appointmentId
      let appointmentId = notificationData.appointmentId;
      if (!appointmentId && notificationData.channelName) {
        const parts = notificationData.channelName.split('-');
        if (parts.length >= 3 && parts[0] === 'eshaafi' && parts[1] === 'consultation') {
          appointmentId = parts.slice(2, -1).join('-');
        } else {
          appointmentId = notificationData.channelName;
        }
      }

      if (!appointmentId) {
        console.error('[App] No appointmentId in foreground FCM message');
        return;
      }

      // Create call data object
      const callData = {
        type: 'incoming_call',
        appointmentId,
        doctorName: notificationData.name || notificationData.doctorName || notification.title || 'Doctor',
        agoraToken: notificationData.token || notificationData.agoraToken,
        appId: notificationData.appId,
        channelName: notificationData.channelName,
        profileUrl: notificationData.profileUrl,
        educationTitle: notificationData.educationTitle
      };

      console.log('[App] Foreground call data:', callData);

      // Store in sessionStorage
      sessionStorage.setItem('incomingCallData', JSON.stringify(callData));

      // Dispatch incoming_call event
      window.dispatchEvent(new CustomEvent('incoming_call', { detail: callData }));
    };

    onForegroundMessage(handleForegroundMessage);
  }, []);

  // Global incoming call notification listener
  useEffect(() => {
    const handleGlobalIncomingCall = (event: CustomEvent) => {
      const callData = event.detail;
      console.log('[App] Global incoming call received:', callData);
      console.log('[App] Appointment ID:', callData.appointmentId);
      
      // Validate appointmentId exists
      if (!callData.appointmentId) {
        console.error('[App] No appointmentId in call data, cannot show notification');
        return;
      }
      
      // Show simple toast notification matching Timer.tsx style
      const snackbarKey = enqueueSnackbar(
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
            <img src={callData.profileUrl || '/images/default-doctor.png'} alt={callData.doctorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = '/images/default-doctor.png'; }} />
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
              <button
                onClick={async () => {
                  console.log('[App] Accept button clicked, storing callData:', callData);
                  closeSnackbar(key);
                  sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
                  const encodedData = encodeURIComponent(JSON.stringify(callData));
                  console.log('[App] Navigating to:', `/appointments/${callData.appointmentId}?incoming=1&autoJoin=1#calldata=${encodedData}`);
                  await router.push(`/appointments/${callData.appointmentId}?incoming=1&autoJoin=1#calldata=${encodedData}`);
                }}
                style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
              >
                Accept
              </button>
              <button onClick={() => closeSnackbar(key)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
              <button onClick={() => closeSnackbar(key)} style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>
          ),
        }
      );
    };

    // Listen for incoming call events
    window.addEventListener('incoming_call', handleGlobalIncomingCall as EventListener);

    // Listen for service worker messages
    const handleServiceWorkerMessage = async (event: MessageEvent) => {
      const data = event.data;
      if (!data || !data.type) return;

      // Treat incoming_call, accept_call and reject_call similarly at app-level
      if (data.type === 'incoming_call' || data.type === 'accept_call' || data.type === 'reject_call') {
        //console.log('[App] Service worker message received:', data);

        // Ensure appointmentId exists
        const appointmentId = data.appointmentId || data.channelName;
        if (!appointmentId) {
          //console.error('[App] No appointmentId in service worker message, ignoring');
          return;
        }

        // Persist call data so the appointment page can pick it up
        try {
          sessionStorage.setItem('incomingCallData', JSON.stringify(data));
        } catch (err) {
          console.warn('[App] Failed to write incomingCallData to sessionStorage', err);
        }

        // If we're not already on the appointment page for this appointment, navigate there
        const isOnAppointmentPage = typeof window !== 'undefined' && window.location.pathname.includes(`/appointments/${appointmentId}`);
        const autoJoin = data.type === 'accept_call' ? '1' : '0';

        if (!isOnAppointmentPage) {
          //console.log('[App] Navigating to appointment page for', appointmentId, 'autoJoin=', autoJoin);
          try {
            await router.push(`/appointments/${appointmentId}?incoming=1&autoJoin=${autoJoin}`);
          } catch (err) {
            //console.error('[App] Router push failed:', err);
          }
        }

        // Dispatch a standardized incoming_call event so components (Timer) show UI
        window.dispatchEvent(new CustomEvent('incoming_call', { detail: data }));
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }

    return () => {
      window.removeEventListener('incoming_call', handleGlobalIncomingCall as EventListener);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      }
    };
  }, [router]);

  return (
    <SnackbarProvider maxSnack={5} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
      <Providers>
        <GlobalIncomingHandler />
        <NotificationPermissionDialog />
        <main id="root">
          {router.pathname === "/blog/second/[id]" ||
            router.pathname === "/blog/mobile/[id]" ||
            router.pathname === "/privacy-policy/mobile" ||
            router.pathname === "/terms-and-conditions/mobile" ||
            router.pathname === "/faq/mobile" ||<NoSSRHeader />}

          <Component {...pageProps} />
           
          {/* <Script
          src="https://kit.fontawesome.com/a076d05399.js"
          crossOrigin="anonymous"
          /> */}
          {router.pathname === "/blog/second/[id]" ||
            router.pathname === "/blog/mobile/[id]" ||
            router.pathname === "/privacy-policy/mobile" ||
            router.pathname === "/terms-and-conditions/mobile" ||
            router.pathname === "/faq/mobile" || <Finalfooter />
            // <Footer />
            
            }
          {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-1BXFKZVVFJ" />
          <Script id="google-analytics">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1BXFKZVVFJ');
            `}
          </Script> */}
          <Script src="https://www.youtube.com/iframe_api" />
        </main>
      </Providers>
    </SnackbarProvider>
  );
}
