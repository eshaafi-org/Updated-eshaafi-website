import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initializeSafariPush, isSafariPushAvailable, getSafariToken, getSafariPushPermissionStatus, isSafari, isMacOSSafari } from '@/helper/notifications';

interface SafariPushPromptProps {
  className?: string;
}

export default function SafariPushPrompt({ className = '' }: SafariPushPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Get user data from Redux
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);

  console.log('[SafariPushPrompt] Component mounted/updated', { userAuth: !!userAuth?.uuid });


  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if dismissed this session
    const dismissedSession = !!sessionStorage.getItem('safari_push_dismissed');
    setDismissed(dismissedSession);

    // Only show prompt if all conditions are met
    const permissionStatus = getSafariPushPermissionStatus();
    const hasToken = !!getSafariToken();
    const available = isSafariPushAvailable();
    const isMacSafari = isMacOSSafari();
    const hasUser = !!userAuth?.uuid;
    const shouldShow = isMacSafari &&  // Only on macOS Safari, not iOS Safari
                      available &&
                      !hasToken &&
                      hasUser &&
                      permissionStatus !== 'denied' &&
                      permissionStatus !== 'granted' &&
                      !dismissedSession;

    console.log('[SafariPushPrompt] ===== SAFARI PUSH PROMPT CHECK =====');
    console.log('[SafariPushPrompt] User Agent:', navigator.userAgent);
    console.log('[SafariPushPrompt] Is Safari:', isSafari());
    console.log('[SafariPushPrompt] Is Mac Safari:', isMacSafari);
    console.log('[SafariPushPrompt] Safari API available:', typeof (window as any).safari !== 'undefined');
    console.log('[SafariPushPrompt] Push API available:', typeof (window as any).safari?.pushNotification !== 'undefined');
    console.log('[SafariPushPrompt] Available:', available);
    console.log('[SafariPushPrompt] Has Token:', hasToken);
    console.log('[SafariPushPrompt] Has User:', hasUser);
    console.log('[SafariPushPrompt] Permission Status:', permissionStatus);
    console.log('[SafariPushPrompt] Dismissed Session:', dismissedSession);
    console.log('[SafariPushPrompt] Should Show:', shouldShow);
    console.log('[SafariPushPrompt] ======================================');

    // Visual debugging for iPhone (since no console access)
    if (typeof window !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
      const debugInfo = `
Safari Debug (iOS):
Is Mac Safari: ${isMacSafari}
Available: ${available}
Has Token: ${hasToken}
Has User: ${hasUser}
Permission: ${permissionStatus}
Dismissed: ${dismissedSession}
Should Show: ${shouldShow}
      `.trim();
      
      // Show alert for debugging on iPhone
      setTimeout(() => alert(debugInfo), 2000);
    }

    setShowPrompt(shouldShow);
  }, [userAuth?.uuid]);

  const handleEnablePush = async () => {
    if (!userAuth?.uuid) return;

    setIsRequesting(true);
    try {
      await initializeSafariPush(userAuth.uuid, userAuth.phone_no);
      // Hide prompt after request (permission dialog will show)
      setShowPrompt(false);
    } catch (error) {
      console.error('Error requesting Safari push permission:', error);
    } finally {
      setIsRequesting(false);
    }
  };


  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('safari_push_dismissed', 'true');
      setDismissed(true);
    }
  };

  // Debug: Clear dismissal (for testing)
  const clearDismissal = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('safari_push_dismissed');
      setDismissed(false);
      // Re-check conditions
      const permissionStatus = getSafariPushPermissionStatus();
      const shouldShow = isSafariPushAvailable() &&
                        !getSafariToken() &&
                        userAuth?.uuid &&
                        permissionStatus !== 'denied' &&
                        permissionStatus !== 'granted';
      setShowPrompt(shouldShow);
    }
  };

  // Debug: Force show prompt for testing (remove in production)
  const forceShow = false; // Set to true to force show prompt for debugging

  // Don't show if dismissed this session and not force showing
  if ((!showPrompt && !forceShow) || (dismissed && !forceShow)) {
    console.log('[SafariPushPrompt] Not showing prompt:', { showPrompt, dismissed, forceShow });
    return null;
  }
  console.log('[SafariPushPrompt] Rendering prompt');
  return (
    <div className={`fixed top-4 right-4 z-[9999] max-w-sm animate-in slide-in-from-top-2 duration-300 ${className}`}>
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Enable Push Notifications
              </h3>
              <p className="text-sm text-blue-800 mb-3 leading-relaxed">
                Never miss important video calls! Enable notifications to get instant alerts.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleEnablePush}
                  disabled={isRequesting}
                  className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                  {isRequesting ? 'Enabling...' : 'Enable Now'}
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-blue-700 px-3 py-2 text-sm font-medium hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Later
                </button>
                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={clearDismissal}
                    className="text-xs text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                    title="Debug: Clear dismissal"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 text-blue-400 hover:text-blue-600 transition-colors"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}