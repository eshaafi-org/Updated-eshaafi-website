export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('GA4 Event:', eventName, params);
    window.gtag('event', eventName, params);
  } else {
    console.log('GA4 not available for event:', eventName, params);
  }
};
