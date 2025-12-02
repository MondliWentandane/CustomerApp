import axios, { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

// Use Render backend
// In development, use Vite proxy to forward /api to Render
// In production, use environment variable or Render URL directly
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // Use Vite proxy in development - proxy forwards to Render
    return '/api';
  }
  // In production, use Render URL directly
  return import.meta.env.VITE_API_URL || 'https://backend-89ej.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests and log requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log the full URL being requested for debugging
  const fullUrl = config.baseURL ? (config.baseURL + config.url) : config.url;
  console.log('🌐 API Request:', config.method?.toUpperCase(), fullUrl);
  if (config.data) {
    console.log('📦 Request data:', config.data);
  }
  
  return config;
});

// Handle token expiration and errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Log error details for debugging
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config?.url,
        method: error.config?.method,
        data: error.response.data,
      });
      
      // 404 errors - route not found
      if (error.response.status === 404) {
        console.error('❌ 404 Not Found:', error.config?.url);
        console.error('💡 Check if:');
        console.error('   1. Render backend is accessible: https://backend-89ej.onrender.com');
        console.error('   2. The route exists in your backend');
        console.error('   3. Vite proxy is configured correctly');
      }
      
      // 500 errors - server/database error
      if (error.response.status === 500) {
        const errorData = error.response.data as any;
        console.error('❌ 500 Server Error:', error.config?.url);
        if (errorData?.error === 'Database error') {
          console.error('💡 Database Connection Issue:');
          console.error('   - Check Supabase credentials in Render environment variables');
          console.error('   - Verify SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY are correct');
          console.error('   - Check if Supabase project is active (not paused)');
          console.error('   - Error details:', errorData.details);
        } else {
          console.error('💡 Server Error - Check Render logs for details');
        }
      }
    } else if (error.request) {
      console.error('❌ Network Error: No response received');
      console.error('💡 Check if Render backend is accessible: https://backend-89ej.onrender.com');
    } else {
      console.error('❌ Request Error:', error.message);
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;