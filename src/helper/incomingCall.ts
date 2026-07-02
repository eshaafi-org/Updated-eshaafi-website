/**
 * Shared helpers for the incoming-call notification flow.
 *
 * The app receives "incoming video call" signals from several places:
 *   - Foreground FCM messages (notifications.ts, _app.tsx)
 *   - Service worker postMessage (background FCM, notification clicks)
 *   - Safari push / deep links
 *
 * To avoid the "too many notifications / some stuck / some don't open the modal"
 * problems, all of those producers funnel through ONE normalized event
 * (`incoming_call`) and ONE consumer that renders the popup + ringtone
 * (GlobalIncomingHandler). This module holds the shared contract + dedup so a
 * single call never shows more than one popup, no matter how many raw signals
 * arrive (the service worker intentionally re-posts several times).
 */

export interface IncomingCallData {
  type?: 'incoming_call';
  appointmentId: string;
  doctorName?: string;
  agoraToken?: string;
  appId?: string;
  channelName?: string;
  profileUrl?: string;
  educationTitle?: string;
  body?: string;
  autoJoin?: boolean;
  [key: string]: any;
}

/**
 * Derive the appointmentId from raw notification data. Falls back to parsing the
 * Agora channelName (`eshaafi-consultation-{appointmentId}-{profileId}`).
 */
export function extractAppointmentId(data: any): string | null {
  if (!data) return null;
  if (data.appointmentId) return String(data.appointmentId);

  const channelName: string | undefined = data.channelName;
  if (channelName) {
    const parts = channelName.split('-');
    if (parts.length >= 3 && parts[0] === 'eshaafi' && parts[1] === 'consultation') {
      return parts.slice(2, -1).join('-');
    }
    return channelName;
  }
  return null;
}

/**
 * Normalize either an FCM payload ({ data, notification }) or an already-flat
 * call-data object into a consistent IncomingCallData shape. Returns null when
 * there's no appointment to act on.
 */
export function normalizeIncomingCallPayload(payload: any): IncomingCallData | null {
  if (!payload) return null;

  // Support both FCM payloads and already-flat objects.
  const data = payload.data || payload || {};
  const notification = payload.notification || {};

  const appointmentId = extractAppointmentId(data);
  if (!appointmentId) return null;

  return {
    type: 'incoming_call',
    appointmentId,
    doctorName: data.doctorName || data.name || notification.title || 'Doctor',
    agoraToken: data.agoraToken || data.token,
    appId: data.appId,
    channelName: data.channelName,
    profileUrl: data.profileUrl,
    educationTitle: data.educationTitle,
    body: notification.body || data.body || '',
    autoJoin: data.autoJoin === true || data.autoJoin === 'true' || data.type === 'accept_call',
  };
}

/**
 * How long (ms) after seeing a call for a given appointmentId we suppress
 * duplicate `incoming_call` dispatches. Covers the service worker's repeated
 * postMessage bursts and overlapping foreground/background delivery.
 */
const DEDUP_WINDOW_MS = 15000;

// appointmentId -> timestamp of last dispatch
const _recentDispatches = new Map<string, number>();

/**
 * Dispatch a deduplicated `incoming_call` window event. Repeated calls for the
 * same appointmentId within DEDUP_WINDOW_MS are ignored, which is what prevents
 * multiple popups from the service worker's intentional message bursts.
 */
export function dispatchIncomingCall(callData: IncomingCallData): boolean {
  if (typeof window === 'undefined') return false;
  const { appointmentId } = callData;
  if (!appointmentId) return false;

  const now = Date.now();
  const last = _recentDispatches.get(appointmentId);
  if (last && now - last < DEDUP_WINDOW_MS) {
    return false;
  }
  _recentDispatches.set(appointmentId, now);

  // Opportunistic cleanup of stale entries.
  Array.from(_recentDispatches.entries()).forEach(([id, ts]) => {
    if (now - ts > DEDUP_WINDOW_MS) _recentDispatches.delete(id);
  });

  window.dispatchEvent(new CustomEvent('incoming_call', { detail: callData }));
  return true;
}

/**
 * Clear the dedup guard for a call (e.g. after it's accepted/rejected/ended) so
 * a genuine subsequent call for the same appointment can show again.
 */
export function clearIncomingCallDedup(appointmentId?: string) {
  if (appointmentId) {
    _recentDispatches.delete(appointmentId);
  } else {
    _recentDispatches.clear();
  }
}
