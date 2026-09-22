import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@repetilingua:access_token');

    if (token && config.headers) {
      // Garante a definição do cabeçalho Bearer
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
