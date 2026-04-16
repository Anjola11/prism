import axios from 'axios';

// All API calls use this instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true, // sends cookies on every request
});

// Interceptor for 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for redirect if needed, or handled in Context
    }
    return Promise.reject(error);
  }
);
