import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  normalizeIncomingCallPayload,
  clearIncomingCallDedup,
  IncomingCallData,
} from '@/helper/incomingCall';
import IncomingCallCard from './IncomingCallCard';

/**
 * Single source of truth for the in-app "incoming video call" UI.
 *
 * All producers (foreground FCM, service worker messages, deep links) funnel
 * into the deduplicated `incoming_call` window event; this component is the ONLY
 * place that renders the popup and plays the ringtone. That's what keeps the
 * notifications from stacking or getting stuck:
 *   - one popup + one ringtone per active appointmentId (guarded by refs)
 *   - popup/ringtone are always cleared on accept, reject, or `call_started` /
 *     `call_dismissed` events (fired by Timer when a call connects/ends)
 *   - if we're already on the target appointment page, Timer owns the flow and
 *     we stay silent
 */
export default function GlobalIncomingHandler() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // The appointmentId currently showing a popup, and the notistack key for it,
  // so we never show two popups for the same call and can always close it.
  const activeAppointmentIdRef = useRef<string | null>(null);
  const activeSnackKeyRef = useRef<string | number | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stopRingtone = () => {
      if (ringtoneRef.current) {
        try {
          ringtoneRef.current.pause();
          ringtoneRef.current.currentTime = 0;
        } catch (e) {
          /* ignore */
        }
        ringtoneRef.current = null;
      }
    };

    const startRingtone = () => {
      // Only one ringtone instance at a time.
      stopRingtone();
      try {
        const audio = new window.Audio('/ringtone.mp3');
        audio.loop = true;
        audio.volume = 1.0;
        // Autoplay may be blocked without a prior user gesture; that's fine.
        audio.play().catch(() => {});
        ringtoneRef.current = audio;
      } catch (e) {
        /* ignore */
      }
    };

    const clearActivePopup = () => {
      if (activeSnackKeyRef.current !== null) {
        closeSnackbar(activeSnackKeyRef.current);
        activeSnackKeyRef.current = null;
      }
      clearIncomingCallDedup(activeAppointmentIdRef.current || undefined);
      activeAppointmentIdRef.current = null;
      stopRingtone();
    };

    // Fired by Timer when a call actually connects or is dismissed/ended.
    const onCallResolved = () => clearActivePopup();

    const showPopup = (data: IncomingCallData) => {
      const appointmentId = data.appointmentId;
      if (!appointmentId) return;

      // Don't show a popup if we're already on this appointment's page (Timer
      // owns the incoming-call UI there) or already in the call itself.
      const currentPath = router.asPath || router.pathname;
      if (
        currentPath.includes(`/appointments/${appointmentId}`) ||
        currentPath.includes(`/call/${appointmentId}`)
      ) {
        return;
      }

      // Already showing a popup for this exact call — don't stack another.
      if (activeAppointmentIdRef.current === appointmentId && activeSnackKeyRef.current !== null) {
        return;
      }

      // A different call arrived — replace the old popup.
      if (activeSnackKeyRef.current !== null) {
        closeSnackbar(activeSnackKeyRef.current);
        activeSnackKeyRef.current = null;
      }

      // Persist backup so the appointment page can pick it up after navigation.
      try {
        sessionStorage.setItem('incomingCallData', JSON.stringify(data));
      } catch (e) {
        /* ignore */
      }

      activeAppointmentIdRef.current = appointmentId;
      startRingtone();

      const key = enqueueSnackbar(
        <IncomingCallCard
          doctorName={data.doctorName}
          educationTitle={data.educationTitle}
          profileUrl={data.profileUrl}
          onAccept={async () => {
            clearActivePopup();
            // Stop any ringtone owned elsewhere too.
            window.dispatchEvent(new Event('call_started'));
            // Dedicated call page fetches its own token from the backend —
            // no URL params or sessionStorage handoff needed.
            await router.push(`/call/${appointmentId}`);
          }}
          onReject={() => {
            clearActivePopup();
            window.dispatchEvent(new Event('call_dismissed'));
          }}
        />,
        {
          variant: 'default',
          persist: true,
          anchorOrigin: { horizontal: 'right', vertical: 'top' },
          // The card styles itself — strip notistack's default chrome.
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            minWidth: 'unset',
          },
        }
      );

      activeSnackKeyRef.current = key;
    };

    const handleIncoming = (event: any) => {
      const raw = event?.detail || event?.data;
      const data = normalizeIncomingCallPayload(raw);
      if (!data) return;
      showPopup(data);
    };

    window.addEventListener('incoming_call', handleIncoming as EventListener);
    window.addEventListener('call_started', onCallResolved);
    window.addEventListener('call_dismissed', onCallResolved);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleIncoming as EventListener);
    }

    return () => {
      window.removeEventListener('incoming_call', handleIncoming as EventListener);
      window.removeEventListener('call_started', onCallResolved);
      window.removeEventListener('call_dismissed', onCallResolved);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleIncoming as EventListener);
      }
      stopRingtone();
    };
  }, [enqueueSnackbar, closeSnackbar, router]);

  return null;
}
