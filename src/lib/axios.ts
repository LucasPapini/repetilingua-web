import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'json',
  },
});

// Interceptador opcional para injetar o Token JWT
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('@repetilngua:token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
