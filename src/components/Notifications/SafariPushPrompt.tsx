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
      setShowPrompt(true);
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
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-800">
              Enable Push Notifications
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              Get notified about incoming video calls and important updates. Click "Enable" to allow notifications.
            </p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleEnablePush}
                disabled={isRequesting}
                className="bg-blue-600 text-white px-3 py-1.5 text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequesting ? 'Requesting...' : 'Enable Notifications'}
              </button>
              <button
                onClick={handleDismiss}
                className="text-blue-600 px-3 py-1.5 text-sm font-medium hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}