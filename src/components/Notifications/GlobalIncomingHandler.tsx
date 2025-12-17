import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

export default function GlobalIncomingHandler() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const handleIncoming = async (event: any) => {
      const data = event?.detail || event?.data;
      if (!data) return;

      const appointmentId = data.appointmentId || data.channelName;
      if (!appointmentId) return;

      // Persist backup
      try { sessionStorage.setItem('incomingCallData', JSON.stringify(data)); } catch (e) { /* ignore */ }

      // Show notistack UI with Accept/Reject
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
                closeSnackbar(snackKey);
                // Dispatch call_started event to stop ringtone
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('call_started'));
                }
                try { sessionStorage.setItem('incomingCallData', JSON.stringify(data)); } catch (e) {}
                await router.push(`/appointments/${appointmentId}?incoming=1&autoJoin=1`);
              }} style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Accept</button>
              <button onClick={() => { 
                closeSnackbar(snackKey); 
                // Dispatch call_dismissed event to stop ringtone
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('call_dismissed'));
                }
              }} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Reject</button>
              <button onClick={() => closeSnackbar(snackKey)} style={{ background: 'transparent', color: '#6b7280', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>
          )
        }
      );
    };

    // Listen for our custom event and for service worker postMessage
    window.addEventListener('incoming_call', handleIncoming as EventListener);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleIncoming as EventListener);
    }

    return () => {
      window.removeEventListener('incoming_call', handleIncoming as EventListener);
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('message', handleIncoming as EventListener);
      }
    };
  }, [enqueueSnackbar, closeSnackbar, router]);

  return null;
}
