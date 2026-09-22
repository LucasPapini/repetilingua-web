import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://4c59-2804-7f0-b77d-e9-8657-c20d-5063-c87.ngrok-free.app',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@repetilngua:access_token');

    if (token && config.headers) {
      // Garante a definição do cabeçalho Bearer
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
