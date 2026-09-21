import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador opcional para injetar o Token JWT
api.interceptors.request.use((config) => {
  // Corrigido para incluir a letra "i" em repetilingua
  const token = localStorage.getItem('@repetilingua:access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['ngrok-skip-browser-warning'] = 'true';
  }

  return config;
});
