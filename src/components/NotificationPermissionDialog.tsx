import { useState, useEffect } from 'react';

const NotificationPermissionDialog = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Check if notifications are supported and permission is not granted
    if ('Notification' in window) {
      const permission = Notification.permission;
      // Show dialog if permission is 'default' (not asked yet)
      if (permission === 'default') {
        // Check if user has dismissed it before (optional)
        const dismissed = localStorage.getItem('notificationDialogDismissed');
        if (!dismissed) {
          setShowDialog(true);
        }
      }
    }
  }, []);

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Optionally initialize FCM here
        console.log('Notification permission granted');
      }
      setShowDialog(false);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setShowDialog(false);
    }
  };

  const handleDeny = () => {
    setShowDialog(false);
    // Store dismissal to not show again
    localStorage.setItem('notificationDialogDismissed', 'true');
  };

  if (!showDialog) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Stay Connected</h3>
        <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.5' }}>
          Enable notifications to receive important updates and instant call alerts from your doctor.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleAllow}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Allow Notifications
          </button>
          <button
            onClick={handleDeny}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPermissionDialog;