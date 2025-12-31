
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initializeSafariPush, isSafariPushAvailable, getSafariToken } from '@/helper/notifications';

interface SafariPushPromptProps {
  className?: string;
}

export default function SafariPushPrompt({ className = '' }: SafariPushPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  // Get user data from Redux
  const { userAuth } = useSelector((state: any) => state.loginModalReducer);

  useEffect(() => {
    // Only show prompt if Safari push is available and no token exists
    if (isSafariPushAvailable() && !getSafariToken() && userAuth?.uuid) {
      // Show immediately when user logs in (no delay needed since it's user-initiated)
      setShowPrompt(true);
    } else {
      // Hide if conditions no longer met
      setShowPrompt(false);
    }
  }, [userAuth]);

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
    // Remember dismissal for this session
    sessionStorage.setItem('safari_push_dismissed', 'true');
  };

  // Don't show if dismissed this session
  if (!showPrompt || sessionStorage.getItem('safari_push_dismissed')) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-top-2 duration-300 ${className}`}>
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
                📱 Enable Push Notifications
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
                  {isRequesting ? '🔄 Enabling...' : '✅ Enable Now'}
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-blue-700 px-3 py-2 text-sm font-medium hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Later
                </button>
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