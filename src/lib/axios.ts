import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'json',
  },
});

// Interceptador opcional para injetar o Token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@repetilngua:access_token') // Ou via cookies/state
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
