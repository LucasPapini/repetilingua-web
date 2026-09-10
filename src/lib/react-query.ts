import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
      refetchOnWindowFocus: false, // Evita re-fetch ao focar no app no celular
      retry: 1,
    },
  },
});
