import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.PROD) {
    return '/v1/';
  }
  return import.meta.env.VITE_API_URL || '/v1/';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 12000, // 12 second timeout — never hang forever
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ttm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ttm_token');
      localStorage.removeItem('ttm_user');
    }
    // Provide clear error message instead of raw axios error
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      error.message = 'Server is taking too long to respond. Please try again in a few seconds.';
    } else if (!error.response) {
      error.message = 'Cannot reach server. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export default api;
