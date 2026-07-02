import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  normalizeIncomingCallPayload,
  clearIncomingCallDedup,
  IncomingCallData,
} from '@/helper/incomingCall';

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

      // Don't show a popup if we're already on this appointment's page —
      // Timer owns the incoming-call UI there.
      const currentPath = router.asPath || router.pathname;
      if (currentPath.includes(`/appointments/${appointmentId}`)) {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #10b981', flexShrink: 0, background: '#f3f4f6' }}>
            <img src={data.profileUrl || '/images/default-doctor.png'} alt={data.doctorName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => { e.currentTarget.src = '/images/default-doctor.png'; }} />
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
          action: (snackKey: any) => (
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button onClick={async () => {
                clearActivePopup();
                // Stop any ringtone owned elsewhere too.
                window.dispatchEvent(new Event('call_started'));
                try {
                  sessionStorage.setItem('incomingCallData', JSON.stringify(data));
                  // One-shot auto-join intent: Timer consumes + deletes this, so a
                  // page reload (where this key is gone) won't re-trigger a join.
                  sessionStorage.setItem(`autoJoinIntent_${appointmentId}`, '1');
                } catch (e) {}
                await router.push(`/appointments/${appointmentId}?incoming=1&autoJoin=1`);
              }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Accept</button>
              <button onClick={() => {
                clearActivePopup();
                window.dispatchEvent(new Event('call_dismissed'));
              }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
              <button onClick={() => {
                clearActivePopup();
                window.dispatchEvent(new Event('call_dismissed'));
              }} style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>
          ),
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
