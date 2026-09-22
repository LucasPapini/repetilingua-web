import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

// Interceptador opcional para injetar o Token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@repetilngua:access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Asegura el envío del encabezado de ngrok en cada solicitud
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});
