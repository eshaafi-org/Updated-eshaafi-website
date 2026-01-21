declare global {
  interface Window {
    dataLayer?: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize dataLayer if not present
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
): boolean => {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    // Always push to dataLayer for queuing (gtag will process when loaded)
    window.dataLayer!.push({
      event: eventName,
      ...params
    });

    // If gtag is available, also call it directly for immediate processing
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    return true;
  } catch (error) {
    // In production, avoid console logs; consider sending to error monitoring
    // console.error('GA tracking error:', error);
    return false;
  }
};
