import axios from 'axios';
import store from '@/redux/store';

/**
 * Setup global axios interceptor for handling token expiration
 * This ensures that whenever a 401 or 405 error occurs (token expired),
 * the user is automatically logged out and the login modal appears
 */
export const setupAxiosInterceptor = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;
        
        // Handle token expiration (401 Unauthorized, 405 Method Not Allowed for expired tokens)
        if (status === 401 || status === 405) {
          // Clear auth state from Redux
          store.dispatch({ type: 'loginModalSlice/clearAuth' });
          
          // Clear auth data from localStorage
          localStorage.removeItem('user');
          
          // Show login modal
          store.dispatch({ type: 'loginModalSlice/signIn' });
          
          console.warn('Token expired, user has been logged out');
        }
      }
      
      return Promise.reject(error);
    }
  );
};
