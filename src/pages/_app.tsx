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
import { setupAxiosInterceptor } from "@/helper/axiosInterceptor";
import { SnackbarProvider } from 'notistack';
// import { Urbanist } from 'next/font/google';
import Finalfooter from "@/views/Footer/Finalfooter";
import GlobalIncomingHandler from '@/components/Notifications/GlobalIncomingHandler';
import NotificationPermissionDialog from '@/components/NotificationPermissionDialog';
import { onForegroundMessage } from '@/config/firebase';
import { normalizeIncomingCallPayload, dispatchIncomingCall } from '@/helper/incomingCall';



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

  // Setup axios interceptor for handling token expiration globally
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

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

  // Foreground FCM messages -> deduplicated `incoming_call` event.
  // The popup + ringtone are rendered by GlobalIncomingHandler (single owner).
  useEffect(() => {
    const handleForegroundMessage = (payload: any) => {
      const callData = normalizeIncomingCallPayload(payload);
      if (!callData) return;

      try {
        sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
      } catch (err) {
        /* ignore */
      }
      dispatchIncomingCall(callData);
    };

    onForegroundMessage(handleForegroundMessage);
  }, []);

  // Service worker messages (background FCM / notification clicks).
  // We only handle navigation here for accept/reject; the popup for a plain
  // incoming_call while on another page is shown by GlobalIncomingHandler.
  useEffect(() => {
    const handleServiceWorkerMessage = async (event: MessageEvent) => {
      const data: any = event.data;
      if (!data || !data.type) return;
      if (data.type !== 'accept_call' && data.type !== 'reject_call') return;

      const callData = normalizeIncomingCallPayload(data);
      if (!callData) return;
      const { appointmentId } = callData;

      try {
        sessionStorage.setItem('incomingCallData', JSON.stringify(callData));
      } catch (err) {
        /* ignore */
      }

      if (data.type === 'reject_call') {
        // Tell the single popup owner to clear its UI + ringtone.
        window.dispatchEvent(new Event('call_dismissed'));
        return;
      }

      // accept_call: navigate to the appointment page and auto-join.
      const isOnAppointmentPage =
        typeof window !== 'undefined' &&
        window.location.pathname.includes(`/appointments/${appointmentId}`);
      window.dispatchEvent(new Event('call_started'));
      if (!isOnAppointmentPage) {
        try {
          // One-shot auto-join intent (consumed by Timer) so a reload of the
          // appointment URL doesn't keep auto-joining.
          sessionStorage.setItem(`autoJoinIntent_${appointmentId}`, '1');
        } catch (err) {
          /* ignore */
        }
        try {
          await router.push(`/appointments/${appointmentId}?incoming=1&autoJoin=1`);
        } catch (err) {
          /* ignore */
        }
      } else {
        // Already on the page — let Timer pick up the accept.
        window.dispatchEvent(new CustomEvent('incoming_call', { detail: { ...callData, autoJoin: true } }));
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
    }

    return () => {
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
