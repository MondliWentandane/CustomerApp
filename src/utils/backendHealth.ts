/**
 * Backend Health Check Utility
 * Tests if the backend is responding
 */

import api from '../lib/api';

export interface BackendHealth {
  isHealthy: boolean;
  status: number | null;
  message: string;
  url: string;
}

export async function checkBackendHealth(): Promise<BackendHealth> {
  const baseURL = import.meta.env.DEV 
    ? '/api' 
    : (import.meta.env.VITE_API_URL || 'https://backend-89ej.onrender.com/api');
  
  const fullURL = baseURL.startsWith('http') ? baseURL : `${window.location.origin}${baseURL}`;
  
  try {
    // Try rooms endpoint as health check (health endpoint is at root, not /api)
    const response = await api.get('/rooms', { timeout: 10000 });

    return {
      isHealthy: true,
      status: response.status,
      message: 'Backend is responding',
      url: fullURL,
    };
  } catch (error: any) {
    const status = error.response?.status || null;
    let message = 'Backend is not responding';

    if (status === 502) {
      message = 'Backend server is down or not deployed (502 Bad Gateway)';
    } else if (status === 503) {
      message = 'Backend service is unavailable (503 Service Unavailable)';
    } else if (status === 404) {
      message = 'Backend route not found (404) - Check if /api/rooms exists';
    } else if (status === 500) {
      message = 'Backend server error (500) - Check backend logs';
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      message = 'Cannot connect to backend - Check if backend is running';
    } else if (error.message?.includes('timeout')) {
      message = 'Backend request timed out - Backend may be slow or down';
    }

    return {
      isHealthy: false,
      status,
      message,
      url: fullURL,
    };
  }
}

