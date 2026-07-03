/**
 * Shared incoming-call popup card. Rendered inside a notistack snackbar by
 * GlobalIncomingHandler (all pages) and Timer (appointment page) so the design
 * stays consistent in one place.
 */
interface IncomingCallCardProps {
  doctorName?: string;
  educationTitle?: string;
  profileUrl?: string;
  onAccept: () => void;
  onReject: () => void;
}

const PhoneIcon = ({ hangup = false }: { hangup?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ transform: hangup ? 'rotate(135deg)' : 'none', flexShrink: 0 }}
  >
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
  </svg>
);

export default function IncomingCallCard({
  doctorName,
  educationTitle,
  profileUrl,
  onAccept,
  onReject,
}: IncomingCallCardProps) {
  return (
    <div
      style={{
        width: '340px',
        maxWidth: '90vw',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08)',
        padding: '18px',
        fontFamily: 'inherit',
      }}
    >
      <style>{`
        @keyframes eshaafi-call-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(0, 155, 148, 0.45); }
          70%  { box-shadow: 0 0 0 14px rgba(0, 155, 148, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 155, 148, 0); }
        }
        @keyframes eshaafi-call-ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-12deg); }
          20% { transform: rotate(12deg); }
          30% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          50% { transform: rotate(0deg); }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2.5px solid #009B94',
            flexShrink: 0,
            background: '#f3f4f6',
            animation: 'eshaafi-call-pulse 1.6s ease-out infinite',
          }}
        >
          <img
            src={profileUrl || '/images/default-doctor.png'}
            alt={doctorName || 'Doctor'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e: any) => {
              e.currentTarget.src = '/images/default-doctor.png';
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '3px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'eshaafi-call-pulse 1.6s ease-out infinite',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}
            >
              Incoming Video Call
            </span>
          </div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#111827',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {doctorName || 'Doctor'}
          </div>
          {educationTitle && (
            <div
              style={{
                fontSize: '12px',
                color: '#6b7280',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {educationTitle}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button
          onClick={onReject}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            padding: '11px 0',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <PhoneIcon hangup />
          Decline
        </button>
        <button
          onClick={onAccept}
          style={{
            flex: 1.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #009B94 0%, #10b981 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '11px 0',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0, 155, 148, 0.35)',
          }}
        >
          <span style={{ display: 'inline-flex', animation: 'eshaafi-call-ring 1.6s ease-in-out infinite' }}>
            <PhoneIcon />
          </span>
          Accept
        </button>
      </div>
    </div>
  );
}
